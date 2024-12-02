const bcrypt = require('bcrypt');

async function seedUsers(prisma) {
  const username = 'admin';
  const password = 'admin';

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.users.upsert({
    where: { username },
    update: {},
    create: {
      username,
      name: 'Admin',
      password: hashedPassword,
    },
  });

  console.log('Seeded: Default User');
}

module.exports = seedUsers;
