// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";

// export default async function HomePage() {
//   const session = await getServerSession(authOptions);

//   return (
//     <div className="text-center">
//       <h1 className="text-3xl text-gray-500 font-bold mb-2">
//         Bienvenido a MiEcommerce {session && session.user?.name}
//       </h1>

//       {!session && (
//         <p className="text-sm text-gray-500 mb-2">
//           Inicia sesión para una experiencia personalizada
//         </p>
//       )}

//       <p className="text-lg text-gray-700">
//         Explora nuestra tienda online y encuentra los mejores productos.
//       </p>
//     </div>
//   );
// }

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
