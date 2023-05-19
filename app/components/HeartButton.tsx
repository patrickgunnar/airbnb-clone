'use client'

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";


interface HeartButtonProps {
    listingId: string
    currentUser?: SafeUser | null
}

// heart button
const HeartButton: React.FC<HeartButtonProps> = ({
    listingId, currentUser
}) => {
    // is favourite
    const hasFavourited = false
    // favourite handle
    const toggleFavourite = () => {}

    // render elements
    return (
        <div className="relative hover:opacity-80 transition cursor-pointer"
            onClick={toggleFavourite}
        >
            <AiOutlineHeart className="fill-white absolute -top-[2px] -right-[2px]"
                size={28}
            />
            <AiFillHeart className={hasFavourited ? 'fill-rose-500' : 'fill-neutral-500/70'}
                size={24}
            />
        </div>
    );
}
 
export default HeartButton;
