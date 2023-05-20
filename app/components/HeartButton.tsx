'use client'

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavourite from "../hooks/useFavourite";


interface HeartButtonProps {
    listingId: string
    currentUser?: SafeUser | null
}

// heart button
const HeartButton: React.FC<HeartButtonProps> = ({
    listingId, currentUser
}) => {
    // get useFavourite hook functions
    const {
        hasFavourite,
        toggleFavourite
    } = useFavourite({
        listingId,
        currentUser
    })

    // render elements
    return (
        <div className="relative hover:opacity-80 transition cursor-pointer"
            onClick={toggleFavourite}
        >
            <AiOutlineHeart className="fill-white absolute -top-[2px] -right-[2px]"
                size={28}
            />
            <AiFillHeart className={hasFavourite ? 'fill-rose-500' : 'fill-neutral-500/70'}
                size={24}
            />
        </div>
    );
}
 
export default HeartButton;
