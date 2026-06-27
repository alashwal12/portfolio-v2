"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// Placeholder Data (Will be replaced with real content later)
const defaultProjects = [
    {
        title: "Healthcare Patient Waitlist Analysis",
        description: "Interactive Power BI dashboard analyzing patient wait lists by case type, age profile, time bands, and medical specialty to support healthcare decision-making.",
        tags: ["Power BI", "DAX", "Power Query", "Data Modeling"],
        image: "/images/healthcare-waitlist-dashboard.png",
        link: "https://app.powerbi.com/links/xjACEY6w0y?ctid=c7d058bc-9500-4ca8-a504-1943d9e8f559&pbi_source=linkShare",
    },
    {
        title: "HR Analytics Dashboard",
        description: "Tableau dashboard analyzing employee attrition, retention strategies, and workforce demographics.",
        tags: ["Tableau", "HR Analytics", "Visualization"],
        image: "/images/hr-analytics-dashboard.png",
        link: "https://github.com/alashwal12/tableau-projects/tree/main/HR_Analytics_Dashboard_Tableau",
    },
    {
        title: "Smoking Risk Analysis",
        description: "Healthcare risk pattern visualization identifying key indicators for smoking-related health issues.",
        tags: ["Power BI", "Healthcare", "Data Modeling"],
        image: "/images/smoking-dashboard.png",
        link: "https://app.powerbi.com/links/GklLG70Tv1?ctid=c7d058bc-9500-4ca8-a504-1943d9e8f559&pbi_source=linkShare",
    },
    {
        title: "Data Professional Survey Breakdown",
        description: "Interactive Power BI dashboard analyzing survey responses from data professionals, including salary trends by role, programming language preferences, career difficulty, and work-life satisfaction.",
        tags: ["Power BI", "Survey Analysis", "Data Visualization", "DAX"],
        image: "/images/Data Professional Survey Breakdown.png",
        link: "https://app.powerbi.com/links/YOUR_PUBLIC_LINK_HERE",
    },
    {
        title: "Sales & Product Performance Dashboard",
        description: "Interactive dashboard tracking sales performance, product trends, and key KPIs using Power BI.",
        tags: ["Power BI", "DAX", "Power Query"],
        image: "/images/sales-dashboard.png", // Assuming these images exist or will be moved
        link: "https://app.powerbi.com/links/m_szrKsrnS?ctid=c7d058bc-9500-4ca8-a504-1943d9e8f559&pbi_source=linkShare&bookmarkGuid=ce380d00-7ed6-4eb2-be19-122e58f67e77",
    },
    {
        title: "Netflix Content Analysis Dashboard",
        description: "Interactive Power BI dashboard analyzing Netflix movies and TV shows by genre, country, release year, and content trends over time.",
        tags: ["Power BI", "DAX", "Power Query", "Data Visualization"],
        image: "/images/netflix-analysis-dashboard.png",
        link: "https://app.powerbi.com/links/m_szrKsrnS?ctid=c7d058bc-9500-4ca8-a504-1943d9e8f559&pbi_source=linkShare&bookmarkGuid=ce380d00-7ed6-4eb2-be19-122e58f67e77",
    },
    {
        title: "Global Billionaires Insights",
        description: "Excel-based analysis of wealth distribution and billionaire demographics worldwide.",
        tags: ["Excel", "Data Analysis", "Dashboard"],
        image: "/images/billionaire-insights.png",
        link: "#",
    },
];

export function Projects({ projects: dbProjects }: { projects?: any[] }) {
    const [showAll, setShowAll] = useState(false);
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [windowWidth, setWindowWidth] = useState(0);
    
    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    // Use dbProjects if they exist, otherwise fallback to default
    const currentProjects = dbProjects && dbProjects.length > 0 
      ? dbProjects.map(p => ({
          title: p.title,
          description: p.description,
          tags: p.techStack ? p.techStack.split(",").map((t: string) => t.trim()) : [],
          image: p.image || "/images/placeholder.png",
          link: p.link || p.github || "#"
        }))
      : defaultProjects;

    const displayedProjects = showAll ? currentProjects : currentProjects.slice(0, 3);

    return (
        <section id="projects" className="py-24 bg-background relative" onMouseMove={handleMouseMove}>
            
            {/* Floating Image Tooltip */}
            <AnimatePresence>
                {hoveredImage && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="fixed pointer-events-none z-[9999] hidden lg:block"
                        style={{
                            left: mousePos.x,
                            top: mousePos.y,
                            transform: mousePos.x > windowWidth / 2 
                                 ? "translate(-105%, 20px)" 
                                 : "translate(20px, 20px)"
                        }}
                    >
                        <div className="bg-card border-2 border-primary p-2 rounded-xl shadow-2xl w-[500px]">
                            <div className="relative w-full aspect-video">
                                <Image src={hoveredImage} alt="Preview" fill className="object-contain rounded-lg" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-end mb-12"
                >
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Featured <span className="text-primary">Projects</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Real-world data problems solved with modern analytics tools.
                        </p>
                    </div>
                    <Link
                        href="https://github.com/alashwal12"
                        target="_blank"
                        className="hidden md:flex items-center gap-2 text-primary font-medium hover:text-amber-500 hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] transition-all"
                    >
                        View GitHub Profile <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            onMouseEnter={() => setHoveredImage(project.image)}
                            onMouseLeave={() => setHoveredImage(null)}
                            className="bg-card border border-[#01bf4e] shadow-[0_0_10px_rgba(1,191,78,0.2)] rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(1,191,78,0.4)] transition-shadow flex flex-col h-full cursor-crosshair"
                        >
                            {/* Top Image */}
                            <div className="relative h-48 w-full bg-muted overflow-hidden group">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold mb-3 text-foreground line-clamp-1">{project.title}</h3>

                                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag: string) => (
                                        <span key={tag} className="text-xs px-3 py-1 bg-[#e9f2ff] text-black rounded-full font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-[#01bf4e]/50 mt-auto">
                                    <Link
                                        href={project.link}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 text-sm text-foreground font-semibold hover:text-primary transition-colors relative z-10"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ExternalLink className="w-4 h-4" /> View Project
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center space-y-8">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-6 py-2 rounded-full border border-[#01bf4e] text-[#01bf4e] font-medium shadow-[0_0_10px_rgba(1,191,78,0.2)] hover:bg-[#01bf4e]/10 transition-colors"
                    >
                        {showAll ? "Show Less" : "Show More Projects"}
                    </button>

                    <div>
                        <p className="text-muted-foreground text-lg mb-2">Want to see more?</p>
                        <Link
                            href="https://github.com/alashwal12"
                            target="_blank"
                            className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:text-amber-500 hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] transition-all"
                        >
                            Check out the other projects on GitHub <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
