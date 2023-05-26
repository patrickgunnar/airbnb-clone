import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'


export async function POST(request: Request) {
    try {
        // get current usser
        const currentUser = await getCurrentUser()

        // if not current user
        if(!currentUser) throw new Error('No current user!')

        // get request body
        const body = await request.json()

        // get body data
        const {
            listingId, startDate,
            endDate, totalPrice
        } = body

        // if not body data
        if(
            !listingId || !startDate ||
            !endDate || !totalPrice
        ) throw new Error('No data!')

        // creates reservation
        const listingAnReservation = await prisma.listing.update({
            where: {
                id: listingId
            },
            data: {
                reservations: {
                    create: {
                        userId: currentUser.id,
                        startDate,
                        endDate,
                        totalPrice
                    }
                }
            }
        })

        // return reservation
        return NextResponse.json(listingAnReservation)
    } catch (error) {
        return NextResponse.error()
    }
}
