import {supabaseAdmin} from '../../../../lib/supabase'
import {analyzeCatalog,generateStrategicPlan} from '../../../../lib/bot'
import {FILMS} from '../../../lib/films'
export const dynamic='force-dynamic'
export async function GET(){
  const films=supabaseAdmin? (await supabaseAdmin.from('films').select('*')).data||FILMS : FILMS
  const analysis=await analyzeCatalog(films)
  const plan=await generateStrategicPlan(analysis)
  return Response.json({analysis,plan})
}
