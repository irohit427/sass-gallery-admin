import React from 'react'
import prismadb from '@/lib/prismadb';
import { format } from "date-fns";
import { TagColumn } from './components/tagColumns';
import TagClient from './components/tagClient';

const TagsPage = async({
  params
}: {
  params: { galleryId: string }
}) => {
  const tags = await prismadb.tag.findMany({
    where: {
      galleryId: params.galleryId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedTags: TagColumn[] = tags.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <TagClient data={formattedTags} />
      </div>
    </div>
  )
}

export default TagsPage