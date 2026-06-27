"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Contact({ profile }: { profile?: any }) {
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`https://formsubmit.co/ajax/${profile?.email || "abdulmajeed.working@gmail.com"}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formState.name,
                    email: formState.email,
                    message: formState.message,
                    _subject: `New Portfolio Message from ${formState.name}`,
                })
            });

            if (response.ok) {
                alert("Message sent successfully! I'll get back to you soon.");
                setFormState({ name: "", email: "", message: "" });
            } else {
                alert("Something went wrong. Please try again or email me directly.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-24">
                {/* Left: Info */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Let's <span className="text-primary">Connect</span>
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                        I'm currently available for freelance projects and full-time roles.
                        Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="space-y-6">
                        <a href={`mailto:${profile?.email || "abdulmajeed.working@gmail.com"}`} className="flex items-center gap-4 text-lg font-medium hover:text-primary transition-colors group">
                            <div className="w-12 h-12 bg-card border border-[#01bf4e] shadow-[0_0_10px_rgba(1,191,78,0.2)] rounded-xl flex items-center justify-center transition-colors">
                                <Mail className="w-6 h-6 text-accent" />
                            </div>
                            {profile?.email || "abdulmajeed.working@gmail.com"}
                        </a>

                        <a href={profile?.linkedin || "https://www.linkedin.com/in/abdulmajeedalashwal/"} target="_blank" className="flex items-center gap-4 text-lg font-medium hover:text-primary transition-colors group">
                            <div className="w-12 h-12 bg-card border border-[#01bf4e] shadow-[0_0_10px_rgba(1,191,78,0.2)] rounded-xl flex items-center justify-center transition-colors">
                                <Linkedin className="w-6 h-6 text-accent" />
                            </div>
                            LinkedIn Profile
                        </a>

                        <a href={profile?.github || "https://github.com/alashwal12"} target="_blank" className="flex items-center gap-4 text-lg font-medium hover:text-primary transition-colors group">
                            <div className="w-12 h-12 bg-card border border-[#01bf4e] shadow-[0_0_10px_rgba(1,191,78,0.2)] rounded-xl flex items-center justify-center transition-colors">
                                <Github className="w-6 h-6 text-accent" />
                            </div>
                            GitHub Profile
                        </a>
                    </div>
                </motion.div>

                {/* Right: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-card border border-[#01bf4e] shadow-[0_0_10px_rgba(1,191,78,0.2)] p-8 rounded-2xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2 text-muted-foreground">Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                className="w-full bg-background border border-[#01bf4e] shadow-[0_0_8px_rgba(1,191,78,0.15)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#01bf4e]/50 transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2 text-muted-foreground">Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                className="w-full bg-background border border-[#01bf4e] shadow-[0_0_8px_rgba(1,191,78,0.15)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#01bf4e]/50 transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2 text-muted-foreground">Message</label>
                            <textarea
                                id="message"
                                required
                                rows={4}
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                className="w-full bg-background border border-[#01bf4e] shadow-[0_0_8px_rgba(1,191,78,0.15)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#01bf4e]/50 transition-all resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 text-base font-semibold text-background bg-amber-500 rounded-full hover:bg-amber-400 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                        >
                            {isSubmitting ? "Sending..." : (
                                <>Send Message <Send className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
