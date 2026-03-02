"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CartItem as CartItemType } from "@/types/product";

export default function CartComponent() {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [mounted, setMounted] = useState(false);

  // Solo marcar que estamos en cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Cargar carrito solo si estamos montados
  const loadCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  };

  useEffect(() => {
    if (!mounted) return;
    loadCart();
  }, [mounted]);

  // Guardar cambios en localStorage
  useEffect(() => {
    if (mounted) localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, mounted]);

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  if (!mounted) return null; // evita hydration error

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Tu carrito</h1>

      {cart.length === 0 && <p>Tu carrito está vacío</p>}

      {cart.map((item) => (
        <div key={item.id} className="flex items-center gap-4 p-2 border-b">
          <div className="w-24 h-24 relative shrink-0">
            <Image
              src={item.image || "/products/default.jpg"}
              alt={item.name}
              fill
              className="object-cover rounded"
            />
          </div>
          <div className="flex-1">
            <p className="font-semibold">{item.name}</p>
            <p>Cantidad: {item.quantity}</p>
            <p>Precio: ${item.price}</p>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Eliminar
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <p className="mt-4 font-bold text-right">
          Total: $
          {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        </p>
      )}
    </div>
  );
}
