import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="text-center">
      <h1 className="text-3xl text-gray-500 font-bold mb-4">
        Bienvenido a MiEcommerce{" "}
        {session ? `${session.user?.name}` : "No logueado"}
      </h1>
      <p className="text-lg text-gray-700">
        Explora nuestra tienda online y encuentra los mejores productos.
      </p>
    </div>
  );
}
