import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";


// properties page
const PropertiesPage = async () => {
    // get current user
    const currentUser = await getCurrentUser()

    // if not current user
    if(!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please, make login"
                />
            </ClientOnly>
        )
    }

    // get listings
    const listings  = await getListings({
        userId: currentUser.id
    })

    // if have no listings
    if(listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No properties found"
                    subtitle="Looks like you have not properties."
                />
            </ClientOnly>
        )
    }

    // render elements
    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default PropertiesPage
