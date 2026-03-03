import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoriesSection from "@/components/home/CategoriesSection";
import BenefitsSection from "@/components/home/BenefitsSection";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col gap-16">
      <HeroSection session={session} />
      <CategoriesSection />
      <FeaturedProducts />
      <BenefitsSection />
    </div>
  );
}
