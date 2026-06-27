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
  const timestamp = Date.now();
  const safeProfile = profile ? {
    ...profile,
    image: profile.image ? `/api/profile-image?t=${timestamp}` : null,
    resumeUrl: null,
  } : null;

  const safeProjects = projects.map(p => ({
    ...p,
    image: p.image ? `/api/image?type=project&id=${p.id}&t=${timestamp}` : null,
  }));

  const safeCertificates = certificates.map(c => ({
    ...c,
    image: c.image ? `/api/image?type=certification&id=${c.id}&t=${timestamp}` : null,
  }));

  return (
    <main className="flex min-h-screen flex-col">
      <Hero profile={safeProfile} />
      <About profile={safeProfile} />
      <Skills skills={skills} />
      <Projects projects={safeProjects} />
      <Certificates certificates={safeCertificates} />
      <Contact profile={safeProfile} />
      <Footer />
    </main>
  );
}
