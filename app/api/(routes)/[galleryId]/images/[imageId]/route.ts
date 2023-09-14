import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { imageId: string } }
) {
  try {
    if (!params.imageId) {
      return new NextResponse("Image id is required", { status: 400 });
    }

    const product = await prismadb.image.findUnique({
      where: {
        id: params.imageId,
      },
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[IMAGE_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { imageId: string, galleryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.imageId) {
      return new NextResponse("Image id is required", { status: 400 });
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

    const image = await prismadb.image.delete({
      where: {
        id: params.imageId
      },
    });
  
    return NextResponse.json(image);
  } catch (error) {
    console.log('[IMAGE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { imageId: string, galleryId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { title, description, tagId, url } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.imageId) {
      return new NextResponse("Image id is required", { status: 400 });
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

    const image = await prismadb.image.update({
      where: {
        id: params.imageId
      },
      data: {
        title,
        description,
        url,
        tagId
      },
    });

    return NextResponse.json(image);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};