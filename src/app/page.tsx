import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { db } from "@/lib/db";

export default async function Home() {
  const [profile, projects, skills, certificates] = await Promise.all([
    db.profile.findFirst(),
    db.project.findMany({ orderBy: { createdAt: "desc" } }),
    db.skill.findMany({ orderBy: { category: "asc" } }),
    db.certification.findMany({ orderBy: { createdAt: "desc" } })
  ]);

  // Strip massive Base64 strings before passing to Client Components to prevent crashes
  const safeProfile = profile ? {
    ...profile,
    image: profile.image ? "/api/profile-image" : null,
    resumeUrl: null,
  } : null;

  return (
    <main className="flex min-h-screen flex-col">
      <Hero profile={safeProfile} />
      <About profile={safeProfile} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Certificates certificates={certificates} />
      <Contact profile={safeProfile} />
      <Footer />
    </main>
  );
}
