import Stripe from 'stripe'
export const stripe=process.env.STRIPE_SECRET_KEY?new Stripe(process.env.STRIPE_SECRET_KEY,{apiVersion:'2024-06-20' as any}):null
export const STRIPE_PRICE_ID=process.env.NEXT_PUBLIC_STRIPE_PRICE_ID
