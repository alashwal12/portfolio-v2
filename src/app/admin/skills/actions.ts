"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createSkill(formData: FormData) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const proficiency = parseInt(formData.get("proficiency") as string, 10);
  
  await db.skill.create({
    data: {
      name,
      category,
      proficiency: isNaN(proficiency) ? null : proficiency,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function updateSkill(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const proficiencyStr = formData.get("proficiency") as string;
  const proficiency = proficiencyStr ? parseInt(proficiencyStr, 10) : null;
  
  await db.skill.update({
    where: { id },
    data: {
      name,
      category,
      proficiency: isNaN(proficiency as any) ? null : proficiency,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function deleteSkill(id: string) {
  await db.skill.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/admin/skills");
}
