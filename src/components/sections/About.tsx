"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Briefcase, LineChart } from "lucide-react";
import Image from "next/image";

export function About({ profile }: { profile?: any }) {
    return (
        <section id="about" className="py-20 bg-background relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold">
                        About <span className="text-primary">Me</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Column 1: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative group flex justify-center lg:justify-start"
                    >
                        <div className="relative h-[400px] lg:h-[460px] w-full max-w-sm rounded-2xl overflow-hidden border-2 border-[#01bf4e] shadow-[0_0_15px_rgba(1,191,78,0.3)] bg-card">
                            <Image
                                src={profile?.image || "/images/profile-pic.jpg"}
                                alt={profile?.name || "Abdulmajeed Al-Ashwal"}
                                fill
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        {/* Decorative Blob behind */}
                        <div className="absolute top-6 left-6 w-full max-w-sm h-full bg-accent/10 rounded-2xl -z-10 blur-xl opacity-50" />
                    </motion.div>

                    {/* Column 2: Content (Middle) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-6 text-muted-foreground text-lg leading-relaxed content-center"
                    >
                        {profile?.about ? (
                            <p className="whitespace-pre-line">{profile.about}</p>
                        ) : (
                            <>
                                <p>
                                    I am a final-year <strong className="text-foreground">Computer Science and Data Science student</strong> at <strong className="text-foreground">Al-Bukhary International University</strong> with a strong interest in data analytics and artificial intelligence. I enjoy working with data to uncover patterns, build meaningful insights, and support informed decision-making.
                                </p>
                                <p>
                                    I have hands-on experience across the data analytics workflow, including data cleaning and analysis using <strong className="text-foreground">Python</strong> and <strong className="text-foreground">SQL</strong>, as well as building interactive dashboards and reports using <strong className="text-foreground">Power BI</strong> and <strong className="text-foreground">Tableau</strong>. I am passionate about continuous learning and applying data-driven solutions to real-world problems.
                                </p>
                            </>
                        )}

                        <div className="pt-4 flex gap-4">
                            <div className="h-1 w-20 bg-primary rounded-full"></div>
                        </div>
                    </motion.div>

                    {/* Column 3: Cards (Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="grid gap-5"
                    >
                        {/* Education Card */}
                        <div className="bg-card/50 backdrop-blur-sm border border-[#01bf4e] shadow-[0_0_10px_rgba(1,191,78,0.2)] p-5 rounded-x2 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg shrink-0 group-hover:bg-primary/20 transition-colors">
                                    <GraduationCap className="w-6 h-6 text-primary" />
                                </div>

                                <div className="w-full">
                                    <h3 className="text-lg font-bold text-foreground mb-3">Education</h3>

                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            "Computer Science",
                                            "Data Science",
                                            "Final Year Student",
                                            "Aspiring Data Analyst",
                                            "AI Practitioner"
                                        ].map((tag, i) => (
                                            <span
                                                key={i}
                                                className="text-xs px-3 py-1 bg-[#e9f2ff] text-black rounded-full font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Key Strengths Card */}
                        <div className="bg-card/50 backdrop-blur-sm border border-[#01bf4e] shadow-[0_0_10px_rgba(1,191,78,0.2)] p-5 rounded-xl transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg shrink-0 group-hover:bg-primary/20 transition-colors">
                                    <Briefcase className="w-6 h-6 text-primary" />
                                </div>
                                <div className="w-full">
                                    <h3 className="text-lg font-bold text-foreground mb-3">Key Strengths</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["KPI Definition", "ETL Pipelines", "Dashboard Design", "Predictive Modeling"].map((tag, i) => (
                                            <span key={i} className="text-xs px-3 py-1 bg-[#e9f2ff] text-black rounded-full font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Data Analytics Focus Card */}
                        <div className="bg-card/50 backdrop-blur-sm border border-[#01bf4e] shadow-[0_0_10px_rgba(1,191,78,0.2)] p-5 rounded-xl transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg shrink-0 group-hover:bg-primary/20 transition-colors">
                                    <LineChart className="w-6 h-6 text-primary" />
                                </div>
                                <div className="w-full">
                                    <h3 className="text-lg font-bold text-foreground mb-3">Data Analytics Focus</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["Power BI Dashboards", "Data Cleaning & Modeling", "DAX Measures", "Business Insights"].map((tag, i) => (
                                            <span key={i} className="text-xs px-3 py-1 bg-[#e9f2ff] text-black rounded-full font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
