import prisma from '@/app/libs/prismadb'


interface IParams {
    listingId?: string
    userId?: string
    authorId?: string
}

export default async function getReservations(
    params: IParams
) {
    try {
        // get params data
        const { listingId, userId, authorId } = params
        // query
        const query: any = {}

        // if listing id set query
        if(listingId) {
            query.listingId = listingId
        }

        // if user id set query
        if(userId) {
            query.userId = userId
        }

        // if author id set query
        if(authorId) {
            query.listing = {
                userId: authorId
            }
        }

        // get reservation
        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        // safe reservations
        // replace date obj to string
        const safeReservations = reservations.map(reservation => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createdAt.toISOString()
            }
        }))

        // return safe reservation
        return safeReservations
    } catch (error: any) {
        throw new Error(error)
    }
}
