import prismadb from '@/lib/prismadb';
import React from 'react'
import { ImageForm } from './components/imageForm';

const ImagePage = async({
  params
}: {
  params: { imageId: string, galleryId: string }
}) => {
  let image;
  if (params.imageId == 'new') {
    image = null;
  } else {
    image = await prismadb.image.findUnique({
      where: {
        id: params.imageId,
      }
    });
  }
  const tags = await prismadb.tag.findMany({
    where: {
      galleryId: params.galleryId,
    },
  });
  
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ImageForm 
          tags={tags}
          initialData={image!}
        />
      </div>
    </div>
  )
}

export default ImagePage