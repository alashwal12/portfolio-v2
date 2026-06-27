import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (!type || !id) {
      return new NextResponse("Missing type or id", { status: 400 });
    }

    let base64Image: string | null | undefined = null;

    if (type === "project") {
      const project = await db.project.findUnique({ where: { id } });
      base64Image = project?.image;
    } else if (type === "certification") {
      const cert = await db.certification.findUnique({ where: { id } });
      base64Image = cert?.image;
    } else {
      return new NextResponse("Invalid type", { status: 400 });
    }

    if (!base64Image || !base64Image.startsWith("data:")) {
      return new NextResponse("Image not found or not base64", { status: 404 });
    }

    const match = base64Image.match(/^data:(image\/\w+);base64,(.*)$/);
    let mimeType = "image/jpeg";
    let base64Data = "";

    if (match) {
      mimeType = match[1];
      base64Data = match[2];
    } else {
      base64Data = base64Image.split(",")[1] || base64Image;
    }

    const buffer = Buffer.from(base64Data, "base64");

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
