"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  categories: Category[];
}

export default function CategoriesSectionClient({ categories }: Props) {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="px-4 max-w-1700 mx-auto -mt-10"
    >
      {/* Título con animación */}
      <motion.h2
        className="text-3xl font-bold mb-6 text-textMain"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        Categorías
      </motion.h2>

      {/* Grid de categorías */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-9 gap-4 mb-6"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="w-29 h-20 " // altura fija para simetría
          >
            <Button
              href={`/category/${category.slug}`}
              className="w-full h-full flex items-center justify-center"
            >
              {category.name}
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
