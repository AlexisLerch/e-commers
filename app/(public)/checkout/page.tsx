"use client";

import { useState } from "react";
import BackButton from "@/components/ui/BackButton";
import Image from "next/image";
import { useCartStore } from "@/store/cart";

export default function CheckoutPage() {
  const cart = useCartStore((state) => state.cart);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    payment: "card",
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async () => {
    setLoading(true);

    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        cart,
        customer: form,
        total,
      }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }

    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <BackButton />

      <h1 className="text-3xl font-bold mb-2">Checkout</h1>

      <p className="text-gray-500 mb-6">
        🛒 {cart.length} productos en tu carrito
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* FORMULARIO */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Datos de envío</h2>

          <input
            placeholder="Nombre completo"
            className="border p-3 rounded-lg"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email"
            className="border p-3 rounded-lg"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            placeholder="Dirección"
            className="border p-3 rounded-lg"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <h2 className="text-xl font-semibold mt-6">Método de pago</h2>

          <select
            className="border p-3 rounded-lg"
            value={form.payment}
            onChange={(e) => setForm({ ...form, payment: e.target.value })}
          >
            <option value="card">Tarjeta</option>
            <option value="mercadopago">MercadoPago</option>
            <option value="transfer">Transferencia</option>
          </select>
        </div>

        {/* RESUMEN */}
        <div className="border rounded-xl p-6 h-fit sticky top-6">
          <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 mb-4 border-b pb-4"
            >
              <div className="relative w-16 h-16 shrink-0">
                <Image
                  src={item.image || "/products/default.jpg"}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                />
              </div>

              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>

                <p className="text-xs text-gray-500">
                  Cantidad: {item.quantity}
                </p>
              </div>

              <p className="font-semibold text-sm">
                ${item.price * item.quantity}
              </p>
            </div>
          ))}

          {/* TOTAL */}
          <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total}</span>
          </div>

          {/* BOTON PAGAR */}
          <button
            onClick={handlePayment}
            className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? "Procesando..." : "Pagar ahora"}
          </button>
        </div>
      </div>
    </div>
  );
}
