'use client';
import { ApiList } from '@/components/ui/apiList';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator';
import { Pencil, Plus, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Image from 'next/image';
import { AlertModal } from '@/components/modal/alertModal';
import axios from 'axios';
import toast from 'react-hot-toast';

const ImageClient = ({
  data
}: {
  data: any;
}) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteImgId, setDeleteImgId] = useState('');

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.galleryId}/images/${deleteImgId}`);
      toast.success('Image deleted.');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  
  return (
    <>
      <AlertModal 
        title="Delete Image"
        description="Are you sure you want to delete this image? This is an irreversible operation."
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />    
      <div className="flex items-center justify-between">
        <Heading 
          title={`Images (${data.length})`}
          description="Manage images for your gallery"
        />
        <Button onClick={() => router.push(`/${params.galleryId}/images/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div className='mx-auto w-full p-8'>
        <div className='m-2 grid grid-cols-12 gap-3'>
          {data.map((img: any) => (
            <div key={img.id} className='col-span-6 md:col-span-4 lg:col-span-3 
              rounded-md
              aspect-square w-full relative 
              shadow-zinc-800 shadow-lg hover:scale-105 transition-all duration-500 ease-in-out my-3'>
              <div className='flex-row w-full h-full justify-around items-center bottom-0 z-10 absolute opacity-0 transition-all duration-300 hover:opacity-90 flex p-2'>
                <Button className='rounded-full p-2' onClick={() => router.push(`/${params.galleryId}/images/${img.id}`)}>
                  <Pencil className=' text-gray-600'/>
                </Button>

                <Button className='rounded-full p-2' onClick={() => {
                  setOpen(true)
                  setDeleteImgId(img.id)
                }}>
                  <Trash className=' text-gray-600'/>
                </Button>
              </div>
              <div className='flex flex-row'>
                <div>
                  <Image
                    alt="Image"
                    className='w-[100%] h-[80%] rounded-md p-6 object-cover'
                    src={img.url}
                    fill
                  />
                </div>
                <div className={`absolute bottom-0 p-6 z-10 bg-zinc-900 text-white w-full ${img.title || img.description ? 'bg-opacity-50': 'bg-opacity-0'}`}>
                  <h3 className='font-bold'>{img.title}</h3>
                  <p className='line-clamp-2'>{img.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Heading title="API" description="API Calls for Tags" />
      <Separator />
      <ApiList entityName="images" entityIdName="imageId" />
    </>
  )
}

export default ImageClient