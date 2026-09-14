import {stripe,STRIPE_PRICE_ID} from '../../../../lib/stripe'
import {supabase} from '../../../../lib/supabase'
export const dynamic='force-dynamic'
export async function POST(req:Request){
  try{
    if(!stripe) return Response.json({error:'Missing STRIPE_SECRET_KEY - add in Vercel env vars'},{status:500})
    if(!STRIPE_PRICE_ID) return Response.json({error:'Missing NEXT_PUBLIC_STRIPE_PRICE_ID - create price in Stripe dashboard'},{status:500})
    const body=await req.json().catch(()=>({}))
    const {userId,email}=body
    const appUrl=process.env.NEXT_PUBLIC_APP_URL||'https://dramaaiv6.vercel.app'
    const session=await stripe.checkout.sessions.create({
      mode:'subscription',
      line_items:[{price:STRIPE_PRICE_ID,quantity:1}],
      success_url:`${appUrl}/?success=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:`${appUrl}/?canceled=1`,
      customer_email:email,
      metadata:{userId:userId||'',app:'dramaaiv6'},
      allow_promotion_codes:true
    })
    return Response.json({url:session.url,sessionId:session.id})
  }catch(e:any){return Response.json({error:e.message},{status:500})}
}
