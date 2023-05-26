import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";


interface IParams {
    listingId?: string
}

// Listing Page
const ListingPage = async (
    { params }: { params: IParams }
) => {
    // get the listing by id
    const listing = await getListingById(params)
    // get reservations 
    const reservations = await getReservations(params)
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
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}
 
export default ListingPage;
