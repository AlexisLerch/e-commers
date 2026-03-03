import Link from "next/link";
import { Session } from "next-auth";

interface HeroSectionProps {
  session: Session | null;
}

export default function HeroSection({ session }: HeroSectionProps) {
  return (
    <section className="bg-bgMain py-20 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-textMain mb-4">
        {session
          ? `Bienvenido de nuevo, ${session.user?.name}`
          : "Descubrí las mejores ofertas del momento"}
      </h1>

      <p className="text-gray-600 text-lg mb-8">
        Encontrá productos increíbles al mejor precio.
      </p>

      <Link
        href="/product"
        className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Ver productos
      </Link>
    </section>
  );
}
