import prisma from "@/app/libs/prismadb"


interface IParams {
    listingId?: string
}

export default async function getListingById(
    params: IParams
) {
    try {
        // get listing id
        const { listingId } = params
        // get listing from db
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        })

        // if not listing
        if(!listing) return null

        // return listing
        // convert createdAt, updatedAt and emailVerified to string
        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null
            }
        }
    } catch (error: any) {
        throw new Error(error)
    }
}
