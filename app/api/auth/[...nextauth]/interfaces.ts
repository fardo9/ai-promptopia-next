import { DefaultSession, TokenSet } from 'next-auth'

export interface CustomSession extends DefaultSession {
    user?: {
        id?: string | null | undefined
        email?: string | null | undefined
        name?: string | null | undefined
        image?: string | null | undefined
    }
}

export interface CustomToken extends TokenSet {
    email?: string | null
    name?: string | null
    picture?: string | null
    sub?: string
}
