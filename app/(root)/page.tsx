'use client'

import { useGalleryModal } from '@/hooks/useGalleryModal';
import { useEffect } from 'react';

export default function SetupPage () {
  const onOpen = useGalleryModal((state) => state.onOpen);
  const isOpen = useGalleryModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
