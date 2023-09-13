import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST (req: Request, ) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required!!!", { status: 400 });
    }
    const gallery = await prismadb.gallery.create({
      data: {
        name,
        userId,
      }
    });

    return NextResponse.json(gallery, { status: 200 });

  } catch (err) {
    console.log('[GALLERY_POST]: ', err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}