import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";


export default async function getFavouritesListing() {
    try {
        // get current user
        const currentUser = await getCurrentUser()

        // if not current user
        if(!currentUser) return []

        // get favourites
        const favourites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [ ...(currentUser.favouriteIds || []) ]
                }
            }
        })

        // safe favourites
        // convert 'createdAt' to string
        const safeFavourites = favourites.map((favourite) => ({
            ...favourite,
            createdAt: favourite.createdAt.toISOString()
        }))

        // return favourites
        return safeFavourites
    } catch (error: any) {
        throw new Error(error)
    }
}
