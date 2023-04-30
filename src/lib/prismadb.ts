import { PrismaClient } from '@prisma/client'

// const prisma: PrismaClient = global.prismadb || new PrismaClient()
// if (process.env.NODE_ENV !== 'production') global.prismadb = prisma

// export default prisma

// import { PrismaClient } from "@prisma/client";

let prismaInit: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prismaInit = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prismaInit = (global as any).prisma;
}

export const prisma = prismaInit;