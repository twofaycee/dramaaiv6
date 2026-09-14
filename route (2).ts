import {stripe} from '../../../../lib/stripe'
export const dynamic='force-dynamic'
export async function POST(req:Request){
  try{
    const {customerId}=await req.json()
    if(!stripe||!customerId) return Response.json({error:'Missing customer'},{status:400})
    const appUrl=process.env.NEXT_PUBLIC_APP_URL||'https://dramaaiv6.vercel.app'
    const session=await stripe.billingPortal.sessions.create({customer:customerId,return_url:appUrl})
    return Response.json({url:session.url})
  }catch(e:any){return Response.json({error:e.message},{status:500})}
}
