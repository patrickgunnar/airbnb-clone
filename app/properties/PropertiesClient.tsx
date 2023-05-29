'use client'

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";


interface PropertiesClientProps {
    listings: SafeListing[]
    currentUser: SafeUser | null
}

// client's properties
const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings, currentUser
}) => {
    // get router
    const router = useRouter()
    // deleting state
    const [deletingId, setDeletingId] = useState('')

    // delete function
    const onDelete = useCallback((id: string) => {
        // set deleting id
        setDeletingId(id)

        // delete listing
        axios.delete(`/api/listings/${id}`)
            .then(() => {
                // success msg
                toast.success('Listing deleted')
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
                title="Properties"
                subtitle="List of your properties"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
                {
                    listings.map((listing: SafeListing) => (
                        <ListingCard
                            key={listing.id}
                            data={listing}
                            actionId={listing.id}
                            onAction={onDelete}
                            disabled={deletingId === listing.id}
                            actionLabel="Delete property"
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </Container>
    );
}
 
export default PropertiesClient;
