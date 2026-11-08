"use client";

import { useState, useMemo } from "react";
import { FAQ_DATA, FaqItem } from "@/lib/data";
import { ChevronDown, Search, HelpCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["Todas", "Afiliación y Cuotas", "Trámites y Patentes", "Arbitraje Mercantil", "Bolsa de Empleo y Convenios"];

export function FaqAccordion() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>("faq-01");

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);

      const matchesCat = selectedCategory === "Todas" || item.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Barra de Filtros */}
      <div className="cca-card p-5 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar pregunta frecuente (ej. deducir renta, patente, mediación, cuota)..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-surface text-xs sm:text-sm text-ink placeholder:text-text-muted focus:border-brand focus:outline-none"
          />
        </div>

        {/* Categorías */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-border">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-brand text-white"
                  : "bg-surface-muted text-ink-muted hover:bg-surface border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Acordeones */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-8 text-center text-xs text-text-muted">
            No se encontraron preguntas con los términos buscados.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="cca-card transition-colors overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 group"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-brand">
                      {faq.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-ink group-hover:text-brand transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-200 mt-1 ${
                      isOpen ? "rotate-180 text-brand" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-ink-muted leading-relaxed border-t border-border/60 bg-surface-muted/30">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bloque de Contacto Directo */}
      <div className="p-6 rounded-xl bg-surface-muted border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold text-ink">¿Tiene una consulta específica no resuelta aquí?</h4>
          <p className="text-xs text-text-muted mt-0.5">
            Nuestro equipo de secretaría gremial le atenderá de inmediato vía WhatsApp o teléfono.
          </p>
        </div>
        <Link href="/contacto" className="btn-cca-primary px-4 py-2 text-xs font-semibold shrink-0">
          Contactar a la Cámara
        </Link>
      </div>
    </div>
  );
}

