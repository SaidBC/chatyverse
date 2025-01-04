const generatePassword = require("../utils/generantePassword");
const prisma = require("../utils/prisma");

async function main() {
  const userOneData = {
    email: "said@dm.com",
    username: "said123",
    password: await generatePassword("12345"),
  };
  const userTwoData = {
    email: "hoda@dm.com",
    username: "hoda123",
    password: await generatePassword("12345"),
  };
  const users = await prisma.user.createMany({
    data: [userOneData, userTwoData],
  });
  console.log(users);
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
