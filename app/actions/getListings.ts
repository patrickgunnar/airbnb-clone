'use server'

import prisma from '@/app/libs/prismadb'


export interface IListingsParams {
    userId?: string
    guestCount?: number
    roomCount?: number
    bathroomCount?: number
    startDate?: string
    endDate?: string
    locationValue?: string
    category?: string
}

export default async function getListings(
    params: IListingsParams
) {
    try {
        // get user id, guestCount, roomCount,
        // bathroomCount, startDate, endDate,
        // locationValue, category from params
        const { 
            userId, guestCount, roomCount,
            bathroomCount, startDate, endDate,
            locationValue, category
         } = params
        // query
        let query: any = {}

        // if user id
        if(userId) query.userId = userId
        // if category
        if(category) query.category = category
        // if roomCount
        if(roomCount) query.roomCount = { gte: +roomCount }
        // if bathroomCount
        if(bathroomCount) query.bathroomCount = { gte: +bathroomCount }
        // if guestCount
        if(guestCount) query.guestCount = { gte: +guestCount }
        // if location filter
        if(locationValue) query.locationValue = locationValue

        // filter by date range
        if(startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
        }

        // get the listings
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })

        // return the listings
        // map the listings and convert createdAt to string
        return listings.map(listing => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }))
    } catch (error: any) {
        throw new Error(error)
    }
}
