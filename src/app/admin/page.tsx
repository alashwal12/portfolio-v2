import { db } from "@/lib/db";
import { FolderKanban, Award, Code2, UserCircle } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [projectCount, certCount, skillCount, profileCount] = await Promise.all([
    db.project.count(),
    db.certification.count(),
    db.skill.count(),
    db.profile.count(),
  ]);

  const stats = [
    { name: "Projects", count: projectCount, icon: FolderKanban, href: "/admin/projects", color: "bg-blue-500" },
    { name: "Certifications", count: certCount, icon: Award, href: "/admin/certifications", color: "bg-green-500" },
    { name: "Skills", count: skillCount, icon: Code2, href: "/admin/skills", color: "bg-purple-500" },
    { name: "Profile Setup", count: profileCount > 0 ? "Configured" : "Pending", icon: UserCircle, href: "/admin/profile", color: "bg-orange-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href} className="block group">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-all hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10 dark:bg-opacity-20`}>
                  <stat.icon className={`w-6 h-6 ${stat.color.replace("bg-", "text-")}`} />
                </div>
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{stat.name}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {stat.count}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
