'use client'

import useCountries from "@/app/hooks/useCountries"
import { SafeUser } from "@/app/types"
import Heading from "../Heading"
import Image from "next/image"
import HeartButton from "../HeartButton"


interface ListingHeadProps {
    title: string
    imageSrc: string
    locationValue: string
    id: string
    currentUser?: SafeUser | null
}

// listing head
const ListingHead: React.FC<ListingHeadProps> = ({
    title, imageSrc, locationValue, id, currentUser
}) => {
    // getByValue from use countries hook
    const { getByValue } = useCountries()
    // get location 
    const location = getByValue(locationValue)

    // render elements
    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image className="object-cover w-full"
                    alt="Image"
                    src={imageSrc}
                    fill
                />
                <div className="absolute top-5 right-5">
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    );
}
 
export default ListingHead;
