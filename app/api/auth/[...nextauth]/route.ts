import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import prisma from "@/app/libs/prismadb";


// user authentication options
export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        // github login
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        // user login
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                // if not email and password
                if(!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid e-mail or password!')
                }

                // look for the user on db
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                // if not user or user hashedPassword
                if(!user || !user?.hashedPassword) {
                    throw new Error('Invalid e-mail or password!')
                }

                // check if passed password is the same of the hashedPassword
                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

                // if not password the same
                if(!isCorrectPassword) {
                    throw new Error('Invalid password!')
                }

                // return user if everything went well
                return user
            }
        })
    ],
    pages: {
        signIn: '/',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
