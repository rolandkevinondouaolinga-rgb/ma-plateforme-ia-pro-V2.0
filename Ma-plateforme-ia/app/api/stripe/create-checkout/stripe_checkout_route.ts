import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const { planType, userId, userEmail } = await request.json()
    
    console.log('Creating checkout session for:', { planType, userId, userEmail })

    // Prix des plans (à créer dans votre Dashboard Stripe)
    const prices = {
      premium: process.env.STRIPE_PREMIUM_PRICE_ID || 'price_1234567890premium', // Remplacez par votre vrai price ID
      pro: process.env.STRIPE_PRO_PRICE_ID || 'price_1234567890pro'
    }

    if (!prices[planType as keyof typeof prices]) {
      return NextResponse.json({ 
        error: 'Plan non valide' 
      }, { status: 400 })
    }

    // Créer la session de checkout
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: userEmail,
      line_items: [{
        price: prices[planType as keyof typeof prices],
        quantity: 1,
      }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      metadata: {
        userId: userId || 'anonymous',
        planType,
        source: 'web_app'
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      invoice_creation: {
        enabled: true,
      },
      subscription_data: {
        metadata: {
          userId: userId || 'anonymous',
          planType,
        },
      },
    })

    console.log('Checkout session created:', session.id)

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url,
      success: true
    })

  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    
    return NextResponse.json({ 
      error: 'Erreur lors de la création du paiement',
      details: error.message,
      success: false
    }, { status: 500 })
  }
}

// Route GET pour vérifier le statut d'une session
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json({ 
        error: 'Session ID manquant' 
      }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    return NextResponse.json({
      status: session.payment_status,
      customer_email: session.customer_details?.email,
      amount_total: session.amount_total,
      currency: session.currency,
      metadata: session.metadata,
      success: true
    })

  } catch (error: any) {
    console.error('Erreur récupération session:', error)
    
    return NextResponse.json({ 
      error: 'Session introuvable',
      success: false
    }, { status: 404 })
  }
}