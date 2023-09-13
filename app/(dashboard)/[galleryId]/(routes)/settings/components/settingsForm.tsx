'use client';
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
import Heading from '@/components/ui/heading';
import { Gallery } from '@prisma/client';
import { Trash } from 'lucide-react';
import React, { useState } from 'react'
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modal/alertModal';
import ApiAlert from '@/components/ui/apiAlert';
import { useOrigin } from '@/hooks/useOrigin';

interface SettingsFormProps {
  initialData: Gallery;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm:React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter(); 
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const origin = useOrigin();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/gallery/${params.galleryId}`, data);
      router.refresh();
      toast.success('Gallery Updated Successfully.');
    } catch (err) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/gallery/${params.galleryId}`);
      router.refresh();
      router.push('/');
      toast.success('Gallery Deleted Successfully');
    } catch (err) {
      toast.error('Make sure you removed all the tags and images first.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <AlertModal 
        title='Are you sure you want to delete the gallery?'
        description="Make sure you removed all the tags and images first. This action cannot be undone."
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className='flex items-center justify-between'>
        <Heading 
          title="Settings"
          description="Manage Gallery preferences"
        />
        <Button variant='destructive'
          disabled={loading}
          size='sm'
          onClick={() => setOpen(true)}
        ><Trash className='h-4 w-4'/></Button>
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
          <div className=' grid grid-cols-3 gap-8'>
            <FormField 
              control={form.control}
              name='name'
              render={({ field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Gallery Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type="submit">
            Save Changes 
          </Button>
        </form>
      </Form>
      
      <Separator />
      
      <ApiAlert 
        title='NEXT_PUBLIC_API_URL' 
        description={`${origin}/api/${params.galleryId}` }
        variant='public' 
      />
    </>
    
  )
}

export default SettingsForm