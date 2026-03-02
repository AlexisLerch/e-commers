import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return <div>{session ? `Hola ${session.user?.name}` : "No logueado"}</div>;
}
