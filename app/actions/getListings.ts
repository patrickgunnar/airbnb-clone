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
        return listings
    } catch (error: any) {
        throw new Error(error)
    }
}
