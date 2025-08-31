import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Platform Pro - Découvrez Votre Profil Unique',
  description: 'Intelligence artificielle révolutionnaire pour analyser votre personnalité et débloquer votre plein potentiel. Analyse gratuite, coaching IA personnalisé.',
  keywords: 'IA, intelligence artificielle, analyse personnalité, coaching, développement personnel, profil unique',
  authors: [{ name: 'AI Platform Pro' }],
  openGraph: {
    title: 'AI Platform Pro - Analyse de Personnalité par IA',
    description: 'Découvrez votre profil unique avec notre IA révolutionnaire. Analyse gratuite et recommandations personnalisées.',
    url: 'https://votre-domaine.com',
    siteName: 'AI Platform Pro',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Platform Pro - Votre Profil IA',
    description: 'Analyse de personnalité révolutionnaire par IA',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className={inter.className}>
        <div id="root">
          {children}
        </div>
        
        {/* Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Google Analytics ou autre analytics
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </body>
    </html>
  )
}