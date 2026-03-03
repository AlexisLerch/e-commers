"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar({ cartCount = 0 }: { cartCount?: number }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-bgMain font-bold text-textMain shadow-md p-4 flex justify-between items-center relative">
      {/* Logo */}
      <div className="text-3xl font-bold hover:text-accent transition-colors">
        <Link href="/">MiEcommerce</Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 items-center">
        {/* Productos */}
        <Link
          href="/product"
          className={`relative pb-1 transition-colors duration-200 hover:text-accent ${
            isActive("/product") ? "text-accent" : ""
          }`}
        >
          Productos
          <span
            className={`absolute left-0 -bottom-0.5 h-0.5 w-full bg-accent transform transition-transform duration-300 origin-left ${
              isActive("/product") ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </Link>

        {/* Carrito */}
        <Link
          href="/cart"
          className={`relative pb-1 transition-colors duration-200 hover:text-accent ${
            isActive("/cart") ? "text-accent" : ""
          }`}
        >
          Carrito
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-accent text-bgMain text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span
            className={`absolute left-0 -bottom-0.5 h-0.5 w-full bg-accent transform transition-transform duration-300 origin-left ${
              isActive("/cart") ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </Link>

        {!session ? (
          <>
            <Link
              href="/login"
              className={`relative pb-1 transition-colors duration-200 hover:text-accent ${
                isActive("/login") ? "text-accent" : ""
              }`}
            >
              Login
              <span
                className={`absolute left-0 -bottom-0.5 h-0.5 w-full bg-accent transform transition-transform duration-300 origin-left ${
                  isActive("/login") ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>

            <Link
              href="/register"
              className={`relative pb-1 transition-colors duration-200 hover:text-accent ${
                isActive("/register") ? "text-accent" : ""
              }`}
            >
              Register
              <span
                className={`absolute left-0 -bottom-0.5 h-0.5 w-full bg-accent transform transition-transform duration-300 origin-left ${
                  isActive("/register") ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          </>
        ) : (
          <>
            <span>Hola, {session.user?.name ?? session.user?.email}</span>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-red-300 hover:text-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-bgMain flex flex-col p-4 gap-4 md:hidden shadow-md">
          <Link href="/product" onClick={() => setMenuOpen(false)}>
            Productos
          </Link>
          <Link href="/cart" onClick={() => setMenuOpen(false)}>
            Carrito
          </Link>

          {!session ? (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link href="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          ) : (
            <>
              <span>Hola, {session.user?.name ?? session.user?.email}</span>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  setMenuOpen(false);
                }}
                className="text-red-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
