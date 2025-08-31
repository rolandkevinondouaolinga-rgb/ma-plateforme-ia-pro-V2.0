'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, User, Sparkles } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '👋 Salut ! Je suis ton coach IA personnel. Comment puis-je t\'aider aujourd\'hui ? Tu peux me parler de tes objectifs, tes défis, ou simplement discuter !',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          userId: null // Pas d'utilisateur connecté pour la demo
        })
      })

      const data = await response.json()

      if (response.status === 402 && data.upgrade) {
        setShowUpgrade(true)
        setIsTyping(false)
        return
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content[0].text || "Désolé, je rencontre un petit problème. Peux-tu réessayer ?",
        timestamp: new Date()
      }

      // Simulation d'un délai de frappe pour plus de réalisme
      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage])
        setIsTyping(false)
      }, Math.random() * 1000 + 500)

    } catch (error) {
      console.error('Erreur chat:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Oups ! Je rencontre un petit problème technique. Peux-tu réessayer dans quelques instants ? 🔧",
        timestamp: new Date()
      }
      
      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage])
        setIsTyping(false)
      }, 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const suggestedQuestions = [
    "🎯 Comment découvrir mes talents cachés ?",
    "🚀 Aide-moi à définir mes objectifs",
    "💼 Conseils pour ma carrière",
    "🧠 Comment développer ma confiance ?"
  ]

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full p-4 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 animate-pulse hover:animate-none"
        >
          <MessageCircle className="h-6 w-6 group-hover:animate-bounce" />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
            !
          </div>
        </button>
        
        {/* Tooltip */}
        <div className="absolute bottom-16 right-0 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          💬 Parle avec l'IA !
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
      }`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="h-8 w-8" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg">Coach IA</h3>
                <p className="text-sm opacity-90">En ligne • Répond en temps réel</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 h-96 overflow-y-auto bg-gray-50">
              {messages.length === 1 && (
                <div className="mb-6">
                  <div className="grid grid-cols-1 gap-2 mb-4">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInput(question)}
                        className="text-left p-3 bg-white hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-sm"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                  <div className="text-center text-xs text-gray-500 mb-4">
                    👆 Clique sur une suggestion ou écris ta question
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className={`mb-6 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-flex items-start space-x-3 max-w-[85%] ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    }`}>
                      {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>

                    {/* Message bubble */}
                    <div className="flex flex-col">
                      <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white rounded-br-sm'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <div className={`text-xs text-gray-500 mt-1 ${
                        message.role === 'user' ? 'text-right' : 'text-left'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="mb-4">
                  <div className="inline-flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                      <div className="flex items-center space-x-1">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">L'IA réfléchit...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Écris ton message... (Entrée pour envoyer)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                    rows={Math.min(Math.ceil(input.length / 50), 3)}
                    disabled={isTyping}
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Sparkles className="h-3 w-3" />
                  <span>Propulsé par l'IA avancée</span>
                </div>
                <div>
                  Messages gratuits: illimités
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60]">
          <div className="bg-white rounded-2xl p-6 max-w-md mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                💬 Limite de messages atteinte !
              </h3>
              <p className="text-gray-600 mb-6">
                Tu as utilisé tes 10 messages gratuits. Passe Premium pour des conversations illimitées avec ton coach IA !
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-green-600 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Chat illimité 24/7</span>
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Analyses de profil illimitées</span>
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Coaching personnalisé avancé</span>
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-purple-600">9,99€</div>
                <div className="text-sm text-gray-500">par mois • Annulation facile</div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowUpgrade(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Plus tard
                </button>
                <button
                  onClick={() => {
                    setShowUpgrade(false)
                    // Redirection vers upgrade
                    window.alert('Redirection vers upgrade - À implémenter avec Stripe')
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
                >
                  Upgrade 🚀
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}