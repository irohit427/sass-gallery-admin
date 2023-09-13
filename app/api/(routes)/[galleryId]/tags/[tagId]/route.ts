import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { tagId: string } }
) {
  try {
    if (!params.tagId) {
      return new NextResponse("Tag id is required", { status: 400 });
    }

    const tag = await prismadb.tag.findUnique({
      where: {
        id: params.tagId
      },
    });
  
    return NextResponse.json(tag);
  } catch (error) {
    console.log('[TAG_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { tagId: string, galleryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.tagId) {
      return new NextResponse("Tag id is required", { status: 400 });
    }

    const galleryByUserId = await prismadb.gallery.findFirst({
      where: {
        id: params.galleryId,
        userId,
      }
    });

    if (!galleryByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const tag = await prismadb.tag.delete({
      where: {
        id: params.tagId,
      }
    });
  
    return NextResponse.json(tag);
  } catch (error) {
    console.log('[TAG_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH(
  req: Request,
  { params }: { params: { tagId: string, galleryId: string } }
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

    if (!params.tagId) {
      return new NextResponse("Tag id is required", { status: 400 });
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

    const tag = await prismadb.tag.update({
      where: {
        id: params.tagId,
      },
      data: {
        name
      }
    });
  
    return NextResponse.json(tag);
  } catch (error) {
    console.log('[TAG_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};