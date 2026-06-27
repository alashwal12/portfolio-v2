"use client";

import { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import { Trash2, Pencil, GripVertical } from "lucide-react";
import Link from "next/link";
import { updateProjectsOrder, deleteProject } from "@/app/admin/projects/actions";

interface Project {
  id: string;
  title: string;
  techStack: string;
}

export function DraggableProjectList({ initialProjects }: { initialProjects: Project[] }) {
  const [items, setItems] = useState(initialProjects);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setItems(initialProjects);
  }, [initialProjects]);

  const handleReorder = async (newOrder: Project[]) => {
    setItems(newOrder);
    setIsUpdating(true);
    
    const orderedIds = newOrder.map(p => p.id);
    await updateProjectsOrder(orderedIds);
    
    setIsUpdating(false);
  };

  if (items.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        No projects found. Add your first project!
      </div>
    );
  }

  return (
    <div className={`relative ${isUpdating ? "opacity-70 pointer-events-none" : ""}`}>
      {/* Table Header Equivalent */}
      <div className="flex bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700 p-4 font-medium text-gray-500 dark:text-gray-400">
        <div className="w-8"></div> {/* Drag handle space */}
        <div className="flex-1">Title</div>
        <div className="flex-1 hidden md:block">Tech Stack</div>
        <div className="w-24 text-right">Actions</div>
      </div>

      <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="flex flex-col">
        {items.map((project) => (
          <Reorder.Item
            key={project.id}
            value={project}
            className="flex items-center p-4 border-b border-gray-50 dark:border-gray-800 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-grab active:cursor-grabbing"
          >
            <div className="w-8 flex items-center text-gray-400">
              <GripVertical size={18} />
            </div>
            
            <div className="flex-1 text-gray-900 dark:text-gray-100 font-medium truncate pr-4">
              {project.title}
            </div>
            
            <div className="flex-1 text-gray-500 dark:text-gray-400 text-sm truncate pr-4 hidden md:block">
              {project.techStack}
            </div>
            
            <div className="w-24 flex justify-end space-x-2">
              <Link
                href={`/admin/projects/${project.id}/edit`}
                className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-block"
                title="Edit"
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <Pencil size={18} />
              </Link>
              <form 
                action={deleteProject.bind(null, project.id)} 
                className="inline-block"
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <button
                  type="submit"
                  className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </form>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
