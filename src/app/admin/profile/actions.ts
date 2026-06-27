"use server";

import { db } from "@/lib/db";
import { uploadFile, deleteFile } from "@/lib/storage";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const name = formData.get("name") as string;
  const title = formData.get("title") as string;
  const bio = formData.get("bio") as string;
  const about = formData.get("about") as string;
  const email = formData.get("email") as string;
  const github = formData.get("github") as string;
  const linkedin = formData.get("linkedin") as string;
  const twitter = formData.get("twitter") as string;
  
  const dataToUpdate: any = {
    name,
    title,
    bio,
    about,
    email,
    github,
    linkedin,
    twitter,
  };

  const imageFile = formData.get("image") as File;
  const resumeFile = formData.get("resume") as File;

  // Let's get existing profile first to delete old files if replaced
  const existing = await db.profile.findFirst();

  const imageField = formData.get("image");
  if (typeof imageField === "string" && imageField.startsWith("data:")) {
    if (existing?.image) await deleteFile(existing.image);
    dataToUpdate.image = imageField;
  } else if (imageField instanceof File && imageField.size > 0) {
    if (existing?.image) await deleteFile(existing.image);
    dataToUpdate.image = await uploadFile(imageField);
  }

  if (resumeFile && resumeFile.size > 0) {
    if (existing?.resumeUrl) await deleteFile(existing.resumeUrl);
    dataToUpdate.resumeUrl = await uploadFile(resumeFile);
  }

  if (existing) {
    await db.profile.update({
      where: { id: existing.id },
      data: dataToUpdate,
    });
  } else {
    await db.profile.create({
      data: dataToUpdate,
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/profile");
  revalidatePath("/admin/resume"); // In case we have a dedicated resume page, or we can just merge them here.
}
