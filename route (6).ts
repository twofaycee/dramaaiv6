import {supabaseAdmin} from '../../../../lib/supabase'
import {analyzeCatalog,generateStrategicPlan} from '../../../../lib/bot'
import {createRealAIFilm,generateRealFilmForMock} from '../../../../lib/runway'
import {featuredScore,shouldRemove} from '../../../../lib/scheduler'
import {FILMS_MOCK} from '../../../../lib/films'
export const dynamic='force-dynamic'
export const maxDuration=60
export async function GET(){
  const isRealMode=!!process.env.FAL_KEY
  if(!supabaseAdmin){
    return Response.json({
      bot:'DRAMA.AI BOT - SETUP NEEDED',
      setup:'Add these env vars in Vercel Settings -> Environment Variables',
      required:[
        'NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co',
        'NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (anon)',
        'SUPABASE_SERVICE_ROLE_KEY=eyJ... (service_role)',
        'NEXT_PUBLIC_STRIPE_PRICE_ID=price_... (from Stripe)',
        'STRIPE_SECRET_KEY=sk_live_...',
        'STRIPE_WEBHOOK_SECRET=whsec_... (optional)',
        'FAL_KEY=... (from fal.ai - for REAL AI films - $1 = 10 films)',
        'NEXT_PUBLIC_APP_URL=https://dramaaiv6.vercel.app'
      ],
      current_mode:isRealMode?'REAL AI READY':'MOCK MODE - Add FAL_KEY for real AI',
      mock_films:FILMS_MOCK.length
    })
  }
  const {data:films}=await supabaseAdmin.from('films').select('*')
  const all=films||[]
  const analysis=await analyzeCatalog(all)
  const plan=await generateStrategicPlan(analysis)
  let scheduled=0,archived=0,featured=0,realGenerated=0
  
  // TURN MOCK INTO REAL AI FILMS
  const mocks=all.filter((f:any)=>!f.is_real_ai)
  for(const mock of mocks.slice(0,3)){
    if(!isRealMode) break
    const real:any=await generateRealFilmForMock(mock,process.env.FAL_KEY)
    await supabaseAdmin.from('films').update({video_url:real.video_url,is_real_ai:true,status:'live',featured_score:300}).eq('id',mock.id)
    realGenerated++
  }
  
  // Schedule new if no mocks
  if(mocks.length===0){
    for(const action of plan.actions){
      if(scheduled>=3) break
      const gen:any=await createRealAIFilm(action.data.prompt,action.data.genre)
      const film={id:`drama-${Date.now()}-${scheduled}`,title:action.data.prompt.slice(0,60).toUpperCase(),genre:action.data.genre,synopsis:action.data.prompt,prompt:action.data.prompt,video_url:gen.videoUrl,status:gen.isRealAI?'live':'scheduled',is_real_ai:gen.isRealAI,scheduled_release_at:action.data.releaseAt,featured_score:gen.isRealAI?300:100,views:0,likes:0,match:95}
      await supabaseAdmin.from('films').insert(film)
      scheduled++
    }
  }
  for(const f of all.filter(shouldRemove)){await supabaseAdmin.from('films').update({status:'archived'}).eq('id',f.id);archived++}
  for(const f of all){const s=featuredScore(f);await supabaseAdmin.from('films').update({featured_score:s,status:s>300?'featured':'live'}).eq('id',f.id);if(s>300) featured++}
  return Response.json({
    bot:'DRAMA.AI BOT - PRODUCTION',
    mode:isRealMode?'REAL AI GENERATION':'MOCK (Add FAL_KEY for real)',
    analysis,
    actions:{realGenerated,scheduled,archived,featured},
    message:isRealMode?`${realGenerated} mock films turned into REAL AI films`:'Add FAL_KEY env var at fal.ai to generate real AI films - currently using demo videos',
    stripe:'Connected' if process.env.STRIPE_SECRET_KEY else 'Add STRIPE_SECRET_KEY',
    supabase:'Connected',
    realAI:isRealMode?'Enabled - $1 = ~10 films via fal.ai':"Disabled - Add FAL_KEY"
  })
}
export async function POST(){return GET()}
