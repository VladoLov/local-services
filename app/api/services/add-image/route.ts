// app/api/services/add-image/route.ts
import { NextResponse } from "next/server";
import { addImageToService } from "@/lib/actions/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { serviceId, imageUrl } = body;

    if (!serviceId || !imageUrl) {
      return NextResponse.json(
        { success: false, message: "serviceId and imageUrl required" },
        { status: 400 }
      );
    }

    // call server helper that updates DB
    await addImageToService(serviceId, imageUrl);

    return NextResponse.json({
      success: true,
      message: "Image saved to service.",
    });
  } catch (err: any) {
    console.error("add-image error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
