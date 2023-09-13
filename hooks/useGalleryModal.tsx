import { create } from 'zustand';

interface useGalleryModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void
}

export const useGalleryModal = create<useGalleryModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
