// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Evita múltiples instancias en dev (hot reload)
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // opcional, útil en desarrollo
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
