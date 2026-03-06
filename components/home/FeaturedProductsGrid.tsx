"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image?: string | null;
}

interface Props {
  products: Product[];
}

export default function FeaturedProductsGrid({ products }: Props) {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      className="px-2 max-w-10xl mx-auto"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {/* Título fuera del grid */}
      <motion.h2
        className="text-3xl font-bold mb-6 text-textMain"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        Productos Destacados
      </motion.h2>

      {/* Grid de productos */}
      <motion.div
        className="grid md:grid-cols-5 gap-6"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="rounded-xl overflow-hidden border bg-bgCard cursor-pointer"
            whileHover={{
              y: -5,
              scale: 1.03,
              boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href={`/product/${product.slug}`}
              className="block w-full h-full"
            >
              {/* Imagen */}
              <div className="relative w-full h-60">
                <Image
                  src={product.image || "/products/default.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col items-start">
                <h3 className="font-semibold text-textMain">{product.name}</h3>
                <p className="text-white mt-2 font-bold">${product.price}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
