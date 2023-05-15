import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import prisma from '@/app/libs/prismadb'


// get session on server
export async function getSession() {
    return await getServerSession(authOptions)
}

// get current user
export default async function getCurrentUser() {
    try {
        // get session
        const session = await getSession()

        // if not session user's email
        if(!session?.user?.email) return null

        // get current user
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        // if not user
        if(!currentUser) return null

        // retrun current user
        // turn createdAt, updatedAt and emailVerified into ISO string
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        }
    } catch (error: any) {
        return null
    }
}
