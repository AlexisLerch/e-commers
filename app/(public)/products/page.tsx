"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((p) => (
        <div key={p.id} className="border p-4 rounded flex flex-col">
          {p.image && (
            <Image
              src={p.image}
              alt={p.name}
              width={200}
              height={200}
              className="object-cover mb-4"
            />
          )}
          <h2 className="font-bold text-lg">{p.name}</h2>
          <p className="text-sm mb-2">{p.description}</p>
          <p className="font-semibold mb-4">${p.price.toFixed(2)}</p>
          <Link
            href={`/cart/add/${p.id}`}
            className="bg-black text-white p-2 text-center rounded"
          >
            Agregar al carrito
          </Link>
        </div>
      ))}
    </div>
  );
}
