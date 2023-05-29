import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";


interface IParams {
    listingId?: string
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

        // extract current listing id
        const { listingId } = params

        // if not listing id
        if(!listingId || typeof listingId !== 'string') {
            throw new Error('Invalid ID!')
        }

        // delete listing
        const listing = await prisma.listing.deleteMany({
            where: {
                id: listingId,
                userId: currentUser.id
            }
        })

        // return the response
        return NextResponse.json(listing)
    } catch (error) {
        return NextResponse.error()
    }
}
