import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionLayout from "@/components/SessionLayout";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MiEcommerce",
  description: "Tienda online de ejemplo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bgMain text-textMain`}
      >
        <SessionLayout>{children}</SessionLayout>
      </body>
    </html>
  );
}
