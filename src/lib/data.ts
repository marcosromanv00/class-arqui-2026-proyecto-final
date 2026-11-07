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
  ahorroEstimado: string;
  description: string;
}

export interface JobVacancy {
  id: string;
  title: string;
  company: string;
  canton: string;
  district: string;
  type: "Tiempo Completo" | "Medio Tiempo" | "Híbrido";
  salaryRange: string;
  postedDate: string;
  category: "Administración" | "Logística" | "Tecnología" | "Ventas" | "Gastronomía";
  description: string;
  requirements: string[];
}

export interface MunicipalProcedure {
  id: string;
  title: string;
  institution: string;
  timeEstimate: string;
  cost: string;
  summary: string;
  steps: string[];
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
    ahorroEstimado: "₡18.000 / mes en alimentación corporativa",
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
    ahorroEstimado: "₡35.000 por colaborador en salud ocupacional",
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
    ahorroEstimado: "₡75.000 en consultoría de seguridad",
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
    ahorroEstimado: "12% de descuento directo en suministros",
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
    ahorroEstimado: "₡60.000 en honorarios contables",
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
    ahorroEstimado: "₡15.000 / pedido para eventos empresariales",
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
    ahorroEstimado: "15% de ahorro en envíos intercantonales",
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
    ahorroEstimado: "₡22.000 / compra al por mayor",
    description: "Suministros agropecuarios, herramientas de precisión y tecnología de riego para productores de la cuenca cafetalera."
  }
];

export const JOB_VACANCIES_DATA: JobVacancy[] = [
  {
    id: "vac-001",
    title: "Asistente Contable y Tributario",
    company: "Bufete Valverde & Asoc. (Afiliado CCA-005)",
    canton: "Alajuela",
    district: "Alajuela Centro",
    type: "Tiempo Completo",
    salaryRange: "₡480.000 - ₡550.000",
    postedDate: "Hace 2 días",
    category: "Administración",
    description: "Gestión de declaraciones D-101 y D-104 en ATV, conciliaciones bancarias y facturación electrónica de comercios afiliados.",
    requirements: ["Técnico medio en Contabilidad o estudiante universitario", "Manejo de Excel intermedio", "Experiencia mínima 1 año"]
  },
  {
    id: "vac-002",
    title: "Supervisor de Logística e Inventario",
    company: "Parque Empresarial El Coyol (Socio Corporativo)",
    canton: "Alajuela",
    district: "El Coyol",
    type: "Tiempo Completo",
    salaryRange: "₡580.000 - ₡680.000",
    postedDate: "Hace 4 días",
    category: "Logística",
    description: "Coordinación de despachos y recepción de mercancías con zonas francas. Control de stock WMS y enlaces con transportistas.",
    requirements: ["Bachillerato en Logística o Administración", "Licencia B1 al día", "Residir en Alajuela o alrededores"]
  },
  {
    id: "vac-003",
    title: "Técnico de Soporte Cloud & Redes",
    company: "Innovatech Soluciones Cloud (Afiliado CCA-003)",
    canton: "Grecia",
    district: "Grecia Centro",
    type: "Híbrido",
    salaryRange: "₡650.000 - ₡750.000",
    postedDate: "Esta semana",
    category: "Tecnología",
    description: "Configuración de redes de datos, servidores locales y migraciones a la nube para pymes de la región occidental.",
    requirements: ["Certificación CCNA o afín", "Experiencia en Linux/Windows Server", "Disponibilidad de giras en Alajuela"]
  },
  {
    id: "vac-004",
    title: "Asesor de Ventas de Mostrador",
    company: "Ferretería & Materiales San Ramón (Afiliado CCA-004)",
    canton: "San Ramón",
    district: "San Ramón",
    type: "Tiempo Completo",
    salaryRange: "₡400.000 - ₡450.000 + comisiones",
    postedDate: "Hace 6 días",
    category: "Ventas",
    description: "Atención al cliente en mostrador ferretero, cotización de proyectos constructivos y manejo de caja registradora.",
    requirements: ["Secundaria completa", "Vocación de servicio comercial", "Conocimiento básico de herramientas"]
  }
];

export const MUNICIPAL_PROCEDURES_DATA: MunicipalProcedure[] = [
  {
    id: "proc-patente",
    title: "Obtención de Patente Comercial Alajuela",
    institution: "Municipalidad de Alajuela & Ventanilla Única CCA",
    timeEstimate: "5 a 8 días hábiles con acompañamiento CCA",
    cost: "Trámite municipal + Asesoría sin costo para afiliados",
    summary: "Guía paso a paso para apertura formal de locales comerciales, oficinas y bodegas en el cantón central.",
    steps: [
      "1. Certificación de Uso de Suelo compatible emitida por Desarrollo Urbano municipal.",
      "2. Permiso Sanitario de Funcionamiento del Área Rectora de Salud de Alajuela.",
      "3. Póliza de Riesgos del Trabajo del Instituto Nacional de Seguros (INS).",
      "4. Estar al día en obligaciones con la CCSS, FODESAF y Tributación Directa.",
      "5. Presentación formal de solicitud en ventanilla física o digital de la CCA."
    ]
  },
  {
    id: "proc-arbitraje",
    title: "Centro de Arbitraje y Mediación Mercantil",
    institution: "Cámara de Comercio de Alajuela (Fundada 1983)",
    timeEstimate: "Resolución promedio en 15 días hábiles",
    cost: "Tarifa preferencial para agremiados",
    summary: "Mecanismo alternativo de resolución de controversias entre comerciantes para evitar litigios judiciales prolongados.",
    steps: [
      "1. Solicitud de apertura de mediación con resumen de la discrepancia contractual.",
      "2. Notificación formal y convocatoria a las partes en la Sede Gremial CCA.",
      "3. Sesión asistida por abogado mediador colegiado acreditado.",
      "4. Firma de Acta de Conciliación con carácter de cosa juzgada material."
    ]
  }
];

export const PILLARS_DATA = [
  {
    title: "Arbitraje y Mediación Mercantil",
    tagline: "Seguridad jurídica para el comercio local",
    description: "Centro neutral de mediación para dirimir controversias entre socios, clientes y proveedores con fuerza de cosa juzgada, sin litigios judiciales lentos.",
    icon: "Scale",
    actionText: "Ver reglamento de arbitraje",
    actionHref: "#servicios"
  },
  {
    title: "Trámites Municipales y Patentes",
    tagline: "Acompañamiento en formalización cantonal",
    description: "Ventanilla de enlace técnico con la Municipalidad de Alajuela y Ministerio de Salud para agilizar licencias comerciales y uso de suelo.",
    icon: "FileCheck",
    actionText: "Consultar guía de patentes",
    actionHref: "#tramites"
  },
  {
    title: "Bolsa de Empleo y Talento Local",
    tagline: "Conectando empresas y fuerza laboral",
    description: "Plataforma de intermediación laboral para comercios tradicionales, pymes de servicios y empresas de zonas francas en El Coyol.",
    icon: "Globe",
    actionText: "Explorar vacantes activas",
    actionHref: "#empleo"
  },
  {
    title: "Capacitaciones y Alianzas Comerciales",
    tagline: "Preparando al comercio para el futuro",
    description: "Talleres continuos en reforma fiscal (Ley 7092), comercio electrónico y más de 40 convenios con tarifas preferenciales para socios.",
    icon: "Lightbulb",
    actionText: "Ver catálogo de convenios",
    actionHref: "#directorio"
  }
];

export const STATS_DATA = [
  { number: "+840", label: "Comercios Afiliados Verificados", detail: "En los 16 cantones de la provincia de Alajuela" },
  { number: "₡125M", label: "Ahorro Anual en Convenios", detail: "Beneficios médicos, fiscales y logísticos directos para socios" },
  { number: "98.4%", label: "Resolución en Mediaciones", detail: "Efectividad del Centro de Conciliación y Arbitraje Gremial" },
  { number: "4 Min", label: "Tiempo de Afiliación Digital", detail: "Reducción radical frente al trámite presencial histórico de 5 días" },
  { number: "100%", label: "Deducción de Impuesto de Renta", detail: "Cuota gremial deducible al 100% bajo la Ley Costarricense 7092" },
  { number: "+42 Años", label: "Liderazgo Gremial en Costa Rica", detail: "Fundada en 1983 defendiendo el sector productivo de Alajuela" }
];
