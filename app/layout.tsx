import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DeutschBuddy - Your German Learning Assistant',
  description: 'An interactive AI-powered German language learning chat application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
