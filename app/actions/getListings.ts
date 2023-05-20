import prisma from '@/app/libs/prismadb'


export default async function getListings() {
    try {
        // get the listings
        const listings = await prisma.listing.findMany({
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
