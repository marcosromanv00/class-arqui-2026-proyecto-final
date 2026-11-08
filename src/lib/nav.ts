export interface SubItem {
  label: string;
  desc: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  subitems?: SubItem[];
}

// Opciones taxonómicas validadas en el estudio de Card Sorting (Optimal Workshop)
export const OPTIMAL_NAV: NavItem[] = [
  {
    label: "La Cámara",
    href: "#manifiesto",
    subitems: [
      { label: "Misión e Historia", desc: "Trayectoria gremial desde 1983", href: "#manifiesto" },
      { label: "Junta Directiva", desc: "Gobernanza y representación cantonal", href: "#manifiesto" },
      { label: "Alcance en Cifras", desc: "+840 empresas y 16 cantones", href: "#estadisticas" },
    ],
  },
  {
    label: "Servicios al Comercio",
    href: "#servicios",
    subitems: [
      { label: "Centro de Arbitraje", desc: "Resolución alterna de disputas (Ley 7727)", href: "#tramites" },
      { label: "Guía de Patente Municipal", desc: "Requisitos de uso de suelo y licencias", href: "#tramites" },
      { label: "Convenios Comerciales", desc: "Tarifas preferenciales para socios", href: "#servicios" },
    ],
  },
  {
    label: "Directorio Comercial",
    href: "#directorio",
    subitems: [
      { label: "Búsqueda por Cantón", desc: "Comercios en los 16 cantones", href: "#directorio" },
      { label: "Comercios por Sector", desc: "Servicios, comercio, industria y salud", href: "#directorio" },
      { label: "Convenios con Descuento", desc: "Beneficios exclusivos entre afiliados", href: "#directorio" },
    ],
  },
  {
    label: "Bolsa de Empleo",
    href: "#empleo",
    subitems: [
      { label: "Vacantes Vigentes", desc: "Puestos activos en Alajuela y El Coyol", href: "#empleo" },
      { label: "Publicar Plaza", desc: "Canal exclusivo para empresas asociadas", href: "#empleo" },
    ],
  },
  {
    label: "Contacto & Sede",
    href: "#contacto",
  },
];
