import {supabaseAdmin} from '../../../../lib/supabase'
import {analyzeCatalog,generateStrategicPlan} from '../../../../lib/bot'
import {createGeneration} from '../../../../lib/runway'
import {featuredScore,shouldRemove} from '../../../../lib/scheduler'
import {FILMS} from '../../../../lib/films'
export const dynamic='force-dynamic'
export const maxDuration=60
export async function GET(){
  // If no Supabase, run in mock mode so bot page still works
  if(!supabaseAdmin){
    return Response.json({
      bot:'DRAMA.AI BOT - MOCK MODE (Add Supabase vars to use real DB)',
      mode:'mock',
      analysis:await analyzeCatalog(FILMS),
      plan:await generateStrategicPlan({total:FILMS.length}),
      message:'Add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY in Vercel Settings → Redeploy → Bot will use real DB',
      hobby:'Daily cron 0 1 * * * - Hobby allows daily only',
      fix:'Multiple Deployments Simultaneously - Fixed by using separate repo dramaaiv6 (not Breakthrough.Ai queued builds)'
    })
  }
  const {data:films}=await supabaseAdmin.from('films').select('*')
  const all=films||[]
  const analysis=await analyzeCatalog(all)
  const plan=await generateStrategicPlan(analysis)
  let scheduled=0,archived=0,featured=0
  for(const action of plan.actions){
    if(scheduled>=3) break
    const gen:any=await createGeneration(action.data.prompt,action.data.genre)
    const film={id:`drama-${Date.now()}-${scheduled}`,title:action.data.prompt.slice(0,60).toUpperCase(),genre:action.data.genre,synopsis:action.data.prompt,video_url:gen.videoUrl,status:'scheduled',scheduled_release_at:action.data.releaseAt,featured_score:100,views:0,likes:0,match:95}
    await supabaseAdmin.from('films').insert(film)
    scheduled++
  }
  for(const f of all.filter(shouldRemove)){
    await supabaseAdmin.from('films').update({status:'archived'}).eq('id',f.id)
    archived++
  }
  for(const f of all){
    const score=featuredScore(f)
    await supabaseAdmin.from('films').update({featured_score:score,status:score>300?'featured':'live'}).eq('id',f.id)
    if(score>300) featured++
  }
  return Response.json({bot:'DRAMA.AI BOT - LIVE DB MODE',scheduled,archived,featured,analysis,plan,hobby:'Runs daily 1am - Pro would run every 6h'})
}
export async function POST(){return GET()}
