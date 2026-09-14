import {supabaseAdmin} from '../../../../lib/supabase'
import {analyzeCatalog,generateStrategicPlan} from '../../../../lib/bot'
export const dynamic='force-dynamic'
export async function GET(){const {data:films}=await supabaseAdmin.from('films').select('*');const analysis=await analyzeCatalog(films||[]);const plan=await generateStrategicPlan(analysis);return Response.json({analysis,plan,realAI:!!process.env.FAL_KEY})}
