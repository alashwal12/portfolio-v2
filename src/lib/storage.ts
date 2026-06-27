import { writeFile, unlink } from "fs/promises";
import { join } from "path";

const uploadDir = join(process.cwd(), "public", "uploads");

export async function uploadFile(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename to prevent overwriting
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${uniqueSuffix}-${originalName}`;
    const filePath = join(uploadDir, filename);

    await writeFile(filePath, buffer);
    
    // Return the public URL path
    return `/uploads/${filename}`;
  } catch (error) {
    console.error("Error saving file:", error);
    return null;
  }
}

export async function deleteFile(fileUrl: string | null) {
  if (!fileUrl || !fileUrl.startsWith("/uploads/")) return;

  try {
    const filename = fileUrl.split("/uploads/")[1];
    const filePath = join(uploadDir, filename);
    await unlink(filePath);
  } catch (error) {
    console.error("Error deleting file:", error);
    // Ignore error if file is already deleted or not found
  }
}
