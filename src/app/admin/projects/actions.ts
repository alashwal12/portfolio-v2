"use server";

import { db } from "@/lib/db";
import { uploadFile, deleteFile } from "@/lib/storage";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const link = formData.get("link") as string;
  const github = formData.get("github") as string;
  const techStack = formData.get("techStack") as string;
  
  const imageField = formData.get("image");
  let imageUrl: string | null = null;
  if (typeof imageField === "string" && imageField.startsWith("data:")) {
    imageUrl = imageField;
  } else if (imageField instanceof File && imageField.size > 0) {
    imageUrl = await uploadFile(imageField);
  }

  await db.project.create({
    data: {
      title,
      description,
      link,
      github,
      techStack,
      image: imageUrl,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const link = formData.get("link") as string;
  const github = formData.get("github") as string;
  const techStack = formData.get("techStack") as string;
  
  const dataToUpdate: any = {
    title,
    description,
    link,
    github,
    techStack,
  };

  const imageField = formData.get("image");
  if (typeof imageField === "string" && imageField.startsWith("data:")) {
    const existing = await db.project.findUnique({ where: { id } });
    await deleteFile(existing?.image || null);
    dataToUpdate.image = imageField;
  } else if (imageField instanceof File && imageField.size > 0) {
    const existing = await db.project.findUnique({ where: { id } });
    await deleteFile(existing?.image || null);
    dataToUpdate.image = await uploadFile(imageField);
  }

  await db.project.update({
    where: { id },
    data: dataToUpdate,
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const existing = await db.project.findUnique({ where: { id } });
  await deleteFile(existing?.image || null);
  
  await db.project.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
}
