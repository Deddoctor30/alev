"use server"
import User from '@/types/user';
import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();

type GetUsers = {
   (): Promise<User[]>
}
 
export  const getUsers  = async <GetUsers> () => {
   try {
     return await prisma.user.findMany({
         include: {
            posts: true
         }
        });
   } catch (e) {
      throw e
   } finally {
      await prisma.$disconnect()
   }
}