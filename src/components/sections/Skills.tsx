"use client";

import { motion } from "framer-motion";
import { Database, FileSpreadsheet, LayoutDashboard, Terminal, Users, Brain, Activity } from "lucide-react";

const defaultSkillCategories = [
    {
        title: "Data Analysis",
        icon: <Brain className="w-6 h-6 text-accent" />,
        skills: ["Excel", "SQL", "Python", "Statistics"],
    },
    {
        title: "BI & Visualization",
        icon: <LayoutDashboard className="w-6 h-6 text-accent" />,
        skills: ["Power BI", "DAX", "Power Query", "Tableau"],
    },
    {
        title: "Data Handling",
        icon: <Database className="w-6 h-6 text-accent" />,
        skills: ["Data Cleaning", "Data Modeling", "ETL", "Reporting"],
    },
    {
        title: "Soft Skills",
        icon: <Users className="w-6 h-6 text-accent" />,
        skills: ["Communication", "Problem Solving", "Teamwork", "Adaptability"],
    },
];

export function Skills({ skills: dbSkills }: { skills?: any[] }) {
    let skillCategories = defaultSkillCategories;

    if (dbSkills && dbSkills.length > 0) {
        // Group skills by category
        const grouped = dbSkills.reduce((acc: any, skill: any) => {
            const cat = skill.category || "Other Skills";
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(skill.name);
            return acc;
        }, {});

        const iconMap: Record<string, any> = {
            "Data Analysis": <Brain className="w-6 h-6 text-accent" />,
            "BI & Visualization": <LayoutDashboard className="w-6 h-6 text-accent" />,
            "Data Handling": <Database className="w-6 h-6 text-accent" />,
            "Soft Skills": <Users className="w-6 h-6 text-accent" />,
        };

        skillCategories = Object.keys(grouped).map((cat) => ({
            title: cat,
            icon: iconMap[cat] || <Activity className="w-6 h-6 text-accent" />, // Fallback to Activity icon instead of Terminal
            skills: grouped[cat]
        }));
    }
    return (
        <section id="skills" className="py-20 bg-background/50 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Technical <span className="text-primary">Expertise</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A comprehensive toolkit for turning raw data into strategic insights.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card border border-[#01bf4e] shadow-[0_0_10px_rgba(1,191,78,0.2)] p-6 rounded-xl transition-all duration-300 group"
                        >
                            <div className="mb-4 p-3 bg-accent/10 rounded-lg w-fit group-hover:bg-accent/20 transition-colors">
                                {category.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-foreground">{category.title}</h3>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="text-xs px-3 py-1 bg-[#e9f2ff] text-black rounded-full font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
