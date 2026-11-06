export interface Merchant {
  id: string;
  name: string;
  category: "Gastronomía" | "Servicios" | "Comercio" | "Tecnología" | "Salud";
  canton: "Alajuela" | "San Ramón" | "Grecia" | "Atenas" | "Naranjo" | "Palmares" | "Poás";
  district: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  verified: boolean;
  featured: boolean;
  memberSince: string;
  convenioDescuento: string;
  description: string;
}

export const MERCHANTS_DATA: Merchant[] = [
  {
    id: "cca-001",
    name: "Soda El Parque Tradicional",
    category: "Gastronomía",
    canton: "Alajuela",
    district: "Alajuela Centro",
    address: "Costado Oeste del Parque Central de Alajuela",
    phone: "+506 2441-2090",
    whatsapp: "50688881234",
    email: "contacto@sodaelparque.cr",
    verified: true,
    featured: true,
    memberSince: "1998",
    convenioDescuento: "15% en desayunos y almuerzos ejecutivos para afiliados CCA",
    description: "Auténtica comida criolla alajuelense, café de origen de las laderas del Poás y repostería artesanal con más de 25 años de servicio."
  },
  {
    id: "cca-002",
    name: "Clínica & Óptica Visión Alajuela",
    category: "Salud",
    canton: "Alajuela",
    district: "San José",
    address: "200m Norte de la Catedral de Alajuela",
    phone: "+506 2443-4500",
    whatsapp: "50687002233",
    email: "citas@visionalajuela.com",
    verified: true,
    featured: true,
    memberSince: "2012",
    convenioDescuento: "20% en aros oftálmicos y examen visual de cortesía",
    description: "Salud visual integral, optometría avanzada, lentes digitales y terapia visual para comerciantes y sus colaboradores."
  },
  {
    id: "cca-003",
    name: "Innovatech Soluciones Cloud",
    category: "Tecnología",
    canton: "Grecia",
    district: "Grecia Centro",
    address: "Centro Comercial Plaza Grecia, Local 14",
    phone: "+506 2494-8800",
    whatsapp: "50689994455",
    email: "hola@innovatech.cr",
    verified: true,
    featured: true,
    memberSince: "2020",
    convenioDescuento: "Diagnóstico de ciberseguridad gratuito + 10% en licencias Cloud",
    description: "Transformación digital, facturación electrónica certificada por Hacienda y modernización tecnológica de pymes de Occidente."
  },
  {
    id: "cca-004",
    name: "Ferretería & Materiales San Ramón",
    category: "Comercio",
    canton: "San Ramón",
    district: "San Ramón",
    address: "Calle Ancha, contiguo a la terminal de buses",
    phone: "+506 2445-1122",
    whatsapp: "50683337788",
    email: "ventas@ferreteriasanramon.cr",
    verified: true,
    featured: false,
    memberSince: "2005",
    convenioDescuento: "Precios de mayoreo desde ₡50.000 para proyectos comerciales",
    description: "Distribuidor mayorista y minorista de materiales para construcción, acabados y herramientas industriales en la región occidental."
  },
  {
    id: "cca-005",
    name: "Bufete Consultores Tributarios Valverde & Asoc.",
    category: "Servicios",
    canton: "Alajuela",
    district: "La Guácima",
    address: "Parque Empresarial del Este, Edificio Roble Piso 2",
    phone: "+506 2438-9900",
    whatsapp: "50684923925",
    email: "marcosromanv00@gmail.com",
    verified: true,
    featured: true,
    memberSince: "2015",
    convenioDescuento: "Primera asesoría fiscal de cierre fiscal sin costo",
    description: "Defensa tributaria, planeamiento de renta bajo Ley 7092 y estructuración legal corporativa para empresas del cantón central."
  },
  {
    id: "cca-006",
    name: "Café & Tostaduría Poás Heritage",
    category: "Gastronomía",
    canton: "Poás",
    district: "San Pedro",
    address: "Ruta 146 hacia el Parque Nacional Volcán Poás",
    phone: "+506 2448-3311",
    whatsapp: "50686661100",
    email: "tostaduria@poasheritage.cr",
    verified: true,
    featured: false,
    memberSince: "2018",
    convenioDescuento: "12% de descuento en sacos de café de especialidad para oficinas",
    description: "Micro-lote de café arábica de altura, cataciones y envíos de café recién tostado a toda la provincia de Alajuela."
  },
  {
    id: "cca-007",
    name: "Logística & Carga de Occidente",
    category: "Servicios",
    canton: "Atenas",
    district: "Atenas Centro",
    address: "50m Oeste de la Cruz Roja de Atenas",
    phone: "+506 2446-7788",
    whatsapp: "50685559988",
    email: "operaciones@logisticaoccidente.cr",
    verified: true,
    featured: false,
    memberSince: "2017",
    convenioDescuento: "Tarifa preferencial en fletes consolidados San José - Alajuela - Puntarenas",
    description: "Transporte terrestre de carga liviana y pesada con monitoreo satelital en tiempo real para el comercio minorista."
  },
  {
    id: "cca-008",
    name: "Distribuidora Agrocomercial Naranjo",
    category: "Comercio",
    canton: "Naranjo",
    district: "Naranjo",
    address: "Frente a CoopeNaranjo R.L.",
    phone: "+506 2450-4400",
    whatsapp: "50687773322",
    email: "pedidos@agrocomercialnaranjo.cr",
    verified: true,
    featured: false,
    memberSince: "2009",
    convenioDescuento: "5% adicional en insumos orgánicos certificados",
    description: "Suministros agropecuarios, herramientas de precisión y tecnología de riego para productores de la cuenca cafetalera."
  }
];

export const PILLARS_DATA = [
  {
    title: "Arbitraje y Resolución de Disputas Comerciales",
    tagline: "Seguridad jurídica para el ecosistema productivo",
    description: "Centro neutral de mediación y arbitraje para resolver controversias entre socios, clientes y proveedores sin acudir a procesos judiciales lentos.",
    icon: "Scale"
  },
  {
    title: "Comercio Global y Certificación de Origen",
    tagline: "Ventanilla única de exportación alajuelense",
    description: "Emisión de certificados de origen y acuerdos preferenciales para empresas de zonas francas y agroindustrias de la provincia.",
    icon: "Globe"
  },
  {
    title: "Estándares y Políticas Mercantiles",
    tagline: "Voz representativa ante instituciones de gobierno",
    description: "Defensa activa contra la sobrerregulación, trámites municipales redundantes y promoción de incentivos para inversión en Alajuela.",
    icon: "FileCheck"
  },
  {
    title: "Innovación y Sostenibilidad Gremial",
    tagline: "Preparando a las pymes para la economía del 2030",
    description: "Capacitaciones continuas en facturación digital, canales de venta transfronterizos y descarbonización de cadenas de suministro.",
    icon: "Lightbulb"
  }
];

export const STATS_DATA = [
  { number: "+840", label: "Comercios Afiliados Verificados", detail: "En los 16 cantones de la provincia de Alajuela" },
  { number: "₡125M", label: "Ahorro Anual en Convenios", detail: "Beneficios médicos, fiscales y logísticos directos" },
  { number: "98.4%", label: "Resolución Efectiva de Mediaciones", detail: "Centro de Arbitraje y Conciliación Gremial" },
  { number: "4 Min", label: "Tiempo de Afiliación Digital", detail: "Reducción histórica frente al trámite presencial de 5 días" },
  { number: "100%", label: "Deducción de Impuesto de Renta", detail: "Cuota gremial deducible al 100% bajo la Ley Costarricense 7092" },
  { number: "+42 Años", label: "Liderazgo Gremial en Costa Rica", detail: "Fundada en 1983 defendiendo el sector productivo" }
];
