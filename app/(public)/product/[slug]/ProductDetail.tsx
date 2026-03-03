"use client";
import Image from "next/image";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const { data: session } = useSession(); // obtenemos sesión

  const handleAddToCart = () => {
    if (!session) {
      signIn(); // abre el login de NextAuth
      return;
    }

    addToCart(product, quantity);
    alert(`Añadiste ${quantity} x ${product.name} al carrito`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-6">
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
        <p className="font-semibold">${product.price}</p>

        <div className="flex items-center gap-2 mt-4">
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border rounded px-2 w-20"
          />
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            {session ? "Añadir al carrito" : "Inicia sesión para agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}
