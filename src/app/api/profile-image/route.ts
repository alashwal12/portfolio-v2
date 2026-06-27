import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const profile = await db.profile.findFirst();

    if (!profile || !profile.image) {
      return new NextResponse("Image not found", { status: 404 });
    }

    if (profile.image.startsWith("/")) {
      return NextResponse.redirect(new URL(profile.image, request.url));
    }

    // The image is a base64 data URI: data:image/jpeg;base64,/9j/4AAQ...
    const match = profile.image.match(/^data:(image\/\w+);base64,(.*)$/);
    
    let mimeType = "image/jpeg";
    let base64Data = "";

    if (match) {
      mimeType = match[1];
      base64Data = match[2];
    } else {
      // Fallback if it doesn't match the regex but is just a raw base64 string
      base64Data = profile.image.split(",")[1] || profile.image;
    }

    if (!base64Data) {
      return new NextResponse("Invalid image format", { status: 400 });
    }

    const buffer = Buffer.from(base64Data, "base64");

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error serving profile image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
