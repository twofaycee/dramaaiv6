import {supabase} from '../../../lib/supabase'
import {FILMS_MOCK} from '../../../lib/films'
export const dynamic='force-dynamic'
export async function GET(){
  try{
    if(supabase){
      const {data,error}=await supabase.from('films').select('*').neq('status','archived').order('featured_score',{ascending:false})
      if(!error&&data&&data.length>0){
        // Mark which are real AI
        return Response.json(data.map((f:any)=>({...f,isRealAI:f.is_real_ai||f.video_url?.includes('fal.media')||false})))
      }
    }
  }catch(e){console.error(e)}
  return Response.json(FILMS_MOCK.map(f=>({...f,isRealAI:false})))
}
