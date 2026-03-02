"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Credenciales inválidas");
      return;
    }

    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 p-6 border rounded w-80"
      >
        <h1 className="text-xl font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          required
          className="border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button type="submit" className="bg-black text-white p-2 rounded">
          Ingresar
        </button>
      </form>
    </div>
  );
}
