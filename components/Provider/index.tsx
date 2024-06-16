'use client'

import { SessionProvider } from 'next-auth/react'

export interface IProvider {
    children?: React.ReactNode
    session?: any
}
const Provider = ({ children, session }: IProvider) => (
    <SessionProvider session={session}>{children}</SessionProvider>
)

export default Provider
