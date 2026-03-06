"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ cartCount = 0 }: { cartCount?: number }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLogo, setHoveredLogo] = useState(false);

  const isActive = (path: string) => pathname === path;

  const isHome = pathname === "/";
  const fullText = "MyEcommerce";
  const shortText = "MyEc";

  const showFull = isHome || hoveredLogo;
  const visibleLength = showFull ? fullText.length : shortText.length;

  const letters = fullText.split("");

  // colores progresivos
  const letterColors = [
    "text-white",
    "text-gray-200",
    "text-gray-300",
    "text-gray-400",
    "text-gray-400",
    "text-gray-500",
    "text-gray-500",
    "text-gray-500",
    "text-gray-500",
    "text-gray-500",
    "text-gray-500",
  ];

  return (
    <nav className="bg-[#2e2b2b] font-bold text-white shadow-md p-3 sm:pr-14 sm:pl-14 flex justify-between items-center relative">
      {/* LOGO */}
      <Link href="/">
        <div
          onMouseEnter={() => setHoveredLogo(true)}
          onMouseLeave={() => setHoveredLogo(false)}
          className="text-3xl font-bold cursor-pointer select-none flex"
        >
          {letters.map((letter, i) => {
            const isVisible = i < visibleLength;

            return (
              <AnimatePresence key={i}>
                {isVisible && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{
                      duration: 0.2,
                      delay: i * 0.05,
                    }}
                    className={letterColors[i] || "text-gray-800"}
                  >
                    {letter}
                  </motion.span>
                )}
              </AnimatePresence>
            );
          })}
        </div>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 items-center">
        <Link
          href="/product"
          className={`relative pb-1 transition-colors duration-200 hover:text-gray-300 ${
            isActive("/product") ? "text-gray-300" : ""
          }`}
        >
          Productos
          <span
            className={`absolute left-0 -bottom-0.5 h-0.5 w-full bg-gray-300 transform transition-transform duration-300 origin-left ${
              isActive("/product") ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </Link>

        <Link
          href="/cart"
          className={`relative pb-1 transition-colors duration-200 hover:text-gray-300 ${
            isActive("/cart") ? "text-gray-300" : ""
          }`}
        >
          Carrito
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-gray-300 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span
            className={`absolute left-0 -bottom-0.5 h-0.5 w-full bg-gray-300 transform transition-transform duration-300 origin-left ${
              isActive("/cart") ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </Link>

        {!session ? (
          <>
            <Link
              href="/login"
              className={`relative pb-1 transition-colors text-gray-400 duration-200 hover:text-gray-200 ${
                isActive("/login") ? "text-gray-200" : ""
              }`}
            >
              Login
              <span
                className={`absolute left-0 -bottom-0.5 h-0.5 w-full bg-gray-300 transform transition-transform duration-300 origin-left ${
                  isActive("/login") ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>

            <Link
              href="/register"
              className={`relative pb-1 transition-colors text-gray-400 duration-200 hover:text-gray-200 ${
                isActive("/register") ? "text-gray-200" : ""
              }`}
            >
              Register
              <span
                className={`absolute left-0 -bottom-0.5 h-0.5 w-full bg-gray-300 transform transition-transform duration-300 origin-left ${
                  isActive("/register") ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          </>
        ) : (
          <>
            <span className="text-gray-300">
              Hola, {session.user?.name ?? session.user?.email}
            </span>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-red-300 hover:text-red-500 transition-colors duration-200"
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Button */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative w-8 h-8 flex flex-col justify-center items-center"
        >
          <span
            className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[90%] max-w-sm bg-[#2e2b2b] rounded-xl shadow-xl flex flex-col p-6 gap-4 md:hidden z-50">
          <Link
            href="/product"
            onClick={() => setMenuOpen(false)}
            className="hover:text-gray-300 transition-colors"
          >
            Productos
          </Link>

          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className="hover:text-gray-300 transition-colors"
          >
            Carrito
          </Link>

          {!session ? (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="hover:text-gray-300 transition-colors"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="hover:text-gray-300 transition-colors"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-400">
                Hola, {session.user?.name ?? session.user?.email}
              </span>

              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  setMenuOpen(false);
                }}
                className="text-red-400 hover:text-red-600 transition-colors text-left"
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
