import '../styles/globals.css'

import { Urbanist } from 'next/font/google'

import { ReactNode } from 'react'

interface IRootLayoutProps {
  children: ReactNode
}

const urbanist = Urbanist({ subsets: ['latin'], variable: '--urbanist-font' })

export default async function RootLayout({ children }: IRootLayoutProps) {
  return (
    <html lang='pt-BR' className={urbanist.variable}>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        <title>Grafos</title>

        <link
          sizes='180x180'
          rel='apple-touch-icon'
          href='/favicon/apple-touch-icon.png'
        />

        <link
          rel='icon'
          sizes='32x32'
          type='image/png'
          href='/favicon/favicon-32x32.png'
        />

        <link
          rel='icon'
          sizes='16x16'
          type='image/png'
          href='/favicon/favicon-16x16.png'
        />
      </head>

      <body>{children}</body>
    </html>
  )
}
