import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";


// trips page
const TripsPage = async () => {
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

    // get reservations
    const reservations  = await getReservations({
        userId: currentUser.id
    })

    // if have no reservations
    if(reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No trips found"
                    subtitle="Looks like you have not reserved any trips."
                />
            </ClientOnly>
        )
    }

    // render elements
    return (
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default TripsPage
