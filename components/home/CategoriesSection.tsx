import { prisma } from "@/lib/prisma";
import CategoriesSectionClient from "./CategoriesGridProps"; // componente cliente

export default async function CategoriesSection() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  if (!categories.length) return null;

  return <CategoriesSectionClient categories={categories} />;
}
