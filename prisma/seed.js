const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seed() {
  const email = "nico@nifunke.de";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("review", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const concerts = [
    {
      id: "1",
      description: "What a great lineup!",
      title: "Stick To Your Guns",
    },
    {
      id: "2",
      description: "Death Metal, hell yeah!",
      title: "Suffocation",
    },
  ];

  for (const concert of concerts) {
    await prisma.concert.upsert({
      where: { id: concert.id },
      update: concert,
      create: concert,
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
