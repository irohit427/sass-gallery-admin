import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { galleryId: string }
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }
  const gallery = await prismadb.gallery.findFirst({
    where: { id: params.galleryId, userId }
  });

  if (!gallery) {
    redirect('/');
  }

  return (
    <>
      <div><Navbar /></div>
      { children }
    </>
  )
}