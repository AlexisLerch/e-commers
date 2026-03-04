// app/(public)/product/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductDetail from "./ProductDetail";
import { Product } from "@/types/product"; // tu interface Product

interface PageProps {
  params: Promise<{ slug: string }>; // ⚠️ params es Promise
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) return notFound();

  const productFromDB = await prisma.product.findUnique({
    where: { slug },
  });

  if (!productFromDB) return notFound();

  const product: Product = {
    id: productFromDB.id,
    name: productFromDB.name,
    slug: productFromDB.slug,
    description: productFromDB.description,
    price: productFromDB.price,
    image: productFromDB.image || "/products/default.jpg",
    categoryId: productFromDB.categoryId || "",
    
  };

  return <ProductDetail product={product} />;
}
