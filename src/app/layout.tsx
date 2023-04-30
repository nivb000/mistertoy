"use client"
import '../styles/main.scss'
import { AppHeader } from '@/cmps/app-header'
import { SessionProvider } from 'next-auth/react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mister Toy',
  description: 'Mister Toy - Demo Project',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <SessionProvider>
        <body>
          <AppHeader />
          <main className="main-layout">
            {children}
          </main>
        </body>
      </SessionProvider>
    </html >
  )
}