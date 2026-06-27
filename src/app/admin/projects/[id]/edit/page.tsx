import { db } from "@/lib/db";
import { updateProject } from "../../actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default async function EditProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const project = await db.project.findUnique({
    where: { id: params.id },
  });

  if (!project) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/projects" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Back to Projects
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Edit Project</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
        <form action={updateProject.bind(null, project.id)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Title *</label>
              <input required type="text" name="title" defaultValue={project.title} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description *</label>
              <textarea required name="description" defaultValue={project.description} rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Live Demo URL</label>
              <input type="url" name="link" defaultValue={project.link || ""} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub URL</label>
              <input type="url" name="github" defaultValue={project.github || ""} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies Used (comma separated) *</label>
              <input required type="text" name="techStack" defaultValue={project.techStack} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Update Project Image (leave empty to keep current)</label>
              <ImageUploader name="image" defaultImage={project.image && project.image.startsWith("data:") ? `/api/image?type=project&id=${project.id}&t=${Date.now()}` : project.image || undefined} />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-700">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Update Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
