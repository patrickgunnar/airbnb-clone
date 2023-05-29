import prisma from '@/app/libs/prismadb'


export interface IListingsParams {
    userId?: string
}

export default async function getListings(
    params: IListingsParams
) {
    try {
        // get user id from params
        const { userId } = params
        // query
        let query: any = {}

        // if user id
        if(userId) query.userId = userId

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
