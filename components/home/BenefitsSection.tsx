"use client";

import { motion } from "framer-motion";

export default function BenefitsSection() {
  const benefits = [
    {
      title: "Envíos a todo el país",
      description: "Recibí tu pedido donde estés.",
    },
    {
      title: "Pagos seguros",
      description: "Protegemos todas tus transacciones.",
    },
    {
      title: "Cuotas sin interés",
      description: "Pagá en cómodas cuotas con tarjeta.",
    },
  ];

  return (
    <section className="bg-bgMain py-16 px-6 max-w-6xl items-center mx-auto">
      <motion.div
        className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {benefits.map((benefit, i) => (
          <motion.div
            key={i}
            className="p-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -5, scale: 1.03 }} // efecto “lift” al pasar mouse
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
            <p className="text-textMain">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
