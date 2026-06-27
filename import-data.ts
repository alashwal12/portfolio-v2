import { PrismaClient } from "@prisma/client";
import fs from "fs";

const db = new PrismaClient();

async function main() {
  console.log("Reading old portfolio.json...");
  const dataRaw = fs.readFileSync("D:/abdulmajeed-portfolio/portfolio-v2 - Copy/src/data/portfolio.json", "utf-8");
  const data = JSON.parse(dataRaw);

  console.log("Clearing existing data...");
  await db.project.deleteMany();
  await db.certification.deleteMany();
  await db.skill.deleteMany();

  console.log("Importing Skills...");
  for (const group of data.skills || []) {
    const category = group.title;
    for (const skillName of group.skills || []) {
      await db.skill.create({
        data: {
          name: skillName,
          category: category,
          proficiency: 80, // Default value
        },
      });
    }
  }

  console.log("Importing Projects...");
  for (const proj of data.projects || []) {
    await db.project.create({
      data: {
        title: proj.title,
        description: proj.description,
        image: proj.image,
        link: proj.link,
        github: proj.githubUrl,
        techStack: (proj.tags || []).join(", "),
      },
    });
  }

  console.log("Importing Certifications...");
  for (const cert of data.certifications || []) {
    await db.certification.create({
      data: {
        title: cert.title,
        issuer: cert.issuer || "Unknown",
        date: cert.date || "",
        image: cert.image,
        link: cert.link,
      },
    });
  }

  console.log("Import complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
