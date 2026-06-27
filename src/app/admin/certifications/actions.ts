"use server";

import { db } from "@/lib/db";
import { uploadFile, deleteFile } from "@/lib/storage";
import { revalidatePath } from "next/cache";

export async function createCertification(formData: FormData) {
  const title = formData.get("title") as string;
  const issuer = formData.get("issuer") as string;
  const date = formData.get("date") as string;
  const link = formData.get("link") as string;
  
  const imageField = formData.get("image");
  let imageUrl: string | null = null;
  if (typeof imageField === "string" && imageField.startsWith("data:")) {
    imageUrl = imageField;
  } else if (imageField instanceof File && imageField.size > 0) {
    imageUrl = await uploadFile(imageField);
  }

  await db.certification.create({
    data: {
      title,
      issuer,
      date,
      link,
      image: imageUrl,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/certifications");
}

export async function deleteCertification(id: string) {
  const existing = await db.certification.findUnique({ where: { id } });
  await deleteFile(existing?.image || null);

  await db.certification.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/admin/certifications");
}
