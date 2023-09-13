import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH (req: Request, { params }: {
  params: {
    galleryId: string, 
  }
}) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized!!!", { status: 401 });
    }
    
    const body = await req.json();
    const { name } = body;
    
    if (!name) {
      return new NextResponse("Name is Required.", { status: 400 });
    }

    if (!params.galleryId) {
      return new NextResponse("Gallery ID is Required.", { status: 400 });
    }

    const gallery =  await prismadb.gallery.update({
      where: {
        userId,
        id: params.galleryId
      },
      data: {
        name
      }
    });

    return NextResponse.json(gallery, { status: 200 });
  } catch (error) {
    console.log('[GALLERY_PATCH]: ', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE (req: Request, { params }: {
  params: { galleryId : string}
}) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (!params.galleryId) {
      return new NextResponse('Gallery ID is Required', { status: 400 });
    }
    
    const gallery = await prismadb.gallery.delete({
      where: {
        id: params.galleryId,
        userId
      }
    });
    return NextResponse.json(gallery);
  } catch (error) {
    console.log('[GALLERY_DELETE]: ', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
