import {supabaseAdmin} from '../../../lib/supabase'
export const dynamic='force-dynamic'
export async function POST(req:Request){
  try{const {filmId}=await req.json();if(supabaseAdmin){const {data}=await supabaseAdmin.from('films').select('views').eq('id',filmId).single();if(data) await supabaseAdmin.from('films').update({views:(data.views||0)+1}).eq('id',filmId)}}catch{}
  return Response.json({success:true})
}
