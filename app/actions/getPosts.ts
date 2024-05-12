"use server"
import Post from '@/types/post';
import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();

type GetPosts = {
   (): Promise<Post[]>
}
 
export  const getPosts  = async <GetPosts> () => {
   try {
     return await prisma.post.findMany({
         include: {
            author: true
         }
        });
   } catch (e) {
      throw e
   } finally {
      await prisma.$disconnect()
   }
}