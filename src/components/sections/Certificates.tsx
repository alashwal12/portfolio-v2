"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const defaultCertificates = [
    // Prioritized Certificates
    {
        title: "Extract, Transform and Load (ETL)",
        issuer: "Microsoft / Coursera",
        date: "2025",
        image: "/images/etl-powerbi-cert.png",
        link: "/certificates/Extract, Transform and Load Data in Power BI.pdf",
        tags: ["ETL", "Data Engineering"]
    },
    {
        title: "Harnessing the Power of Data",
        issuer: "Microsoft / Coursera",
        date: "2025",
        image: "/images/harnessing-data-powerbi-cert.png",
        link: "/certificates/Harnessing the Power of Data with Power BI.pdf",
        tags: ["Data Strategy"]
    },
    {
        title: "Getting Started with Microsoft Excel",
        issuer: "Coursera",
        date: "2025",
        image: "/images/excel-cert.png",
        link: "/certificates/Getting Started with Microsoft Excel.pdf",
        tags: ["Excel", "Spreadsheets"]
    },


    // Other Certificates (Hidden by default)
    {
        title: "Preparing Data for Analysis",
        issuer: "Microsoft / Coursera",
        date: "2025",
        image: "/images/preparing-data-excel-cert.png",
        link: "/certificates/Preparing Data for Analysis with Microsoft Excel.pdf",
        tags: ["Data Cleaning", "ETL"]
    },
    {
        title: "How to Visualize Data Using PowerPoint",
        issuer: "Microsoft / Coursera",
        date: "2025",
        image: "/images/powerpoint-cert.png",
        link: "/certificates/How to Visualize Data Using Microsoft PowerPoint.pdf",
        tags: ["PowerPoint", "Dashboards"]
    },
    {
        title: "Data Storytelling",
        issuer: "Fractal / Coursera",
        date: "2025",
        image: "/images/data-storytelling-cert.png",
        link: "/certificates/Data Storytelling.pdf",
        tags: ["Communication", "Insights"]
    },
    {
        title: "Introduction to Web Development",
        issuer: "IBM",
        date: "2024",
        image: "/images/web-dev-cert.png",
        link: "/certificates/Introduction to Web Development with HTML, CSS, and JavaScript.pdf",
        tags: ["HTML/CSS", "Web Dev"]
    }
];

export function Certificates({ certificates: dbCertificates }: { certificates?: any[] }) {
    const [showAll, setShowAll] = useState(false);
    
    const currentCertificates = dbCertificates && dbCertificates.length > 0
      ? dbCertificates.map(c => ({
          title: c.title,
          issuer: c.issuer,
          date: c.date,
          image: c.image || "/images/placeholder.png",
          link: c.link || "#",
          tags: ["Certification"]
        }))
      : defaultCertificates;

    const displayedCertificates = showAll ? currentCertificates : currentCertificates.slice(0, 3);

    return (
        <section id="certificates" className="py-20 bg-background/50 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Professional <span className="text-primary">Certifications</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Validating technical expertise through industry-recognized qualifications.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto mb-12">
                    {displayedCertificates.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card border border-[#01bf4e] shadow-[0_0_10px_rgba(1,191,78,0.2)] rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(1,191,78,0.4)] transition-shadow flex flex-col h-full"
                        >
                            {/* Top Image area - White background for Cert logo visibility */}
                            <div className="relative h-48 w-full bg-white p-4 flex items-center justify-center border-b border-[#01bf4e]/50">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={cert.image}
                                        alt={cert.title}
                                        fill
                                        className="object-contain" // Contain to show full cert/logo
                                    />
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow text-left">
                                <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-2 min-h-[3.5rem]">
                                    {cert.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    {cert.issuer}
                                </p>

                                <div className="mt-auto pt-4 flex justify-between items-center">
                                    <span className="text-xs font-medium bg-[#e9f2ff] text-black px-2 py-1 rounded">
                                        {cert.tags[0]}
                                    </span>
                                    <Link
                                        href={cert.link}
                                        target="_blank"
                                        className="text-sm font-bold text-blue-500 hover:text-blue-400 inline-flex items-center gap-1"
                                    >
                                        View Certificate <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* See More Button */}
                <div className="text-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-6 py-2 rounded-full border border-[#01bf4e] text-[#01bf4e] font-medium shadow-[0_0_10px_rgba(1,191,78,0.2)] hover:bg-[#01bf4e]/10 transition-colors"
                    >
                        {showAll ? "Show Less" : "See More Certificates"}
                    </button>
                </div>
            </div>
        </section>
    );
}
