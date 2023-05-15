import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'


export async function POST(request: Request) {
    // getting the body from request
    const body = await request.json()
    // extracting email, name and password from body
    const { name, email, password} = body

    try {
        // if not name, email or password
        if(!name || !email || !password) {
            throw new Error('Invalid credentials!')
        }

        // crypting user password
        const hashedPassword = await bcrypt.hash(password, 12)

        // if not hashed password
        if(!hashedPassword) {
            throw new Error('Something went wrong!')
        }

        // creating an user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword
            }
        })

        // if not user
        if(!user) {
            throw new Error('Something went wrong!')
        }

        // return user
        return NextResponse.json(user)
    } catch (error) {
        console.log(`REGISTER_ERROR: ${error}`)

        return new NextResponse('Internal error!', {
            status: 500
        })
    }
}
