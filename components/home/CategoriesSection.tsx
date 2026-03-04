import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CategoriesSection() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!categories.length) return null;

  return (
    <section className="px-4">
      <h2 className="text-2xl font-bold mb-6 text-textMain">Categorías</h2>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        {categories.map((category: (typeof categories)[number]) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="bg-black p-6 rounded-xl text-center hover:bg-gray-800 transition"
          >
            <p className="font-semibold text-white">{category.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
