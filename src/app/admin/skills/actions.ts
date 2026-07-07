"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSkill(formData: FormData) {
  const nameInput = formData.get("name") as string;
  const category = formData.get("category") as string;
  const proficiency = parseInt(formData.get("proficiency") as string, 10);
  
  const names = nameInput.split(",").map(n => n.trim()).filter(n => n.length > 0);
  const parsedProficiency = isNaN(proficiency) ? null : proficiency;

  if (names.length > 0) {
    await db.skill.createMany({
      data: names.map(name => ({
        name,
        category,
        proficiency: parsedProficiency,
      }))
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function updateSkill(id: string, formData: FormData) {
  const nameInput = formData.get("name") as string;
  const category = formData.get("category") as string;
  const proficiencyStr = formData.get("proficiency") as string;
  const proficiency = proficiencyStr ? parseInt(proficiencyStr, 10) : null;
  const parsedProficiency = isNaN(proficiency as any) ? null : proficiency;
  
  const names = nameInput.split(",").map(n => n.trim()).filter(n => n.length > 0);
  
  if (names.length > 0) {
    // Update the existing skill with the first name
    await db.skill.update({
      where: { id },
      data: {
        name: names[0],
        category,
        proficiency: parsedProficiency,
      },
    });

    // If there are more names, create them as new skills
    if (names.length > 1) {
      await db.skill.createMany({
        data: names.slice(1).map(name => ({
          name,
          category,
          proficiency: parsedProficiency,
        }))
      });
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function deleteSkill(id: string) {
  await db.skill.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/admin/skills");
}
