'use client'

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";


interface TripsClientProps {
    reservations: SafeReservation[]
    currentUser: SafeUser | null
}

// client's trips
const TripsClient: React.FC<TripsClientProps> = ({
    reservations, currentUser
}) => {
    // get router
    const router = useRouter()
    // deleting state
    const [deletingId, setDeletingId] = useState('')

    // cancel function
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
                title="Trips"
                subtitle="Where you've been and where you're going"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
                {
                    reservations.map((reservation: SafeReservation) => (
                        <ListingCard
                            key={reservation.id}
                            data={reservation.listing}
                            reservation={reservation}
                            actionId={reservation.id}
                            onAction={onCancel}
                            disabled={deletingId === reservation.id}
                            actionLabel="Cancel reservation"
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </Container>
    );
}
 
export default TripsClient;
