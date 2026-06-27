import { db } from "@/lib/db";
import { createSkill, deleteSkill } from "./actions";
import { Trash2 } from "lucide-react";

export default async function SkillsPage() {
  const skills = await db.skill.findMany({
    orderBy: { category: "asc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Skills Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add New Skill</h2>
            <form action={createSkill} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skill Name *</label>
                <input required type="text" name="name" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <input type="text" name="category" placeholder="e.g. Frontend, Backend" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Proficiency (1-100)</label>
                <input type="number" min="1" max="100" name="proficiency" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Save Skill
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            {skills.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No skills added yet.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                    <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Name</th>
                    <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Category</th>
                    <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Proficiency</th>
                    <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.map((skill) => (
                    <tr key={skill.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="p-4 text-gray-900 dark:text-gray-100 font-medium">
                        {skill.name}
                      </td>
                      <td className="p-4 text-gray-500 dark:text-gray-400 text-sm">
                        {skill.category || "-"}
                      </td>
                      <td className="p-4 text-gray-500 dark:text-gray-400 text-sm">
                        {skill.proficiency ? `${skill.proficiency}%` : "-"}
                      </td>
                      <td className="p-4 text-right">
                        <form action={deleteSkill.bind(null, skill.id)} className="inline-block">
                          <button
                            type="submit"
                            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
