import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cámara de Comercio de Alajuela | For business. For you.",
  description: "Rediseño Institucional de Arquitectura de Información. Plataforma oficial de representación gremial, directorio comercial verificado y servicios corporativos en la provincia de Alajuela.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased bg-white text-slate-900 selection:bg-sky-100 selection:text-sky-900 min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
