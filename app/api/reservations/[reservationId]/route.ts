import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";


interface IParams {
    reservationId?: string
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        // get current user
        const currentUser = await getCurrentUser()

        // if not current user
        if(!currentUser) throw new Error('No current user!')

        // extract reservation id
        const { reservationId } = params

        // if not reservation id
        if(!reservationId || typeof reservationId !== 'string') {
            throw new Error('No reservation id!')
        }

        // delete reservation
        // allows the owner of the property 
        // or the client
        // to cancel the reservation
        const reservation = await prisma.reservation.deleteMany({
            where: {
                id: reservationId,
                OR: [
                    { userId: currentUser.id },
                    { listing: { userId: currentUser.id } }
                ]
            }
        })

        // return the response
        return NextResponse.json(reservation)
    } catch (error) {
        return NextResponse.error()
    }
}
