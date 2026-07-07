import { db } from "@/lib/db";
import { updateSkill } from "../actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default async function EditSkillPage({ params }: { params: { id: string } }) {
  const skill = await db.skill.findUnique({
    where: { id: params.id },
  });

  if (!skill) {
    redirect("/admin/skills");
  }

  // Bind the id to the update action
  const updateSkillWithId = updateSkill.bind(null, skill.id);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/skills" className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Skill</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <form action={updateSkillWithId} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skill Name *</label>
            <input 
              required 
              type="text" 
              name="name" 
              defaultValue={skill.name}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <input 
              type="text" 
              name="category" 
              defaultValue={skill.category || ""}
              placeholder="e.g. Frontend, Backend" 
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Proficiency (1-100)</label>
            <input 
              type="number" 
              min="1" 
              max="100" 
              name="proficiency" 
              defaultValue={skill.proficiency || ""}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
            />
          </div>
          <div className="flex gap-4">
            <Link
              href="/admin/skills"
              className="w-full text-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
