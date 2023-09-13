'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form,
  FormControl,
  FormField,
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useGalleryModal } from '@/hooks/useGalleryModal';
import { Modal } from '../ui/modal';

const formSchema = z.object({
  name: z.string().min(1),
});

export const GalleryModal = () => {
  const galleryModal = useGalleryModal();

  const [loading, setLoading] = useState(false);

  const form  = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    },
  });

  const onSubmit = async(values :z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/gallery', values);
      window.location.assign(`/${response.data.id}`)
    } catch(error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <Modal
      title="Create Gallery"
      description="Add a new Gallery to manage your photos"
      isOpen={galleryModal.isOpen}
      onClose={galleryModal.onClose}
    >
      <div className='space-y-4 py-2 pb-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder='Gallery Name' 
                      {...field} 
                      disabled={loading}
                      type='text'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
              <Button disabled={loading} variant="outline" onClick={galleryModal.onClose}>Cancel</Button>
              <Button disabled={loading} type='submit'>Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  )
}