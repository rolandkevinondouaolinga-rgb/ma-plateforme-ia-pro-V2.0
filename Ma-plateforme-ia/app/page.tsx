'use client'
import { useState } from 'react'
import { Brain, MessageCircle, Star, TrendingUp, Users, Play, CheckCircle, Crown, Zap, Target, Heart } from 'lucide-react'
import AIChatbot from '@/components/AIChatbot'

export default function HomePage() {
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup')
  const [showDemo, setShowDemo] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-white flex items-center">
          <Brain className="mr-2 h-8 w-8 text-blue-400 animate-pulse" />
          AI Platform Pro
        </div>
        <div className="space-x-4">
          <button 
            onClick={() => { setAuthMode('login'); setShowAuth(true) }}
            className="text-white hover:text-blue-300 px-4 py-2 rounded-lg transition-all hover:bg-white/10 backdrop-blur-sm"
          >
            Connexion
          </button>
          <button 
            onClick={() => { setAuthMode('signup'); setShowAuth(true) }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🚀 Démarrer Gratuit
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="mb-8">
          <span className="inline-block bg-gradient-to-r from-blue-400 to-purple-400 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-bounce">
            🤖 IA Révolutionnaire • 100% Gratuit
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
          Découvrez Votre
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block mt-2">
            Profil Unique
          </span>
          <span className="text-4xl md:text-5xl text-gray-300 block mt-2">avec l'IA</span>
        </h1>

        <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed">
          🧠 Une intelligence artificielle de pointe analyse votre personnalité en profondeur 
          et vous guide vers votre plein potentiel avec des recommandations ultra-personnalisées
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
          <button 
            onClick={() => { setAuthMode('signup'); setShowAuth(true) }}
            className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl px-12 py-5 rounded-2xl transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center font-bold"
          >
            <Play className="mr-3 h-6 w-6 group-hover:animate-pulse" />
            Analyse Gratuite Maintenant
            <span className="ml-2 text-sm bg-white/20 px-2 py-1 rounded-full">FREE</span>
          </button>
          
          <button 
            onClick={() => setShowDemo(true)}
            className="group bg-white/10 hover:bg-white/20 text-white text-xl px-8 py-5 rounded-2xl transition-all backdrop-blur-sm border border-white/20 flex items-center justify-center font-semibold hover:shadow-xl"
          >
            <MessageCircle className="mr-3 h-6 w-6 group-hover:animate-bounce" />
            Parler à l'IA Maintenant
          </button>
        </div>

        {/* Social Proof */}
        <div className="flex justify-center items-center space-x-8 mb-20 opacity-80">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">12,847</div>
            <div className="text-sm text-gray-300">Profils analysés</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">98%</div>
            <div className="text-sm text-gray-300">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">4.9★</div>
            <div className="text-sm text-gray-300">Note moyenne</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">
          <div className="group text-center p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="mb-6">
              <Brain className="h-16 w-16 text-blue-400 mx-auto group-hover:animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">🧠 IA Ultra-Avancée</h3>
            <p className="text-gray-300 leading-relaxed">
              Algorithmes de dernière génération basés sur la psychologie cognitive 
              et l'analyse comportementale pour des résultats d'une précision inégalée
            </p>
          </div>

          <div className="group text-center p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="mb-6">
              <Target className="h-16 w-16 text-purple-400 mx-auto group-hover:animate-spin" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">🎯 Profil Unique</h3>
            <p className="text-gray-300 leading-relaxed">
              Découvrez vos forces cachées, votre potentiel inexploré et les opportunités 
              qui correspondent parfaitement à votre personnalité unique
            </p>
          </div>

          <div className="group text-center p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="mb-6">
              <TrendingUp className="h-16 w-16 text-green-400 mx-auto group-hover:animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">📈 Croissance Accélérée</h3>
            <p className="text-gray-300 leading-relaxed">
              Plan de développement personnalisé avec des recommandations concrètes 
              pour atteindre vos objectifs plus rapidement que jamais
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="flex items-center mb-4">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face" 
                   alt="Marie" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <div className="text-white font-semibold">Marie L.</div>
                <div className="text-gray-400 text-sm">Entrepreneur</div>
              </div>
            </div>
            <p className="text-gray-300 italic">
              "Cette IA a révélé des aspects de ma personnalité que j'ignorais complètement. 
              Grâce à ses recommandations, j'ai transformé mon approche business ! 🚀"
            </p>
            <div className="flex text-yellow-400 mt-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="flex items-center mb-4">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" 
                   alt="Thomas" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <div className="text-white font-semibold">Thomas K.</div>
                <div className="text-gray-400 text-sm">Manager</div>
              </div>
            </div>
            <p className="text-gray-300 italic">
              "L'analyse est bluffante de précision ! Le chatbot IA me guide quotidiennement. 
              Impossible de s'en passer une fois qu'on a goûté à cette technologie ! 🤖"
            </p>
            <div className="flex text-yellow-400 mt-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-white/20 rounded-3xl p-12 max-w-4xl mx-auto">
          <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à découvrir votre véritable potentiel ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Rejoignez plus de 12,000 personnes qui ont déjà transformé leur vie grâce à notre IA
          </p>
          <button 
            onClick={() => { setAuthMode('signup'); setShowAuth(true) }}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-xl px-12 py-5 rounded-2xl transition-all transform hover:scale-105 shadow-2xl"
          >
            ✨ Commencer Mon Analyse GRATUITE
          </button>
          <div className="mt-4 text-sm text-gray-400">
            🔒 Données sécurisées • 🚀 Résultats instantanés • ❤️ 100% gratuit
          </div>
        </div>
      </div>

      {/* Chatbot Component */}
      <AIChatbot />

      {/* Auth Modal Placeholder */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {authMode === 'login' ? '🔐 Connexion' : '🚀 Inscription Gratuite'}
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Fonctionnalité en cours d'implémentation...
            </p>
            <button 
              onClick={() => setShowAuth(false)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}