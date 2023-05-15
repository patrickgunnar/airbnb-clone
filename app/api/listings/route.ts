import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST(request: Request) {
    try {
        // get current user
        const currentUser = await getCurrentUser()

        // if not current user
        if(!currentUser) throw new Error('Something went wrong')

        // extract body
        const body = await request.json()
        // extract body content
        const { 
            title, description, imageSrc,
            category, roomCount, bathroomCount,
            guestCount, location, price
        } = body

        // check if value is missing
        if(
            !title || ! description || !imageSrc ||
            !category || !roomCount || !bathroomCount ||
            !guestCount || !location || !price
        ) throw new Error('Something went wrong')
        
        // create listing
        const listing = await prisma.listing.create({
            data: {
                title,
                description,
                imageSrc,
                category,
                roomCount,
                bathroomCount,
                guestCount,
                locationValue: location.value,
                price: parseInt(price, 10),
                userId: currentUser.id
            }
        })

        if(!listing) throw new Error('Something went wrong')

        return NextResponse.json(listing)
    } catch (error) {
        return NextResponse.error()
    }
}
