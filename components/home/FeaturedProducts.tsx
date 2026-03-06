import { prisma } from "@/lib/prisma";
import FeaturedProductsGrid from "./FeaturedProductsGrid"; // client component

export default async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    take: 20,
    orderBy: { createdAt: "desc" },
  });

  if (!products.length) return null;

  return (
    <section className="px-2 max-w-10xl items-center mx-auto">
      {/* Aquí llamás al client component que hace la animación */}
      <FeaturedProductsGrid products={products} />
    </section>
  );
}
