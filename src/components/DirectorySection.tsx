"use client";

import { useState, useMemo } from "react";
import { MERCHANTS_DATA, Merchant } from "@/lib/data";
import { Search, MapPin, Phone, MessageSquare, CheckCircle, Tag, Filter } from "lucide-react";

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
        m.convenioDescuento.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCanton = selectedCanton === "Todos" || m.canton === selectedCanton;
      const matchesCategory = selectedCategory === "Todos" || m.category === selectedCategory;

      return matchesSearch && matchesCanton && matchesCategory;
    });
  }, [searchQuery, selectedCanton, selectedCategory]);

  return (
    <section id="directorio" className="border-b border-slate-200 bg-slate-50/50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-8 mb-10 gap-6">
          <div>
            <p className="text-xs uppercase font-extrabold tracking-widest text-sky-600 mb-2">
              Directorio de Confianza
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Comercios y Servicios Verificados
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Filtre por cantón y sector económico. Conecte de inmediato vía WhatsApp con empresas afiliadas formalmente a la Cámara.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-semibold bg-white border border-slate-200 px-3 py-2 self-start md:self-end">
            Mostrando <span className="text-slate-950 font-bold">{filteredMerchants.length}</span> de {MERCHANTS_DATA.length} afiliados registrados
          </div>
        </div>

        {/* Barra de Filtros Facetados (Estilo Limpio de Arquitectura de Información) */}
        <div className="bg-white border border-slate-200 p-5 mb-8 shadow-xs space-y-4">
          
          {/* Buscador de texto predictivo */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, producto, servicio o convenio de descuento (ej: café, fiscal, óptica)..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-950 focus:outline-hidden transition-colors"
            />
          </div>

          {/* Filtros por Categoría y Cantón */}
          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100 text-xs">
            <span className="flex items-center gap-1 font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              <Filter className="w-3 h-3" /> Cantón:
            </span>
            <div className="flex flex-wrap gap-1">
              {cantons.map((canton) => (
                <button
                  key={canton}
                  onClick={() => setSelectedCanton(canton)}
                  className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                    selectedCanton === canton
                      ? "bg-slate-950 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {canton}
                </button>
              ))}
            </div>

            <div className="w-full md:w-auto h-px md:h-4 bg-slate-200 hidden md:block" />

            <span className="flex items-center gap-1 font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Sector:
            </span>
            <div className="flex flex-wrap gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-slate-950 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Cuadrícula de Comercios */}
        {filteredMerchants.length === 0 ? (
          <div className="bg-white border border-slate-200 p-12 text-center">
            <p className="text-base font-bold text-slate-800">No se encontraron comercios con esos criterios.</p>
            <p className="text-xs text-slate-500 mt-1">Intente restablecer los filtros de cantón o sector.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCanton("Todos");
                setSelectedCategory("Todos");
              }}
              className="mt-4 px-4 py-2 bg-slate-950 text-white text-xs font-semibold uppercase tracking-wider"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMerchants.map((merchant) => (
              <div
                key={merchant.id}
                className="bg-white border border-slate-200 hover:border-slate-950 transition-colors p-6 flex flex-col justify-between group shadow-xs"
              >
                <div>
                  
                  {/* Categoría y Cantón */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-bold text-sky-600 uppercase tracking-widest text-[10px]">
                      {merchant.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {merchant.canton}
                    </span>
                  </div>

                  {/* Nombre y Verificación */}
                  <div className="flex items-start gap-1.5">
                    <h3 className="text-base font-extrabold text-slate-950 leading-snug group-hover:text-sky-600 transition-colors">
                      {merchant.name}
                    </h3>
                    {merchant.verified && (
                      <span title="Afiliado Verificado CCA" className="inline-flex">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      </span>
                    )}
                  </div>

                  {/* Descripción */}
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {merchant.description}
                  </p>

                  {/* Convenio de Descuento (Doble anclaje taxonómico) */}
                  {merchant.convenioDescuento && (
                    <div className="mt-4 p-2.5 bg-amber-50/60 border border-amber-200/80 rounded-none text-xs text-amber-900 flex items-start gap-2">
                      <Tag className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-[10px] uppercase tracking-wide text-amber-800">
                          Convenio Oficial CCA
                        </span>
                        <span className="leading-snug text-[11px]">{merchant.convenioDescuento}</span>
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
                    Miembro desde {merchant.memberSince}
                  </span>
                  
                  <a
                    href={`https://wa.me/${merchant.whatsapp}?text=Hola%20${encodeURIComponent(merchant.name)},%20los%20contacto%20a%20través%20del%20Directorio%20Oficial%20de%20la%20Cámara%20de%20Comercio%20de%20Alajuela.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-emerald-600 hover:text-white transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    WhatsApp
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
