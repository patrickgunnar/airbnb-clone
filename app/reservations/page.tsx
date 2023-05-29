import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";


// reservations page
const ReservationsPage = async () => {
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

    // get reservations of property's owner
    const reservations = await getReservations({
        authorId: currentUser.id
    })

    // if not reservation
    if(reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No reservations found"
                    subtitle="Looks like you have no reservations on your properties"
                />
            </ClientOnly>
        )
    }

    // render elements
    return (
        <ClientOnly>
            <ReservationsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}
 
export default ReservationsPage;
