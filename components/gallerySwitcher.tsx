'use client';
import React, { useState } from 'react'
import { Gallery } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';

import { 
  Check, 
  ChevronDown, 
  PlusCircle, 
  Aperture as GalleryIcon
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useGalleryModal } from '@/hooks/useGalleryModal';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList, 
  CommandSeparator 
} from '@/components/ui/command';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

type gallery = {
  label: string;
  value: string;
}

interface GallerySwitcherProps extends PopoverTriggerProps {
  items: Gallery[]
}

const GallerySwitcher = ({ className, items = [] }: GallerySwitcherProps) => {
  const galleryModal = useGalleryModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));

  const currentGallery = formattedItems.find((item) => item.value === params.galleryId);

  const [open, setOpen] = useState(false);

  const onGallerySelect = (gallery: gallery) => {
    setOpen(false);
    router.push(`/${gallery.value}`);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' size='sm' 
          aria-expanded={open} 
          aria-label='Select a Gallery'
          className={cn('w-[200px] justify-between', className)}
        >
          <GalleryIcon className='mr-2 h-4 w-4' />
          Current Gallery
          <ChevronDown className='ml-auto h-4 w-4 opacity-50 shrink-0' />          
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search Gallery'></CommandInput>
            <CommandEmpty>No Gallery</CommandEmpty>
            <CommandGroup heading='Galleries'>
              {
                formattedItems.map((gallery) =>(
                  <CommandItem key={gallery.value}
                    className='text-sm'
                    onSelect={() => onGallerySelect(gallery)}
                  >
                    <GalleryIcon className='mr-2 h-4 w-4' />
                    {gallery.label}
                    <Check className={cn('ml-auto h-4 w-4', currentGallery?.value === gallery.value ? "opacity-100": "opacity-0")} />
                  </CommandItem>
                ))
              }
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  galleryModal.onOpen()
                }}
              >
                <PlusCircle className='mr-2 h-5 w-5' />
                Create Gallery
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default GallerySwitcher;