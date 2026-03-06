"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart";

export default function SuccessPage() {
  const [showAnimation, setShowAnimation] = useState(true);
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();

    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [clearCart]);

  return (
    <>
      {/* ANIMACION */}
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50"
          >
            <div className="flex flex-col items-center gap-6">
              {/* símbolo dinero */}
              <div className="relative flex items-center justify-center">
                {/* glow */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.4 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-32 h-32 bg-green-500/30 rounded-full blur-2xl"
                />

                {/* $ principal */}
                <motion.div
                  initial={{ scale: 0.3, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 160 }}
                  className="text-[90px] text-white drop-shadow-lg relative z-10"
                >
                  $
                </motion.div>

                {/* check */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -top-2 -right-2 text-green-400 text-3xl z-20"
                >
                  ✓
                </motion.div>

                {/* $ flotantes */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.6, y: -20 }}
                  transition={{ duration: 1 }}
                  className="absolute -left-10 text-white text-2xl"
                >
                  $
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.6, y: -20 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="absolute -right-7.5 text-white text-xl"
                >
                  $
                </motion.div>
              </div>

              {/* texto */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <p className="text-white text-xl font-semibold">
                  Pago confirmado
                </p>

                <p className="text-white/80 text-sm mt-1">
                  ¡Gracias por tu compra!
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENIDO SOLO DESPUES DE LA ANIMACION */}
      {!showAnimation && (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
          <h1 className="text-3xl font-bold">Gracias por su compra</h1>

          <p className="text-gray-500 mt-2">
            Tu pago fue procesado correctamente
          </p>

          <button
            onClick={() => router.push("/")}
            className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Seguir comprando
          </button>
        </div>
      )}
    </>
  );
}
