'use client'

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    reservations?: SafeReservation[]
    listing: SafeListing & { user: SafeUser }
    currentUser?: SafeUser | null
}

// listing client
const ListingClient: React.FC<ListingClientProps> = ({
    reservations = [], 
    listing, currentUser
}) => {
    // get login modal hook
    const loginModal = useLoginModal()
    // get router
    const router = useRouter()

    // get disabled dates
    const disabledDates = useMemo(() => {
        let dates: Date[] = []

        // loop through reservations array
        // generates an array with the dates 
        // from start date to end date
        reservations.forEach(reservation => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })

            // dates array receives dates content plus range content
            dates = [...dates, ...range]
        })

        // return dates
        return dates
    }, [reservations])

    // is loading state
    const [isLoading, setIsLoading] = useState(false)
    // total price state
    const [totalPrice, setTotalPrice] = useState(listing.price)
    // date range
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    // create the reservation
    const onCreateReservation = useCallback(() => {
        // if not user logged in
        if(!currentUser) return loginModal.onOpen()

        // set is loading to true
        setIsLoading(true)

        // pass data to reservation api
        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
            .then(() => {
                // display success msg
                toast.success('Listing reserved!')
                // set date range to inital date
                setDateRange(initialDateRange)
                // redirect to '/trips'
                router.refresh()
            })
            .catch(() => toast.error('Somethiing went wrong!'))
            .finally(() => setIsLoading(false))
    }, [currentUser, loginModal, totalPrice, dateRange, listing, router])

    // use effect to calculate days and total price
    useEffect(() => {
        // if date range start and end dates
        if(dateRange.startDate && dateRange.endDate) {
            // get the difference between start and end dates
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )

            // if dayCount and listing price
            if(dayCount && listing.price) {
                // set total price
                setTotalPrice(dayCount * listing.price)
            } else {
                setTotalPrice(listing.price)
            }
        }
    }, [dateRange, listing.price])

    // get category
    const category = useMemo(() => {
        // get category from categories array of Navbar Categories
        return categories.find(item => item.label === listing.category)
    }, [listing.category])

    // render elements
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
 
export default ListingClient;
