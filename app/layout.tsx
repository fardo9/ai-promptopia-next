import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/styles/globals.css'
import NavBar from '@components/NavBar'
import Provider from '@components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Promptopia',
    description:
        'Promptopia is a place where you can create your own prompts and share them with others',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <NavBar />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}
