import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cámara de Comercio de Alajuela · Portal Institucional",
  description: "Plataforma oficial de la Cámara de Comercio de Alajuela (Fundada en 1983). Directorio comercial verificado, bolsa de empleo cantonal, trámites de patentes, mediación y afiliación digital SINPE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased bg-white text-slate-900 selection:bg-red-100 selection:text-red-900 min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
