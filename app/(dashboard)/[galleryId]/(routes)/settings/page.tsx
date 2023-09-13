import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import SettingsForm from './components/settingsForm';

interface SettingsPageProps {
  params: {
    galleryId: string;
  }
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const gallery = await prismadb.gallery.findFirst({
    where: {
      userId,
      id: params.galleryId,
    }
  });

  if (!gallery) {
    redirect('/');
  }

  return (

    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm initialData={gallery}/>
      </div>
    </div>
  )
}

export default SettingsPage