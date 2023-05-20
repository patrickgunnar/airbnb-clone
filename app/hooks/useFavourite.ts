import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";


interface IUseFavourite {
    listingId: string
    currentUser?: SafeUser | null
}

const useFavourite = ({
    listingId, currentUser
}: IUseFavourite) => {
    // get router
    const router = useRouter()
    // get login modal hook
    const loginModal = useLoginModal()

    // check if current listing id is in current user favourites ids list
    const hasFavourite = useMemo(() => {
        // get the current user favourite list
        const list = currentUser?.favouriteIds || []

        // return if current user favourites ids includes current listing id
        return list.includes(listingId)
    }, [currentUser, listingId])

    // function to handle the add or remove listing id from favourites ids
    const toggleFavourite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        // stop propagation
        e.stopPropagation()

        // if not current user
        // return login modal open
        if(!currentUser) return loginModal.onOpen()

        try {
            let request

            // if hasFavourite is true 
            // removes listing id from the list
            // else, add listing id into the list
            if(hasFavourite) {
                request = () => axios.delete(`/api/favourites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favourites/${listingId}`)
            }

            // exec the request
            await request()
            // refresh the page
            router.refresh()
            // display successfull msg
            toast.success('Success!')
        } catch (error) {
            toast.error('Something went wrong!')
        }
    }, [currentUser, loginModal, hasFavourite, listingId, router])

    return {
        hasFavourite,
        toggleFavourite
    }
}

export default useFavourite
