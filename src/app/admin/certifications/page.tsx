import { db } from "@/lib/db";
import { createCertification, deleteCertification, moveCertificateUp, moveCertificateDown } from "./actions";
import { Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default async function CertificationsPage() {
  const certifications = await db.certification.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Certifications Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add Certification</h2>
            <form action={createCertification} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                <input required type="text" name="title" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Issuer *</label>
                <input required type="text" name="issuer" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                <input type="text" name="date" placeholder="e.g. Aug 2025" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Link</label>
                <input type="url" name="link" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Certificate Image/PDF</label>
                <ImageUploader name="image" />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Save Certification
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            {certifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No certifications added yet.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                    <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Title & Issuer</th>
                    <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Date</th>
                    <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certifications.map((cert, index) => (
                    <tr key={cert.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-gray-900 dark:text-gray-100">{cert.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer}</div>
                      </td>
                      <td className="p-4 text-gray-500 dark:text-gray-400 text-sm">
                        {cert.date || "-"}
                      </td>
                      <td className="p-4 text-right space-x-1 whitespace-nowrap">
                        <form action={moveCertificateUp.bind(null, cert.id)} className="inline-block">
                          <button
                            type="submit"
                            disabled={index === 0}
                            className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                            title="Move Up"
                          >
                            <ArrowUp size={18} />
                          </button>
                        </form>
                        <form action={moveCertificateDown.bind(null, cert.id)} className="inline-block">
                          <button
                            type="submit"
                            disabled={index === certifications.length - 1}
                            className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                            title="Move Down"
                          >
                            <ArrowDown size={18} />
                          </button>
                        </form>
                        <form action={deleteCertification.bind(null, cert.id)} className="inline-block">
                          <button
                            type="submit"
                            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            title="Delete"
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
