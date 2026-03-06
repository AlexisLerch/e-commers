"use client";

import { Session } from "next-auth";
import { motion } from "framer-motion";
import Button from "../ui/Button";

interface HeroSectionProps {
  session: Session | null;
}

export default function HeroSection({ session }: HeroSectionProps) {
  return (
    <section className="bg-bgMain py-20 px-6 text-center max-w-8xl mx-auto mt-16">
      {/* Título animado */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-8xl font-bold text-textMain mb-16"
      >
        {session
          ? `Bienvenido de nuevo, ${session.user?.name}`
          : "Descubrí las mejores ofertas del momento"}
      </motion.h1>

      {/* Subtítulo animado */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-gray-600 text-2xl mb-24"
      >
        Encontrá productos increíbles al mejor precio.
      </motion.p>

      {/* Botón animado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-64 md:w-40 mx-auto" // ancho fijo y centrado
      >
        <Button href="/product" className="w-full h-20">
          Ver Productos
        </Button>
      </motion.div>
    </section>
  );
}
