import {stripe} from '../../../../lib/stripe'
import {supabaseAdmin} from '../../../../lib/supabase'
export const dynamic='force-dynamic'
export async function POST(req:Request){
  const body=await req.text()
  const sig=req.headers.get('stripe-signature')
  const secret=process.env.STRIPE_WEBHOOK_SECRET
  if(!stripe||!secret) return Response.json({received:true,warning:'Missing webhook secret'})
  try{
    const event=stripe.webhooks.constructEvent(body,sig!,secret)
    if(event.type==='checkout.session.completed'){
      const session=event.data.object as any
      const email=session.customer_email
      const customerId=session.customer as string
      const subscriptionId=session.subscription as string
      if(supabaseAdmin&&email){
        await supabaseAdmin.from('profiles').upsert({email,stripe_customer_id:customerId,stripe_subscription_id:subscriptionId,subscription_status:'active'},{onConflict:'email'})
      }
    }
    if(event.type==='customer.subscription.deleted'){
      const sub=event.data.object as any
      if(supabaseAdmin) await supabaseAdmin.from('profiles').update({subscription_status:'canceled'}).eq('stripe_subscription_id',sub.id)
    }
    return Response.json({received:true})
  }catch(e:any){return Response.json({error:e.message},{status:400})}
}
