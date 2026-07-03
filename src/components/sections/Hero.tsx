"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Linkedin, Mail, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ParticleBackground } from "@/components/ui/ParticleBackground";

const defaultRoles = ["Data Scientist", "Data Analyst", "Insight Creator"];

export function Hero({ profile }: { profile?: any }) {
    const roles = profile?.title ? profile.title.split(",").map((r: string) => r.trim()) : defaultRoles;
    const [roleIndex, setRoleIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    // Typewriter Effect
    useEffect(() => {
        const currentRole = roles[roleIndex];
        const typeSpeed = isDeleting ? 50 : 150;

        const timeout = setTimeout(() => {
            if (!isDeleting && text === currentRole) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
            } else {
                setText(
                    currentRole.substring(0, isDeleting ? text.length - 1 : text.length + 1)
                );
            }
        }, typeSpeed);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, roleIndex]);

    return (
        <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 -z-20">
                <Image
                    src="/images/home-bg.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-40" // Requested 40% opacity
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/90" />
                <ParticleBackground />
            </div>

            {/* Background Decor (Blob/Glow) */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 blur-[100px] rounded-full -z-10" />

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                {/* Left: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 md:pl-8 lg:pl-12"
                >
                    <div className="inline-block px-3 py-1 rounded-full bg-[#01bf4e] border border-accent/20 text-white text-sm font-medium">
                        Available for Hire
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Hi, I'm <br />
                        <span className="text-primary">{profile?.name || "Abdulmajeed Al-Ashwal"}</span>
                    </h1>

                    <h2 className="text-2xl md:text-3xl text-muted-foreground h-[40px]">
                        I am a <span className="text-foreground font-semibold">{text}</span>
                        <span className="animate-blink">|</span>
                    </h2>

                    <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                        {profile?.bio || "Specializing in data analysis, machine learning, and AI-driven solutions. Passionate about turning data into meaningful insights and real-world impact."}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link
                            href="#projects"
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-base font-semibold text-background bg-amber-500 rounded-full hover:bg-amber-400 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                        >
                            View Projects <ArrowRight className="h-5 w-5" />
                        </Link>

                        <Link
                            href="#contact"
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-base font-semibold text-background bg-amber-500 rounded-full hover:bg-amber-400 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                        >
                            Contact Me <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>

                    {/* Social Proof / Icons */}
                    <div className="flex items-center gap-4 pt-4 text-muted-foreground">
                        <Link href={profile?.github || "https://github.com/alashwal12"} target="_blank" className="hover:text-primary transition-colors">
                            <Github className="h-6 w-6" />
                        </Link>
                        <Link href={profile?.linkedin || "https://www.linkedin.com/in/abdulmajeedalashwal/"} target="_blank" className="hover:text-primary transition-colors">
                            <Linkedin className="h-6 w-6" />
                        </Link>
                        <Link href={`mailto:${profile?.email || "abdulmajeed.working@gmail.com"}`} className="hover:text-primary transition-colors">
                            <Mail className="h-6 w-6" />
                        </Link>
                    </div>
                </motion.div>

                {/* Right: Image Blob */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative flex justify-center"
                >
                    <div className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px]">
                        {/* Organic Blob Shape Mask */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full opacity-20 blur-2xl animate-pulse" />

                        {/* Image Container with Blob Mask */}
                        <div className="relative w-full h-full overflow-hidden border-2 border-[#01bf4e] shadow-[0_0_20px_rgba(1,191,78,0.4)] bg-card"
                            style={{
                                borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                                // This creates the organic "blob" shape
                                animation: "blob-bounce 10s infinite ease-in-out"
                            }}>
                            <Image
                                src={profile?.image || "/images/profile-pic.jpg"} // User's personal photo
                                alt={profile?.name || "Abdulmajeed"}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Floating Badges */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -right-4 bg-card border border-border p-3 rounded-xl shadow-xl flex items-center gap-2"
                        >
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm font-bold">Open to Work</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Tool Logos Row - Bottom Middle of Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-6 bg-card/80 backdrop-blur-md px-8 py-4 rounded-full border border-border shadow-xl z-10"
            >
                {/* Use jsdelivr simple-icons for reliability */}
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/powerbi.svg" alt="Power BI" className="w-8 h-8 hover:scale-110 transition-transform" style={{ filter: 'invert(76%) sepia(55%) saturate(3786%) hue-rotate(345deg) brightness(101%) contrast(98%)' }} title="Power BI" />
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tableau.svg" alt="Tableau" className="w-8 h-8 hover:scale-110 transition-transform" style={{ filter: 'invert(47%) sepia(86%) saturate(1914%) hue-rotate(349deg) brightness(97%) contrast(92%)' }} title="Tableau" />
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/python.svg" alt="Python" className="w-8 h-8 hover:scale-110 transition-transform" style={{ filter: 'invert(37%) sepia(48%) saturate(1472%) hue-rotate(185deg) brightness(97%) contrast(89%)' }} title="Python" />
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mysql.svg" alt="SQL" className="w-8 h-8 hover:scale-110 transition-transform" style={{ filter: 'invert(41%) sepia(50%) saturate(1148%) hue-rotate(172deg) brightness(93%) contrast(87%)' }} title="SQL" />
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftexcel.svg" alt="Excel" className="w-8 h-8 hover:scale-110 transition-transform" style={{ filter: 'invert(33%) sepia(90%) saturate(1210%) hue-rotate(120deg) brightness(94%) contrast(95%)' }} title="Excel" />
            </motion.div>

            {/* CSS for Blob Animation */}
            <style jsx global>{`
        @keyframes blob-bounce {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
      `}</style>
        </section>
    );
}
