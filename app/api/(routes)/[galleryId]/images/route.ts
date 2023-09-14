import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { galleryId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { title, description, tagId, url } = body;
    
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!url) {
      return new NextResponse("Image is required", { status: 400 });
    }
    
    if (!tagId) {
      return new NextResponse("Tag id is required", { status: 400 });
    }    

    if (!params.galleryId) {
      return new NextResponse("Gallery id is required", { status: 400 });
    }

    const galleryByUserId = await prismadb.gallery.findFirst({
      where: {
        id: params.galleryId,
        userId
      }
    });

    if (!galleryByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const product = await prismadb.image.create({
      data: {
        title,
        description,
        url,
        tagId,
        galleryId: params.galleryId,
      },
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[IMAGE_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { galleryId: string } },
) {
  try {
    const { searchParams } = new URL(req.url)
    const tagId = searchParams.get('tagId') || undefined;

    if (!params.galleryId) {
      return new NextResponse("Gallery id is required", { status: 400 });
    }

    const images = await prismadb.image.findMany({
      where: {
        galleryId: params.galleryId,
        tagId
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
  
    return NextResponse.json(images);
  } catch (error) {
    console.log('[IMAGE_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};