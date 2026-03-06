"use client";
import Image from "next/image";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart";
import BackButton from "@/components/ui/BackButton";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [showCartAnimation, setShowCartAnimation] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const { data: session } = useSession();

  const handleAddToCart = () => {
    if (!session) {
      signIn();
      return;
    }

    addToCart(product, quantity);

    setShowCartAnimation(true);

    setTimeout(() => {
      setShowCartAnimation(false);
    }, 1200);

    toast.success("Producto agregado al carrito", {
      description: `${quantity} x ${product.name}`,
      action: {
        label: "Ver carrito",
        onClick: () => (window.location.href = "/cart"),
      },
    });
  };

  return (
    <>
      {/* ANIMACION */}
      <AnimatePresence>
        {showCartAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50"
          >
            <div className="flex flex-col items-center gap-6">
              {/* carrito + check */}
              <div className="relative flex items-center justify-center">
                {/* carrito */}
                <motion.div
                  initial={{ scale: 0.5, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 180 }}
                  className="text-[90px]"
                >
                  {/* carrito dibujándose */}
                  <motion.svg
                    width="120"
                    height="120"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.path
                      d="M6 6h15l-1.5 9h-13z"
                      variants={{
                        hidden: { pathLength: 0 },
                        visible: { pathLength: 1 },
                      }}
                      transition={{ duration: 0.4 }}
                    />

                    <motion.circle
                      cx="9"
                      cy="21"
                      r="1"
                      variants={{
                        hidden: { pathLength: 0 },
                        visible: { pathLength: 1 },
                      }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    />

                    <motion.circle
                      cx="20"
                      cy="21"
                      r="1"
                      variants={{
                        hidden: { pathLength: 0 },
                        visible: { pathLength: 1 },
                      }}
                      transition={{ duration: 0.4, delay: 0.25 }}
                    />
                  </motion.svg>
                </motion.div>

                {/* check */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.25 }}
                  className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg"
                >
                  ✓
                </motion.div>
              </div>

              {/* texto */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-white text-xl font-semibold text-center"
              >
                Producto agregado al carrito
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto p-6">
        <BackButton />

        <div className="flex flex-col md:flex-row gap-6">
          <Image
            src={product.image || "/products/default.jpg"}
            alt={product.name}
            width={400}
            height={300}
            className="w-full md:w-1/2 object-cover rounded-lg"
          />

          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p>{product.description}</p>
            <p className="font-semibold text-lg">${product.price}</p>

            <div className="flex items-center gap-2 mt-4">
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded px-2 w-20"
              />

              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleAddToCart}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                {session ? "Añadir al carrito" : "Inicia sesión para agregar"}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
