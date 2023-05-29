import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getFavouritesListing from "../actions/getFavouriteListings";
import FavouritesClient from "./FavouritesClient";


// render favourites page
const ListingPage = async () => {
    // get current user
    const currentUser = await getCurrentUser()
    // get favourite listings
    const listings = await getFavouritesListing()

    // if not listings
    if(listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No favourites found"
                    subtitle="Looks like you have no favourite listings."
                />
            </ClientOnly>
        )
    }

    // render elements
    return (
        <ClientOnly>
            <FavouritesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}
 
export default ListingPage;
