import Link from "next/link";

const categories = [
  { name: "Ropa", slug: "ropa" },
  { name: "Calzado", slug: "calzado" },
  { name: "Tecnología", slug: "tecnologia" },
  { name: "Accesorios", slug: "accesorios" },
];

export default function CategoriesSection() {
  return (
    <section className="px-6">
      <h2 className="text-2xl font-bold mb-6 text-textMain">Categorías</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/products?category=${category.slug}`}
            className="bg-black p-6 rounded-xl text-center hover:bg-gray-800 transition"
          >
            <p className="font-semibold text-white">{category.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
