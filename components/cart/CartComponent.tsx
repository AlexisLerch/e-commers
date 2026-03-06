"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";

export default function CartComponent() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Eliminar
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="mt-6 flex flex-col items-end gap-4">
          <p className="font-bold text-lg">Total: ${total}</p>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/products")}
              className="border px-5 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Seguir comprando
            </button>

            <button
              onClick={() => router.push("/checkout")}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Comprar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
