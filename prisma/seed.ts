import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Seed your database here
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async () => {
    await prisma.$disconnect()
    process.exit(1)
  })
