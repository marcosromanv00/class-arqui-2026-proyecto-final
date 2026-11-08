import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cámara de Comercio de Alajuela | Representación Empresarial y Competitividad",
  description:
    "Sitio oficial de la Cámara de Comercio de Alajuela. Respaldamos a más de 800 empresas en los 16 cantones de la provincia: defensa gremial, arbitraje mercantil, trámites municipales, bolsa de empleo y directorio verificado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`scroll-smooth ${plusJakartaSans.variable} ${newsreader.variable}`}
    >
      <body className="antialiased bg-canvas text-ink selection:bg-brand/10 selection:text-brand min-h-screen flex flex-col font-sans">
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
