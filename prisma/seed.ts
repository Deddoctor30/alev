import { Post } from '@/types/post'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
   const initialPost = [
      {
         title: 'Олимпиада в Хамовниках',
         content: 'Первая в Москве олимпиада будет проходить в легендарном районе - Хамовниках',
         thumbnail: 'https://novostroycity.ru/uploads/html_uploaded/%D0%9B%D0%B5%D1%81%D0%BD%D0%B0%D1%8F%20%D0%9F%D0%BE%D0%BB%D1%8F%D0%BD%D0%B0/%D0%A46.jpeg',
         gip: 'Иванова Александра',
         gap: 'Иванов Александр',
         type: 'HOUSE',
         authorId: {
          connectOr
         }
      }
   ]
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