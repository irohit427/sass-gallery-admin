import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import React from 'react'

const layout = async ({
  children
}: {
  children: React.ReactNode
}) => {
  const { userId } = auth();
  
  if (!userId) { 
    redirect('/sign-in');
  }
  
  const gallery = await prismadb.gallery.findFirst({
    where: {
      userId
    }
  })

  if (gallery) {
    redirect(`/${gallery.id}`)
  }

  return (
    <div>{children}</div>
  )
}

export default layout