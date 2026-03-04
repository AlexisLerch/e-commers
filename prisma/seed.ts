// prisma/seed.ts
import { prisma } from "@/lib/prisma";

async function main() {
  const categories = [
    { name: "Remeras", slug: "remeras" },
    { name: "Buzos", slug: "buzos" },
    { name: "Accesorios", slug: "accesorios" },
    { name: "Calzado", slug: "calzado" },
  ];

  for (const c of categories) {
    await prisma.category.create({ data: c });
  }

  const products = [
    {
      name: "Remera Oversize White",
      slug: "remera-oversize-white",
      description: "Remera blanca oversize de algodón",
      price: 25,
      image: "/products/remera-white.jpg",
      stock: 50,
      categoryId: "1",
    },
    {
      name: "Buzo Hoodie Gris",
      slug: "buzo-hoodie-gris",
      description: "Buzo gris con capucha",
      price: 45,
      image: "/products/buzo-gris.jpg",
      stock: 30,
      categoryId: "2",
    },
    // agregá los demás productos...
  ];

  for (const p of products) {
    await prisma.product.create({ data: p });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
