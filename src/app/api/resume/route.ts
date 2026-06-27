import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const profile = await db.profile.findFirst();

    if (!profile || !profile.resumeUrl) {
      return new NextResponse("Resume not found", { status: 404 });
    }

    // The resumeUrl is a base64 data URI: data:application/pdf;base64,JVBERi0xLjQK...
    const base64Data = profile.resumeUrl.split(",")[1];
    
    if (!base64Data) {
      return new NextResponse("Invalid resume format", { status: 400 });
    }

    const buffer = Buffer.from(base64Data, "base64");

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=\"Abdulmajeed_Resume.pdf\"",
      },
    });
  } catch (error) {
    console.error("Error serving resume:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
