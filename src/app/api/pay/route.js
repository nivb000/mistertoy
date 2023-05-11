import { NextResponse } from "next/server";
import Stripe from 'stripe'

const calculateOrderAmount = (toys) => {
    let totalPrice = 0
    toys.forEach(toy => totalPrice += toy.price * toy.quantity)
    return totalPrice
}

export async function POST(req) {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        const toys = await req.json()

        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(toys),
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        })

        return NextResponse.json({ clientSecret: paymentIntent.client_secret, orderAmount: calculateOrderAmount(toys) })
    } catch (err) {
        throw err
    }
}