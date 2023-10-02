import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "next-themes" 

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stats.io',
  description: 'NBA guessing game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    
  )
}
