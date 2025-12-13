import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gitory - Git Story Narrator',
  description: 'Transform GitHub repositories into engaging narratives',
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
