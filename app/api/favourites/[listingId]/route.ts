import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";


interface IParams {
    listingId?: string
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        // get current user
        const currentUser = await getCurrentUser()

        // if not current user
        if(!currentUser) throw new Error('No current user!')

        // get listing id
        const { listingId } = params

        // if not listing id or listing id is not a string
        if(!listingId || typeof listingId !== 'string') throw new Error('Invalid ID!')

        // get current user favourite ids
        let favouriteIds = [...(currentUser.favouriteIds || [])]

        // push the new favourite inside favouritIds
        favouriteIds.push(listingId)

        // update current user
        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favouriteIds
            }
        })

        // return user
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.error()
    }
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

        // get listing id
        const { listingId } = params

        // if not listing id or listing id is not a string
        if(!listingId || typeof listingId !== 'string') throw new Error('Invalid ID!')

        // get current user favourite ids
        let favouriteIds = [...(currentUser.favouriteIds || [])]

        // remove listing id from the current user favourite ids
        favouriteIds = favouriteIds.filter(id => id !== listingId)

        // update current user
        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favouriteIds
            }
        })

        // return user
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.error()
    }
}
