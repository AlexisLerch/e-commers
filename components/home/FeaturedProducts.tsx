import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function FeaturedProducts() {
  const products = await prisma.product.findMany();

  if (!products.length) {
    return null;
  }

  return (
    <section className="px-6">
      <h2 className="text-2xl font-bold mb-6 text-textMain">
        Productos destacados
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="border rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            <div className="relative w-full h-60">
              <Image
                src={product.image || "/products/default.jpg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-textMain">{product.name}</h3>
              <p className="text-white mt-2">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
