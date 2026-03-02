// app/(public)/product/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductDetail from "./ProductDetail";
import { Product } from "@/types/product"; // tu interface Product

interface PageProps {
  params: Promise<{ slug: string }>; // ⚠️ params es Promise
}

export default async function ProductPage({ params }: PageProps) {
  // esperar a que params se resuelva
  const resolvedParams = await params;

  if (!resolvedParams?.slug) return notFound();

  const productFromDB = await prisma.product.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!productFromDB) return notFound();

  const product: Product = {
    id: productFromDB.id,
    name: productFromDB.name,
    slug: productFromDB.slug,
    description: productFromDB.description,
    price: productFromDB.price,
    image: productFromDB.image || "/products/default.jpg",
  };

  return <ProductDetail product={product} />;
}
