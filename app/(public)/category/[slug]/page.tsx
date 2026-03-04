import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product"; // tu interface Product

interface Props {
  params: { slug: string };
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params; // <-- esperar el Promise
  const { slug } = resolvedParams; // ahora sí destructuramos

  if (!slug) {
    return <div>Slug inválido</div>;
  }

  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Categoría no encontrada</h1>
      </div>
    );
  }

  const products: Product[] = (
    await prisma.product.findMany({
      where: { categoryId: category.id },
    })
  ).map((p: any) => ({
    // ⚠️ le decimos explícitamente el tipo aquí
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: p.price,
    image: p.image || "/products/default.jpg",
    categoryId: p.categoryId,
  }));

  if (!products.length) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">
          No hay productos en esta categoría
        </h1>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8 capitalize">{category.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.slug}`}>
            <div className="border p-4 hover:shadow-lg transition cursor-pointer">
              <Image
                src={product.image || "/products/default.jpg"}
                alt={product.name}
                width={400}
                height={400}
                className="object-cover w-full h-64"
              />
              <h2 className="mt-4 font-semibold">{product.name}</h2>
              <p className="text-gray-500">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
