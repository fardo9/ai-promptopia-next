import { NextApiHandler } from 'next'
import NextAuth, { AuthOptions, Profile } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { ObjectId } from 'mongodb'
import { connectToDB } from '@utils/database'
import { CustomSession, CustomToken } from './interfaces'
import User from '../../../../models/user'

const options: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    authorizationUrl:
                        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',

                    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
                },
            },
        }),
    ],
    callbacks: {
        async session({
            session,
            token,
        }: {
            session: CustomSession
            token: CustomToken
        }) {
            try {
                const sessionUser = await User.findOne({
                    email: session.user?.email || undefined,
                })
                if (sessionUser) {
                    session.user = {
                        ...session.user,
                        id: (sessionUser._id as ObjectId).toString(),
                    }
                }
            } catch (error) {
                console.error(
                    'Error fetching user during session callback:',
                    error
                )
            }
            return session
        },
        async signIn({ profile }: { profile?: Profile }) {
            await connectToDB()

            try {
                const existingUser = await User.findOne({
                    email: profile?.email,
                })
                if (!existingUser) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name,
                        image: profile?.image,
                    })
                }
                return true
            } catch (error) {
                console.error('Error signing in with Google:', error)
                return false
            }
        },
    },
}

const handler: NextApiHandler = (req, res) => NextAuth(req, res, options)

export { handler as GET, handler as POST }
