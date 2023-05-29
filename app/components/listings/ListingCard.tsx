'use client'

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";


interface ListingCardProps {
    currentUser?: SafeUser | null
    data: SafeListing
    reservation?: SafeReservation
    onAction?: (id: string) => void
    actionLabel?: string
    actionId?: string
    disabled?: boolean
}

// render listing card
const ListingCard: React.FC<ListingCardProps> = ({
    currentUser, data, reservation, onAction, actionLabel, disabled,
    actionId=""
}) => {
    // get router
    const router = useRouter()
    // use coutries hook
    const { getByValue } = useCountries()
    // get location
    const location = getByValue(data.locationValue)

    // handle cancel
    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        // if diabled
        if(disabled) return

        onAction?.(actionId)
    }, [onAction, actionId, disabled])

    // to get the price or total price on reservation
    const price = useMemo(() => {
        // if reservation
        if(reservation) return reservation.totalPrice

        return data.price
    }, [reservation, data])

    // to get the date on reservation
    const reservationDate = useMemo(() => {
        // if no reservation
        if(!reservation) return null

        // startDate to Date
        const start = new Date(reservation.startDate)
        // endDate to Date
        const end = new Date(reservation.endDate)

        // format date into a string
        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [reservation])

    // render card
    return (
        <div className="col-span-1 cursor-pointer group"
            onClick={() => router.push(`/listings/${data.id}`)}
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image className="object-cover h-full w-full group-hover:scale-110 transition"
                        alt="Listing"
                        src={data.imageSrc}
                        fill
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        $ {price}
                    </div>
                    {!reservation && (
                        <div className="font-light">night</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    );
}
 
export default ListingCard;
