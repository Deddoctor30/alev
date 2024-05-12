"use server"
import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();
 
export async function createPosts() {
  try {
    await prisma.post.create({
      data: {
        title: 'Олимпиада',
        content: 'Олимпиада по футболу'
      },
    })
  } catch (e) {
    throw(e)
  } finally {
    await prisma.$disconnect()
  }
}