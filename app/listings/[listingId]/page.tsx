import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";


interface IParams {
    listingId?: string
}

// Listing Page
const ListingPage = async (
    { params }: { params: IParams }
) => {
    // get the listing by id
    const listing = await getListingById(params)
    // get current user
    const currentUser = await getCurrentUser()

    // if not listing
    if(!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    // render elements
    return (
        <ClientOnly>
            <ListingClient
                listing={listing}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}
 
export default ListingPage;
