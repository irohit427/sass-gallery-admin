import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { galleryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.galleryId) {
      return new NextResponse("Gallery id is required", { status: 400 });
    }

    const gallery = await prismadb.gallery.findFirst({
      where: {
        id: params.galleryId,
        userId,
      }
    });

    if (!gallery) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const tag = await prismadb.tag.create({
      data: {
        name,
        galleryId: params.galleryId,
      }
    });
  
    return NextResponse.json(tag);
  } catch (error) {
    console.log('[TAGS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { galleryId: string } }
) {
  try {
    if (!params.galleryId) {
      return new NextResponse("Gallery id is required", { status: 400 });
    }

    const tags = await prismadb.tag.findMany({
      where: {
        galleryId: params.galleryId
      }
    });
  
    return NextResponse.json(tags);
  } catch (error) {
    console.log('[TAGS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};