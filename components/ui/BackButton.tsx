"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 bg-gray-100 hover:bg-black hover:text-white text-gray-700 px-4 py-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md group mb-8"
    >
      <span className="flex items-center justify-center rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </span>

      <span className="text-sm font-medium tracking-wide">Volver</span>
    </button>
  );
}
