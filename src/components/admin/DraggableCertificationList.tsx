"use client";

import { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import { Trash2, GripVertical } from "lucide-react";
import { updateCertificationsOrder, deleteCertification } from "@/app/admin/certifications/actions";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string | null;
}

export function DraggableCertificationList({ initialCertificates }: { initialCertificates: Certification[] }) {
  const [items, setItems] = useState(initialCertificates);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setItems(initialCertificates);
  }, [initialCertificates]);

  const handleReorder = async (newOrder: Certification[]) => {
    setItems(newOrder);
    setIsUpdating(true);
    
    const orderedIds = newOrder.map(c => c.id);
    await updateCertificationsOrder(orderedIds);
    
    setIsUpdating(false);
  };

  if (items.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        No certifications found. Add your first certification!
      </div>
    );
  }

  return (
    <div className={`relative ${isUpdating ? "opacity-70 pointer-events-none" : ""}`}>
      {/* Table Header Equivalent */}
      <div className="flex bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700 p-4 font-medium text-gray-500 dark:text-gray-400">
        <div className="w-8"></div> {/* Drag handle space */}
        <div className="flex-1">Title & Issuer</div>
        <div className="w-32 hidden md:block">Date</div>
        <div className="w-16 text-right">Actions</div>
      </div>

      <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="flex flex-col">
        {items.map((cert) => (
          <Reorder.Item
            key={cert.id}
            value={cert}
            className="flex items-center p-4 border-b border-gray-50 dark:border-gray-800 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-grab active:cursor-grabbing"
          >
            <div className="w-8 flex items-center text-gray-400">
              <GripVertical size={18} />
            </div>
            
            <div className="flex-1 pr-4 truncate">
              <div className="text-gray-900 dark:text-gray-100 font-medium truncate">{cert.title}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{cert.issuer}</div>
            </div>
            
            <div className="w-32 text-gray-500 dark:text-gray-400 text-sm hidden md:block">
              {cert.date || "-"}
            </div>
            
            <div className="w-16 flex justify-end space-x-2">
              <form 
                action={deleteCertification.bind(null, cert.id)} 
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
