import {FILMS} from '../../../lib/films'
import {supabase} from '../../../lib/supabase'
export const dynamic='force-dynamic'
export async function GET(){
  try{
    if(supabase){
      const {data,error}=await supabase.from('films').select('*').neq('status','archived').order('featured_score',{ascending:false})
      if(!error&&data&&data.length>0) return Response.json(data)
    }
  }catch(e){}
  // Fallback to your 24 mock films so site still looks good
  return Response.json(FILMS)
}
