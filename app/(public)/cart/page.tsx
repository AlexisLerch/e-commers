"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CartComponent from "@/components/cart/CartComponent";
import BackButton from "@/components/ui/BackButton";

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Cuando status cambia, verificamos sesión
  useEffect(() => {
    if (status === "loading") return; // espera a que cargue la sesión
    if (!session) {
      router.push("/login"); // redirige a login si no hay sesión
    }
  }, [session, status, router]);

  // Mientras carga o no hay sesión, podemos mostrar un mensaje
  if (status === "loading" || !session) {
    return <div className="p-6">Verificando sesión...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <BackButton />
      <h1 className="text-2xl font-bold mb-4">Tu carrito</h1>
      <CartComponent />
    </div>
  );
}
