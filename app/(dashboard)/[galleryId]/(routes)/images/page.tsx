import React from 'react'
import ImageClient from './components/imageClient'
import prismadb from '@/lib/prismadb';
import { format } from "date-fns";

const ImagesPage = async ({
  params
}: {
  params: { galleryId: string }
}) => {
  const images = await prismadb.image.findMany({
    where: {
      galleryId: params.galleryId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ImageClient data={images}/>
      </div>
    </div>
  )
}

export default ImagesPage