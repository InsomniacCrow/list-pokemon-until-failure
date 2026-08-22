import { prisma } from "./prisma";

async function main() {
  
  // Fetch all users with their posts
  const allUsers = await prisma.userscore.findMany();
  console.log("All scores:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });