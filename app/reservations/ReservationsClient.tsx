'use client'

import { SafeReservation, SafeUser } from "../types";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";


interface ReservationsClientProps {
    reservations: SafeReservation[]
    currentUser: SafeUser
}

// reservations page
// property owners
const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations, currentUser
}) => {
    // get router
    const router = useRouter()
    // deleting id state
    const [deletingId, setDeletingId] = useState('')

    // cancel reservation
    const onCancel = useCallback((id: string) => {
        // set deleting id
        setDeletingId(id)

        // cancel reservation
        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                // success msg
                toast.success('Reservation cancelled')
                // refresh page
                router.refresh()
            })
            .catch((error) => {
                // error msg
                toast.error(error?.response?.data?.error)
            })
            .finally(() => {
                // set deleting id to empty string
                setDeletingId('')
            })
    }, [router])

    // render elements
    return (
        <Container>
            <Heading
                title="Reservations"
                subtitle="Bookings on your properties"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {
                    reservations.map((reservation: SafeReservation) => (
                        <ListingCard
                            key={reservation.id}
                            data={reservation.listing}
                            reservation={reservation}
                            actionId={reservation.id}
                            onAction={onCancel}
                            disabled={deletingId === reservation.id}
                            actionLabel="Cancel guest reservation"
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </Container>
    );
}
 
export default ReservationsClient;
