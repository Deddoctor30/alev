// import { PrismaClient } from '@prisma/client'
import { PrismaClient } from './generated/client'
const prisma = new PrismaClient()

async function main() {
   const firstAdmin = await prisma.admin.upsert({
     where: { email: 'Admin@mail.ru' },
     update: {},
     create: {
       email: 'Admin@mail.ru',
       password: '123456',
     },
   })

   console.log({ firstAdmin })
 }
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })