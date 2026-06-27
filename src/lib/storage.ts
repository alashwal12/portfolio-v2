import { writeFile, unlink } from "fs/promises";
import { join } from "path";

export async function uploadFile(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert file to Base64 string so it can be saved directly in the database
    // This is required because Netlify's serverless environment has a read-only filesystem
    const mimeType = file.type || 'application/octet-stream';
    const base64Data = buffer.toString('base64');
    
    return `data:${mimeType};base64,${base64Data}`;
  } catch (error) {
    console.error("Error saving file:", error);
    return null;
  }
}

export async function deleteFile(fileUrl: string | null) {
  // Files are now stored as Base64 strings in the database,
  // so when the database row is updated/deleted, the file is automatically deleted.
  // We no longer need to delete files from the disk.
  return;
}
