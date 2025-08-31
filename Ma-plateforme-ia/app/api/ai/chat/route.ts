import { NextRequest, NextResponse } from 'next/server'
import { getUserById, getUserUsage, incrementUserUsage } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { messages, userId } = await request.json()
    
    // Vérifier les limites utilisateur
    if (userId) {
      const usage = await getUserUsage(userId)
      if (usage.plan === 'free' && usage.chat_messages_count >= 10) {
        return NextResponse.json({ 
          error: 'limit_reached',
          message: 'Vous avez atteint la limite de 10 messages gratuits. Passez Premium pour continuer !',
          upgrade: true
        }, { status: 402 })
      }
    }

    const lastMessage = messages[messages.length - 1]?.content || "Bonjour"

    // Appel à l'IA Hugging Face (GRATUIT)
    const response = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
      {
        headers: {
          "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          inputs: lastMessage,
          parameters: {
            max_length: 200,
            temperature: 0.8,
            repetition_penalty: 1.1
          }
        })
      }
    )

    let aiResponse = "Comment puis-je t'aider aujourd'hui ? 😊"

    if (response.ok) {
      try {
        const data = await response.json()
        aiResponse = data.generated_text || data[0]?.generated_text || aiResponse
        
        // Nettoyer la réponse
        if (typeof aiResponse === 'string') {
          aiResponse = aiResponse.replace(lastMessage, '').trim()
          if (aiResponse.length < 10) {
            aiResponse = "Je comprends ta question ! Peux-tu me donner plus de détails pour que je puisse mieux t'aider ? 🤔"
          }
        }
      } catch (parseError) {
        console.log('Parse error, using fallback response')
      }
    }

    // Personnaliser selon le contexte
    const responses = [
      "C'est une excellente question ! 🤓 " + aiResponse,
      "Je vois ce que tu veux dire. " + aiResponse,
      "Intéressant ! " + aiResponse,
      aiResponse
    ]
    
    const finalResponse = responses[Math.floor(Math.random() * responses.length)]

    // Incrémenter le compteur si utilisateur connecté
    if (userId) {
      await incrementUserUsage(userId, 'chat_messages')
    }

    return NextResponse.json({
      content: [{
        text: finalResponse,
        role: 'assistant'
      }]
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({
      content: [{
        text: "Désolé, je rencontre un petit problème technique. Peux-tu réessayer dans quelques instants ? 🔧",
        role: 'assistant'
      }]
    })
  }
}