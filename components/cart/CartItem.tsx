// /components/cart/CartItem.tsx
"use client";
import { CartItem as CartItemType } from "@/types/product";

interface Props {
  item: CartItemType;
  removeFromCart: (id: string) => void;
}

export default function CartItem({ item, removeFromCart }: Props) {
  return (
    <div className="flex justify-between items-center p-2 border-b">
      <div>
        <p>{item.name}</p>
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
  );
}
