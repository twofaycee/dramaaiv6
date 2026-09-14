import {supabaseAdmin} from '../../../../lib/supabase'
import {shouldRemove,featuredScore} from '../../../../lib/scheduler'
export const dynamic='force-dynamic'
export async function GET(){if(!supabaseAdmin) return Response.json({ok:true});const {data:films}=await supabaseAdmin.from('films').select('*');for(const f of (films||[]).filter(shouldRemove)) await supabaseAdmin.from('films').update({status:'archived'}).eq('id',f.id);for(const f of (films||[])){const s=featuredScore(f);await supabaseAdmin.from('films').update({featured_score:s}).eq('id',f.id)}return Response.json({ok:true})}
