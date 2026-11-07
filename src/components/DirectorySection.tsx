"use client";

import { useState, useMemo } from "react";
import { MERCHANTS_DATA, Merchant } from "@/lib/data";
import { Search, MapPin, Phone, MessageSquare, CheckCircle, Tag, Filter, Briefcase, Sparkles } from "lucide-react";

export function DirectorySection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCanton, setSelectedCanton] = useState<string>("Todos");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const cantons = ["Todos", "Alajuela", "San Ramón", "Grecia", "Atenas", "Naranjo", "Poás"];
  const categories = ["Todos", "Gastronomía", "Servicios", "Comercio", "Tecnología", "Salud"];

  const filteredMerchants = useMemo(() => {
    return MERCHANTS_DATA.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.convenioDescuento.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.district.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCanton = selectedCanton === "Todos" || m.canton === selectedCanton;
      const matchesCategory = selectedCategory === "Todos" || m.category === selectedCategory;

      return matchesSearch && matchesCanton && matchesCategory;
    });
  }, [searchQuery, selectedCanton, selectedCategory]);

  return (
    <section id="directorio" className="border-b border-slate-200/80 bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Sección (80% fondo blanco, tipografía serena) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200/80 pb-8 mb-10 gap-6">
          <div>
            <p className="text-xs uppercase font-bold tracking-widest text-[#991b1b] mb-2">
              Directorio de Confianza Comercial
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#09090b] tracking-tight">
              Comercios y Servicios Verificados
            </h2>
            <p className="mt-2.5 text-sm text-slate-600 max-w-xl leading-relaxed">
              Consulte empresas formalmente afiliadas a la Cámara en los 16 cantones. Contacto directo por WhatsApp y visualización de convenios de ahorro gremial.
            </p>
          </div>

          <div 
            id="directorio-results-count"
            className="text-xs text-slate-600 font-semibold bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl self-start md:self-end shadow-2xs"
          >
            Mostrando <span className="text-[#991b1b] font-bold">{filteredMerchants.length}</span> de {MERCHANTS_DATA.length} comercios auditados
          </div>
        </div>

        {/* Barra de Filtros Facetados Claymorphic (Estructura Algolia / Maze compatible) */}
        <div className="clay-card p-6 mb-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
          
          {/* Buscador de texto predictivo */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="directorio-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre comercial, producto, distrito o convenio de descuento (ej: café, fiscal, óptica)..."
              className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:border-[#991b1b] focus:ring-1 focus:ring-[#991b1b] focus:outline-hidden transition-all text-slate-900"
            />
          </div>

          {/* Filtros por Categoría y Cantón en Clay-pills */}
          <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-100 text-xs">
            <span className="flex items-center gap-1.5 font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              <Filter className="w-3.5 h-3.5 text-slate-400" /> Cantón:
            </span>
            <div id="directorio-filter-canton" className="flex flex-wrap gap-1.5">
              {cantons.map((canton) => (
                <button
                  key={canton}
                  onClick={() => setSelectedCanton(canton)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedCanton === canton
                      ? "bg-[#991b1b] text-white shadow-[0_2px_8px_rgba(153,27,27,0.35)]"
                      : "bg-slate-100/80 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {canton}
                </button>
              ))}
            </div>

            <div className="w-full md:w-auto h-px md:h-4 bg-slate-200 hidden md:block" />

            <span className="flex items-center gap-1.5 font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              Sector:
            </span>
            <div id="directorio-filter-category" className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedCategory === cat
                      ? "bg-[#09090b] text-white shadow-[0_2px_8px_rgba(9,9,11,0.35)]"
                      : "bg-slate-100/80 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Polijerarquía: Enlace cruzado con Bolsa de Empleo (Optimal Sorting N=18) */}
        <div className="mb-8 p-4 bg-red-50/40 border border-red-200/80 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-slate-800">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-[#991b1b] flex items-center justify-center shrink-0">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[#991b1b]">Bolsa de Empleo Cantonal vinculada:</span>
              <span className="text-slate-600 ml-1.5">Consulte vacantes activas publicadas por las empresas agremiadas en El Coyol y Alajuela Centro.</span>
            </div>
          </div>
          <a
            href="#empleo"
            className="clay-button-secondary text-xs px-3.5 py-1.5 font-semibold text-[#991b1b] hover:text-[#7f1d1d] shrink-0"
          >
            Ver vacantes abiertas
          </a>
        </div>

        {/* Cuadrícula de Comercios en Claymorph Cards */}
        {filteredMerchants.length === 0 ? (
          <div className="clay-card rounded-2xl bg-white border border-slate-200 p-12 text-center">
            <p className="text-base font-bold text-slate-800">No se encontraron comercios con esos criterios.</p>
            <p className="text-xs text-slate-500 mt-1">Intente restablecer los filtros de cantón o sector.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCanton("Todos");
                setSelectedCategory("Todos");
              }}
              className="clay-button-primary mt-4 px-4 py-2 text-xs uppercase tracking-wider"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMerchants.map((merchant) => (
              <div
                key={merchant.id}
                data-merchant-id={merchant.id}
                className="clay-card rounded-2xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between group"
              >
                <div>
                  
                  {/* Categoría y Cantón */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-bold text-[#991b1b] uppercase tracking-wider text-[10px] bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
                      {merchant.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-500 font-medium text-[11px]">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {merchant.district}, {merchant.canton}
                    </span>
                  </div>

                  {/* Nombre y Verificación */}
                  <div className="flex items-start gap-1.5">
                    <h3 className="text-base font-bold text-[#09090b] leading-snug group-hover:text-[#991b1b] transition-colors">
                      {merchant.name}
                    </h3>
                    {merchant.verified && (
                      <span title="Afiliado Verificado CCA" className="inline-flex shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      </span>
                    )}
                  </div>

                  {/* Descripción */}
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {merchant.description}
                  </p>

                  {/* Convenio de Descuento con ROI Estimado (Validación Card Sorting N=18) */}
                  {merchant.convenioDescuento && (
                    <div className="mt-4 p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-800 font-semibold text-[11px]">
                        <Tag className="w-3.5 h-3.5 text-[#991b1b]" />
                        <span>Convenio CCA:</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        {merchant.convenioDescuento}
                      </p>
                      <div className="pt-1 flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                        <Sparkles className="w-3 h-3" />
                        <span>ROI estimado: {merchant.ahorroEstimado}</span>
                      </div>
                    </div>
                  )}

                  {/* Dirección y teléfono */}
                  <div className="mt-4 text-[11px] text-slate-500 space-y-1">
                    <p className="line-clamp-1">{merchant.address}</p>
                    <p className="flex items-center gap-1 font-mono text-slate-700">
                      <Phone className="w-3 h-3 text-slate-400" />
                      {merchant.phone}
                    </p>
                  </div>

                </div>

                {/* Botón WhatsApp Directo (Soluciona 4 clics ciegos del sitio anterior) */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                    Socio desde {merchant.memberSince}
                  </span>
                  
                  <a
                    href={`https://wa.me/${merchant.whatsapp}?text=Hola%20${encodeURIComponent(merchant.name)},%20los%20contacto%20a%20través%20del%20Directorio%20Oficial%20de%20la%20Cámara%20de%20Comercio%20de%20Alajuela.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clay-button-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50/70 border-emerald-200 hover:bg-emerald-600 hover:text-white transition-all rounded-lg"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
