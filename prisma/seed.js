const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const seedFolder = path.join(__dirname, 'seed');
  const seedFiles = fs.readdirSync(seedFolder).filter((file) => file.endsWith('.js'));

  for (const file of seedFiles) {
    const seed = require(path.join(seedFolder, file));
    console.log(`Running seed: ${file}`);
    await seed(prisma);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
