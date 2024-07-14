// import { PrismaClient } from '@prisma/client'
// import { PrismaClient } from './prisma/generated/client'
import { PrismaClient } from '@/prisma/generated/client'

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["info"]
  })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma