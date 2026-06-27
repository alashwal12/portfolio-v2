import { db } from "../src/lib/db";

async function main() {
  console.log("Initializing Project orders...");
  const projects = await db.project.findMany({ orderBy: { createdAt: "desc" } });
  for (let i = 0; i < projects.length; i++) {
    await db.project.update({
      where: { id: projects[i].id },
      data: { order: i }
    });
  }

  console.log("Initializing Certification orders...");
  const certs = await db.certification.findMany({ orderBy: { createdAt: "desc" } });
  for (let i = 0; i < certs.length; i++) {
    await db.certification.update({
      where: { id: certs[i].id },
      data: { order: i }
    });
  }

  console.log("Initializing Skill orders...");
  const skills = await db.skill.findMany({ orderBy: { createdAt: "desc" } });
  for (let i = 0; i < skills.length; i++) {
    await db.skill.update({
      where: { id: skills[i].id },
      data: { order: i }
    });
  }

  console.log("Done!");
}

main().catch(console.error).finally(() => process.exit(0));
