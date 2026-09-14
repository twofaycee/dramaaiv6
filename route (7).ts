import {supabaseAdmin} from '../../../lib/supabase'
import {createRealAIFilm} from '../../../lib/runway'
export const dynamic='force-dynamic'
export const maxDuration=60
export async function POST(req:Request){
  try{
    const {prompt,genre,title}=await req.json()
    if(!prompt) return Response.json({error:'Prompt required'},{status:400})
    const result:any=await createRealAIFilm(prompt,genre||'Drama')
    if(supabaseAdmin){
      const film={
        id:`drama-${Date.now()}`,
        title:(title||prompt.slice(0,60)).toUpperCase(),
        genre:genre||'Drama',
        synopsis:prompt,
        prompt,
        video_url:result.videoUrl,
        status:result.isRealAI?'live':'scheduled',
        is_real_ai:result.isRealAI,
        scheduled_release_at:new Date(Date.now()+2*60*60*1000).toISOString(),
        featured_score:result.isRealAI?200:100,
        views:0,likes:0,match:95
      }
      await supabaseAdmin.from('films').insert(film)
      return Response.json({film,result})
    }
    return Response.json({film:{title:prompt.slice(0,60),video_url:result.videoUrl},result})
  }catch(e:any){return Response.json({error:e.message},{status:500})}
}
