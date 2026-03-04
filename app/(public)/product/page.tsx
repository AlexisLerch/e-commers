import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const products = await prisma.product.findMany();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: (typeof products)[number]) => (
          <Link key={product.id} href={`/product/${product.slug}`}>
            <div className="border p-4 cursor-pointer hover:shadow-lg transition">
              <Image
                src={product.image || "/products/default.jpg"}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-lg font-bold mt-2">{product.name}</h2>
              <p className="text-gray-700">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
