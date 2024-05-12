"use server"
import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();
 
export async function createUser(values: {username: string, email: string, role: string}) {
  const newUser = await prisma.user.create({
    data: {
      name: values.username,
      email: values.email,
      role: values.role
    },
  });
 
  // const users = await prisma.user.findMany();
}