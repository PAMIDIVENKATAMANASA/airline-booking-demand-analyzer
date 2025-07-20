import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Airline Booking App - Market Demand Analysis',
  description: 'Real-time airline booking trends and market insights for Australia',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
