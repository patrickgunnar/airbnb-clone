import { create } from "zustand";


interface RentModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

// user rent modal
// modal is open condition
// open modal function
// close modal function
const useRentModal = create<RentModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))
 
export default useRentModal;
