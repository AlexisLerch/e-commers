import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Zapatillas Urban",
        slug: "zapatillas-urban",
        description: "Zapatillas cómodas para uso diario",
        price: 120,
        stock: 10,
        image: "/products/zapas.jpg",
      },
      {
        name: "Remera Oversize",
        slug: "remera-oversize",
        description: "Remera algodón premium",
        price: 45,
        stock: 25,
        image: "/products/remera.jpg",
      },
      {
        name: "Campera Denim",
        slug: "campera-denim",
        description: "Campera clásica de jean",
        price: 180,
        stock: 5,
        image: "/products/campera.jpg",
      },
    ],
  });

  console.log("✅ Productos creados");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
