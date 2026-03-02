// /app/(public)/cart/page.tsx
"use client";
import CartComponent from "@/components/cart/CartComponent";

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Tu carrito</h1>
      <CartComponent />
    </div>
  );
}
