import { create } from "zustand";


interface SearchModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

// user search modal
// modal is open condition
// open modal function
// close modal function
const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))
 
export default useSearchModal;
