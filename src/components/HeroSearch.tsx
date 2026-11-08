"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

/** Evento que escucha DirectorySection cuando el directorio está en la misma página */
export const BUSCAR_EVENT = "cca:buscar";

/** Buscador del Hero: abre el Directorio (búsqueda Algolia) con la consulta escrita */
export function HeroSearch() {
  const [q, setQ] = useState("");
  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const consulta = q.trim();
    router.push(consulta ? `/directorio?q=${encodeURIComponent(consulta)}` : "/directorio");
  };

  return (
    <form onSubmit={onSubmit} role="search" className="relative max-w-xl">
      <Search className="w-4 h-4 text-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
      <input
        id="hero-search-input"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="¿Qué busca? Ej: taller para mi carro, farmacia, soda…"
        aria-label="Buscar comercios afiliados en el directorio"
        className="w-full pl-11 pr-28 py-3 rounded-full border border-border bg-surface text-sm text-ink placeholder:text-text-muted focus:border-brand focus:outline-none"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-ink text-white text-xs font-medium hover:bg-brand transition-colors"
      >
        Buscar
      </button>
    </form>
  );
}
