export interface SubItem {
  label: string;
  desc: string;
  href: string;
}

export interface NavItem {
  label: string;
  shortLabel?: string;
  href: string;
  subitems?: SubItem[];
}

// Clasificaciones taxonómicas oficiales validadas en el estudio de Optimal Workshop (OptimalSort & Treejack N=18)
export const OPTIMAL_NAV: NavItem[] = [
  {
    label: "Institucional y Gobernanza",
    shortLabel: "Institucional",
    href: "/la-camara",
    subitems: [
      {
        label: "Quiénes Somos (Misión, Visión, Valores)",
        desc: "Declaración de principios rectores y propósito gremial",
        href: "/la-camara",
      },
      {
        label: "Junta Directiva y Liderazgo",
        desc: "Nómina oficial de directores y presidencia de la Cámara",
        href: "/la-camara#junta",
      },
      {
        label: "Estatutos y Transparencia Legal",
        desc: "Reglamentos internos, personería y estados financieros",
        href: "/la-camara#estatutos",
      },
      {
        label: "Historia del Comercio Alajuelense",
        desc: "Trayectoria gremial ininterrumpida desde 1983",
        href: "/la-camara#historia",
      },
    ],
  },
  {
    label: "Servicios al Comercio",
    shortLabel: "Servicios",
    href: "/servicios",
    subitems: [
      {
        label: "Centro de Arbitraje y Mediación Mercantil",
        desc: "Resolución alterna de controversias comerciales (Ley 7727)",
        href: "/servicios/arbitraje",
      },
      {
        label: "Guía de Trámites y Patente Municipal",
        desc: "Requisitos de uso de suelo, salud y licencias en Alajuela",
        href: "/servicios/tramites",
      },
      {
        label: "Convenios y Descuentos Comerciales",
        desc: "Beneficios y tarifas preferenciales para socios activos",
        href: "/servicios/convenios",
      },
      {
        label: "Bolsa de Empleo Cantonal",
        desc: "Intermediación laboral provincial (acceso polijerárquico)",
        href: "/empleo",
      },
    ],
  },
  {
    label: "Directorio Comercial de Alajuela",
    shortLabel: "Directorio Comercial",
    href: "/directorio",
    subitems: [
      {
        label: "Buscador Inteligente con Filtros por Cantón",
        desc: "Localización geográfica en los 16 cantones de la provincia",
        href: "/directorio",
      },
      {
        label: "Categorías Comerciales (Comercio, Industria, Salud)",
        desc: "Establecimientos formales verificados con distintivo CCA",
        href: "/directorio",
      },
      {
        label: "Convenios y Descuentos Exclusivos",
        desc: "Ahorros y tarifas especiales entre empresas asociadas",
        href: "/directorio?convenio=true",
      },
    ],
  },
  {
    label: "Bolsa de Empleo Cantonal",
    shortLabel: "Bolsa de Empleo",
    href: "/empleo",
    subitems: [
      {
        label: "Vacantes Activas de Asociados",
        desc: "Puestos vigentes en Alajuela Centro, El Coyol y Occidente",
        href: "/empleo",
      },
      {
        label: "Publicar Plaza para Empresas",
        desc: "Canal de reclutamiento exclusivo para socios al día",
        href: "/empleo/publicar",
      },
    ],
  },
  {
    label: "Contacto y Soporte",
    shortLabel: "Contacto y Soporte",
    href: "/contacto",
    subitems: [
      {
        label: "Ubicación Central y Horarios de Atención",
        desc: "Sede física en Plaza Tomás Guardia, Alajuela Centro",
        href: "/contacto",
      },
      {
        label: "Canal Oficial de WhatsApp",
        desc: "Línea directa para atención y validación inmediata",
        href: "https://wa.me/50687030792",
      },
      {
        label: "Buzón de Consultas y Denuncias",
        desc: "Formulario de contacto y asesoría municipal técnica",
        href: "/contacto",
      },
      {
        label: "Preguntas Frecuentes (FAQ)",
        desc: "Respuestas a cuotas, renta (Ley 7092) y trámites frecuentes",
        href: "/faq",
      },
    ],
  },
];
