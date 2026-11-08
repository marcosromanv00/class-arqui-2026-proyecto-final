export interface Merchant {
  id: string;
  name: string;
  category: "Gastronomía" | "Servicios" | "Comercio" | "Tecnología" | "Salud" | "Construcción" | "Automotriz" | "Agroindustria";
  canton: string;
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
  rating?: number;
  keywords?: string[];
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
  category: "Administración" | "Logística" | "Tecnología" | "Ventas" | "Gastronomía" | "Salud" | "Operario";
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

export interface BoardMember {
  role: string;
  name: string;
  company: string;
  sector: string;
  bio: string;
}

export interface HistoricalMilestone {
  year: string;
  title: string;
  description: string;
}

export interface CantonInfo {
  name: string;
  cabecera: string;
  afiliados: number;
  actividadPrincipal: string;
}

export interface ConvenioAlliance {
  id: string;
  partner: string;
  category: "Salud & Bienestar" | "Financiero & Banca" | "Seguros & Riesgos" | "Combustible & Flotas" | "Tecnología & Telecom";
  discount: string;
  roiEjemplo: string;
  description: string;
  terms: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "Afiliación y Cuotas" | "Trámites y Patentes" | "Arbitraje Mercantil" | "Bolsa de Empleo y Convenios";
}

export const MERCHANTS_DATA: Merchant[] = [
  {
    id: "cca-001",
    name: "Ferretería El Candado Alajuelense",
    category: "Construcción",
    canton: "Alajuela",
    district: "Alajuela Centro",
    address: "Calle Ancha, 150m norte del Mercado Central",
    phone: "+506 2441-2090",
    whatsapp: "50688412090",
    email: "ventas@elcandado.cr",
    verified: true,
    featured: true,
    memberSince: "2012",
    rating: 4.9,
    convenioDescuento: "10% de descuento en pinturas y herramientas manuales para socios CCA",
    ahorroEstimado: "₡45.000 / mes en compras de mantenimiento",
    description: "Materiales pesados, cerrajería, pintura automotriz y asesoría técnica para proyectos residenciales y comerciales en el casco central.",
    keywords: ["ferreteria", "candado", "construccion", "herramientas", "pintura", "materiales", "cemento"]
  },
  {
    id: "cca-002",
    name: "Taller Mecánico Hermanos Solís",
    category: "Automotriz",
    canton: "Alajuela",
    district: "El Coyol",
    address: "Zona Franca El Coyol, 300m oeste de Riteve",
    phone: "+506 2433-8811",
    whatsapp: "50687338811",
    email: "flotas@tallersolis.cr",
    verified: true,
    featured: true,
    memberSince: "2016",
    rating: 4.8,
    convenioDescuento: "Diagnóstico computarizado gratuito en flotas comerciales de afiliados",
    ahorroEstimado: "₡70.000 por vehículo en mantenimiento preventivo",
    description: "Diagnóstico computarizado, mecánica rápida, alineamiento 3D y mantenimiento preventivo para flotas comerciales y logística pesada.",
    keywords: ["taller", "mecanico", "coyol", "llantas", "frenos", "flotas"]
  },
  {
    id: "cca-003",
    name: "Bufete & Consultoría Tributaria Valverde & Asociados",
    category: "Servicios",
    canton: "Alajuela",
    district: "Alajuela Centro",
    address: "Avenida 2, frente a Tribunales de Justicia",
    phone: "+506 2440-5544",
    whatsapp: "50684923925",
    email: "marcosromanv00@gmail.com",
    verified: true,
    featured: true,
    memberSince: "2015",
    rating: 5.0,
    convenioDescuento: "Primera hora de consulta legal y revisión de contratos sin costo para socios activos",
    ahorroEstimado: "₡60.000 en honorarios contables y defensa fiscal",
    description: "Asesoría legal corporativa, defensa fiscal ante Tributación Directa (Ley 7092), contratos mercantiles y registro de marcas para pymes.",
    keywords: ["abogado", "leyes", "tributario", "hacienda", "legal", "bufete", "contratos"]
  },
  {
    id: "cca-004",
    name: "Clínica Dental OdontoSalud La Guácima",
    category: "Salud",
    canton: "Alajuela",
    district: "La Guácima",
    address: "Centro Comercial Los Reyes, Local 7",
    phone: "+506 2438-1200",
    whatsapp: "50684381200",
    email: "citas@odontosalud.cr",
    verified: true,
    featured: true,
    memberSince: "2019",
    rating: 4.7,
    convenioDescuento: "15% de descuento en ortodoncia e implantes dentales para colaboradores de empresas afiliadas",
    ahorroEstimado: "₡40.000 en salud dental preventiva",
    description: "Odontología integral, implantes, ortodoncia invisible y estética dental con tecnología digital y parqueo gratuito.",
    keywords: ["dentista", "dental", "odontologo", "salud", "guacima", "limpieza"]
  },
  {
    id: "cca-005",
    name: "Distribuidora de Alimentos Doña Carmen",
    category: "Comercio",
    canton: "Alajuela",
    district: "San Antonio",
    address: "200m sur de la Iglesia de San Antonio de Tejar",
    phone: "+506 2442-9900",
    whatsapp: "50688429900",
    email: "pedidos@donacarmen.cr",
    verified: true,
    featured: false,
    memberSince: "2004",
    rating: 4.9,
    convenioDescuento: "Crédito a 30 días y flete bonificado en entregas superiores a ₡100.000 dentro del GAM",
    ahorroEstimado: "₡25.000 / pedido en logística alimentaria",
    description: "Abastecimiento de granos básicos, lácteos, abarrotes y productos de consumo masivo para pulperías, sodas y restaurantes.",
    keywords: ["alimentos", "comida", "granos", "supermercado", "distribuidora", "abarrotes"]
  },
  {
    id: "cca-006",
    name: "Innovaciones Tecnológicas del Erizo (ITEC)",
    category: "Tecnología",
    canton: "Alajuela",
    district: "Alajuela Centro",
    address: "Plaza Real Alajuela, Torre Corporativa Piso 2",
    phone: "+506 2443-7722",
    whatsapp: "50686437722",
    email: "contacto@itecalajuela.com",
    verified: true,
    featured: true,
    memberSince: "2020",
    rating: 4.8,
    convenioDescuento: "Auditoría de ciberseguridad y diagnóstico de red sin costo inicial",
    ahorroEstimado: "₡75.000 en consultoría de seguridad Cloud",
    description: "Desarrollo de software a la medida, facturación electrónica certificada, soporte Cloud y ciberseguridad para pymes comerciales.",
    keywords: ["tecnologia", "computadoras", "software", "redes", "ciberseguridad", "nube"]
  },
  {
    id: "cca-007",
    name: "Restaurante y Cafetería El Trapiche Alajuelense",
    category: "Gastronomía",
    canton: "Alajuela",
    district: "Tambor",
    address: "Ruta 107 hacia Poás, km 4",
    phone: "+506 2444-3311",
    whatsapp: "50685443311",
    email: "eventos@eltrapiche.cr",
    verified: true,
    featured: false,
    memberSince: "2015",
    rating: 4.9,
    convenioDescuento: "Salón privado sin costo de alquiler para asambleas de socios con consumo de alimentos",
    ahorroEstimado: "₡50.000 de exoneración en salón corporativo",
    description: "Gastronomía criolla tradicional, café de especialidad de altura y salones para eventos corporativos y reuniones gremiales.",
    keywords: ["restaurante", "cafeteria", "cafe", "comida", "eventos", "tambor", "poas"]
  },
  {
    id: "cca-008",
    name: "Librería y Papelería La Prensa de Alajuela",
    category: "Comercio",
    canton: "Alajuela",
    district: "Alajuela Centro",
    address: "Costado oeste del Parque Central de Alajuela",
    phone: "+506 2441-1155",
    whatsapp: "50683411155",
    email: "ventas@laprensaalajuela.cr",
    verified: true,
    featured: false,
    memberSince: "1999",
    rating: 4.6,
    convenioDescuento: "12% de descuento en útiles de oficina y facturación para empresas afiliadas",
    ahorroEstimado: "₡18.000 / compra en suministros de oficina",
    description: "Suministros corporativos, papelería fina, fotocopiado de planos, empastes y textos escolares con servicio a domicilio comercial.",
    keywords: ["libreria", "papeleria", "papel", "copias", "oficina", "utiles"]
  },
  {
    id: "cca-009",
    name: "Laboratorios Clínicos San Rafael",
    category: "Salud",
    canton: "Alajuela",
    district: "San Rafael",
    address: "Frente al Polideportivo de San Rafael",
    phone: "+506 2439-0022",
    whatsapp: "50687390022",
    email: "laboratorio@sanrafaelcr.com",
    verified: true,
    featured: true,
    memberSince: "2018",
    rating: 4.9,
    convenioDescuento: "Paquete de chequeo médico anual para personal de empresas socias a tarifa subsidiada",
    ahorroEstimado: "₡30.000 por empleado en salud ocupacional",
    description: "Exámenes de sangre, microbiología, pruebas de antidoping laboral y perfiles lipídicos con entrega digital en 2 horas.",
    keywords: ["laboratorio", "sangre", "analisis", "salud", "san rafael", "examenes"]
  },
  {
    id: "cca-010",
    name: "Agroinsumos y Veterinaria El Granjero",
    category: "Agroindustria",
    canton: "San Ramón",
    district: "San Ramón Centro",
    address: "Avenida 3, 200m este del Mercado de San Ramón",
    phone: "+506 2445-6677",
    whatsapp: "50689456677",
    email: "contacto@elgranjerocr.com",
    verified: true,
    featured: false,
    memberSince: "2013",
    rating: 4.7,
    convenioDescuento: "Asesoría agronómica de campo quincenal y precio por saco de alimento balanceado",
    ahorroEstimado: "₡35.000 / pedido para productores",
    description: "Alimentos para ganado, semillas certificadas, medicamentos veterinarios y bombas de aspersión para productores de Occidente.",
    keywords: ["agro", "veterinaria", "san ramon", "animales", "fertilizantes", "ganado"]
  },
  {
    id: "cca-011",
    name: "Mueblería y Ebanistería Sarchí Diseños",
    category: "Construcción",
    canton: "Sarchí",
    district: "Sarchí Norte",
    address: "Ruta de la Artesanía, local 14",
    phone: "+506 2454-3040",
    whatsapp: "50688543040",
    email: "disenos@sarchimuebles.cr",
    verified: true,
    featured: false,
    memberSince: "2017",
    rating: 5.0,
    convenioDescuento: "Transporte e instalación gratuita de mobiliario de oficina en toda la provincia",
    ahorroEstimado: "₡40.000 de exoneración en logística",
    description: "Muebles a medida en maderas nobles costarricenses, escritorios ejecutivos ergonómicos y salas de juntas comerciales.",
    keywords: ["muebles", "sarchi", "madera", "ebanisteria", "oficina", "escritorios"]
  },
  {
    id: "cca-012",
    name: "Hotel & Centro de Convenciones Villa Mango",
    category: "Servicios",
    canton: "Atenas",
    district: "Atenas Centro",
    address: "Ruta 27 km 38, salida hacia Atenas",
    phone: "+506 2446-5000",
    whatsapp: "50683465000",
    email: "reservas@hotelvillamango.cr",
    verified: true,
    featured: true,
    memberSince: "2010",
    rating: 4.8,
    convenioDescuento: "20% de descuento en tarifas corporativas de hospedaje y paquetes para retiros directivos",
    ahorroEstimado: "₡80.000 por convención empresarial",
    description: "Hospedaje ecológico, auditorio climatizado para 250 personas, gastronomía internacional y el mejor clima del mundo.",
    keywords: ["hotel", "atenas", "convenciones", "eventos", "hospedaje", "turismo"]
  }
];

export const JOB_VACANCIES_DATA: JobVacancy[] = [
  {
    id: "vac-001",
    title: "Asistente Contable y Tributario",
    company: "Bufete Valverde & Asoc. (Afiliado CCA-003)",
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
    company: "Innovaciones Tecnológicas del Erizo (Afiliado CCA-006)",
    canton: "Alajuela",
    district: "Alajuela Centro",
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
    company: "Ferretería El Candado (Afiliado CCA-001)",
    canton: "Alajuela",
    district: "Alajuela Centro",
    type: "Tiempo Completo",
    salaryRange: "₡420.000 - ₡500.000 + comisiones",
    postedDate: "Hace 6 días",
    category: "Ventas",
    description: "Atención al cliente en mostrador ferretero, cotización de proyectos constructivos y manejo de caja registradora.",
    requirements: ["Secundaria completa", "Vocación de servicio comercial", "Conocimiento básico de herramientas"]
  },
  {
    id: "vac-005",
    title: "Enfermero(a) de Salud Ocupacional",
    company: "Laboratorios Clínicos San Rafael (Afiliado CCA-009)",
    canton: "Alajuela",
    district: "San Rafael",
    type: "Tiempo Completo",
    salaryRange: "₡550.000 - ₡620.000",
    postedDate: "Hace 1 semana",
    category: "Salud",
    description: "Toma de muestras clínicas, campañas de vacunación y chequeos médicos preventivos en parques industriales de Alajuela.",
    requirements: ["Licenciatura en Enfermería", "Incorporación al Colegio de Enfermeras", "Vehículo propio deseable"]
  },
  {
    id: "vac-006",
    title: "Operario de Producción y Ensamble Médico",
    company: "Coyol Free Zone Medical Cluster",
    canton: "Alajuela",
    district: "El Coyol",
    type: "Tiempo Completo",
    salaryRange: "₡380.000 - ₡450.000 + bono de transporte",
    postedDate: "Ayer",
    category: "Operario",
    description: "Ensamble de componentes médicos de alta precisión en cuartos limpios bajo normativas ISO 13485.",
    requirements: ["Noveno año aprobado", "Disponibilidad para turnos rotativos", "Atención al detalle"]
  }
];

export const BOARD_MEMBERS: BoardMember[] = [
  {
    role: "Presidente",
    name: "Lic. Rodolfo Quesada Chaves",
    company: "Comercio Detallista Alajuela Centro",
    sector: "Comercio Tradicional & Distribución",
    bio: "Más de 30 años liderando empresas comerciales en Alajuela. Miembro activo de la Cámara desde 1994 y defensor incansable de la simplificación de patentes municipales."
  },
  {
    role: "Vicepresidenta",
    name: "MBA. María Eugenia Solís Prado",
    company: "Logística Parque El Coyol",
    sector: "Zonas Francas e Industria Médica",
    bio: "Especialista en atracción de inversión extranjera y encadenamientos productivos entre multinacionales de El Coyol y pymes alajuelenses."
  },
  {
    role: "Secretario General",
    name: "Lic. Carlos Alvarado Monge",
    company: "Distribuidora Doña Carmen",
    sector: "Alimentos y Consumo Masivo",
    bio: "Economista de la UNA, experto en abastecimiento cantonal y formalización comercial en distritos periféricos de la provincia."
  },
  {
    role: "Tesorera",
    name: "Licda. Valeria Brenes Cordero",
    company: "Consultoría Financiera & FinTech Occidente",
    sector: "Servicios Financieros",
    bio: "Contadora pública colegiada, lideró la modernización de la cuota digital de la CCA y el cumplimiento del Art. 8 de la Ley 7092 ante Hacienda."
  },
  {
    role: "Vocal I",
    name: "Ing. Jorge Murillo Artavia",
    company: "Innovaciones Tecnológicas del Erizo",
    sector: "Tecnología & Transformación Digital",
    bio: "Ingeniero en sistemas, impulsa la alfabetización digital, el comercio electrónico seguro y la adopción de IA en las pymes agremiadas."
  },
  {
    role: "Vocal II",
    name: "Máster Roberto Alfaro Soto",
    company: "Agroindustrial de Occidente",
    sector: "Agroindustria & Exportación (San Ramón)",
    bio: "Representante de los cantones de Occidente, enfocado en el desarrollo logístico de la cuenca cafetalera y comercialización agropecuaria."
  },
  {
    role: "Fiscal General",
    name: "Lic. Fernando Corrales Umaña",
    company: "Centro de Arbitraje & Mediación RAC",
    sector: "Derecho Mercantil (Ley 7727)",
    bio: "Abogado y notario, árbitro acreditado por el Ministerio de Justicia con más de 20 años dirimiendo controversias mercantiles gremiales."
  }
];

export const HISTORICAL_MILESTONES: HistoricalMilestone[] = [
  {
    year: "1983",
    title: "Fundación de la Cámara de Comercio de Alajuela",
    description: "Un grupo pionero de 35 comerciantes del centro de Alajuela constituye formalmente la Cámara para representar los intereses del sector frente a las cargas tributarias municipales."
  },
  {
    year: "1998",
    title: "Apertura del Centro de Arbitraje Mercantil (Ley 7727)",
    description: "Tras la promulgación de la Ley 7727 de Resolución Alterna de Conflictos, la Cámara inaugura su Centro de Conciliación, brindando a los agremiados resoluciones vinculantes sin acudir a tribunales ordinarios."
  },
  {
    year: "2008",
    title: "Integración de Parques Industriales y El Coyol",
    description: "Con el auge de las zonas francas y la industria médica en El Coyol, la Cámara extiende sus programas de encadenamiento entre pymes locales y grandes empresas multinacionales."
  },
  {
    year: "2018",
    title: "Consolidación de la Red en los 16 Cantones",
    description: "La Cámara supera los 800 afiliados y firma alianzas de representación en Occidente, la zona norte (San Carlos, Upala, Los Chiles) y el cantón de Río Cuarto."
  },
  {
    year: "2026",
    title: "Transformación Digital y Portal Inteligente",
    description: "Lanzamiento de la nueva infraestructura digital con validación de convenios con ahorro medido, bolsa de empleo cantonal y ventanilla digital de trámites municipales."
  }
];

export const CANTONS_ALAJUELA: CantonInfo[] = [
  { name: "Alajuela (Central)", cabecera: "Alajuela Centro", afiliados: 380, actividadPrincipal: "Comercio detallista, servicios, zonas francas (El Coyol)" },
  { name: "San Ramón", cabecera: "San Ramón Centro", afiliados: 95, actividadPrincipal: "Agroindustria, comercio mayorista, educación superior" },
  { name: "Grecia", cabecera: "Grecia", afiliados: 82, actividadPrincipal: "Industria azucarera, comercio automotriz y zonas francas" },
  { name: "San Mateo", cabecera: "San Mateo", afiliados: 14, actividadPrincipal: "Comercio local, turismo rural y agricultura de transición" },
  { name: "Atenas", cabecera: "Atenas Centro", afiliados: 38, actividadPrincipal: "Servicios turísticos, gastronomía y bienes raíces" },
  { name: "Naranjo", cabecera: "Naranjo", afiliados: 44, actividadPrincipal: "Producción cafetalera, agrocomercio y cooperativismo" },
  { name: "Palmares", cabecera: "Palmares", afiliados: 36, actividadPrincipal: "Comercio minorista, servicios médicos y festividades" },
  { name: "Poás", cabecera: "San Pedro", afiliados: 28, actividadPrincipal: "Ecoturismo, café de altura y producción de fresas" },
  { name: "Orotina", cabecera: "Orotina", afiliados: 22, actividadPrincipal: "Logística del Pacífico, comercio de frutas y transporte" },
  { name: "San Carlos", cabecera: "Ciudad Quesada", afiliados: 54, actividadPrincipal: "Ganadería, turismo termal, agroexportación de raíces" },
  { name: "Zarcero", cabecera: "Zarcero", afiliados: 19, actividadPrincipal: "Hortalizas, lácteos artesanales y comercio de montaña" },
  { name: "Sarchí", cabecera: "Sarchí Norte", afiliados: 26, actividadPrincipal: "Ebanistería fina, artesanía tradicional y turismo" },
  { name: "Upala", cabecera: "Upala", afiliados: 15, actividadPrincipal: "Agricultura fronteriza, ganadería y comercio binacional" },
  { name: "Los Chiles", cabecera: "Los Chiles", afiliados: 12, actividadPrincipal: "Cítricos, tubérculos y comercio transfronterizo" },
  { name: "Guatuso", cabecera: "San Rafael", afiliados: 10, actividadPrincipal: "Cacao fino, ganadería y turismo de reservas indígenas" },
  { name: "Río Cuarto", cabecera: "Río Cuarto", afiliados: 14, actividadPrincipal: "Producción de piña, lácteos tecnificados y agroquímicos" }
];

export const CONVENIOS_CATALOG: ConvenioAlliance[] = [
  {
    id: "conv-01",
    partner: "BAC Credomatic Costa Rica",
    category: "Financiero & Banca",
    discount: "Tasa preferencial en datáfonos Compra-Click y 0% comisión de apertura en cuentas comerciales",
    roiEjemplo: "Ahorro de hasta ₡45.000 / mes en comisiones transaccionales para ventas con tarjeta",
    description: "Facilidades de cobro físico y digital para empresas afiliadas al día con la cuota gremial.",
    terms: "Aplica para cuentas nuevas y traslados de adquirencia presentando certificación digital de socio CCA."
  },
  {
    id: "conv-02",
    partner: "Hospital Metropolitano & Medismart",
    category: "Salud & Bienestar",
    discount: "Plan de salud ocupacional empresarial subsidiado con hasta 35% de descuento en consultas",
    roiEjemplo: "Ahorro estimado de ₡120.000 anuales por colaborador en medicina preventiva y chequeos",
    description: "Cobertura médica privada accesible para dueños de comercios, colaboradores y sus familias.",
    terms: "Inscripción mínima de 3 colaboradores de la empresa asociada."
  },
  {
    id: "conv-03",
    partner: "Instituto Nacional de Seguros (INS)",
    category: "Seguros & Riesgos",
    discount: "Tarifas colectivas en Póliza de Riesgos del Trabajo y Seguro de Incendio Comercial Multirriesgo",
    roiEjemplo: "12% de reducción en la prima anual del seguro contra incendio y terremoto de locales comerciales",
    description: "Protección integral del patrimonio comercial ante emergencias naturales o accidentes laborales.",
    terms: "Sujeto a inspección técnica del local comercial y validación de personería jurídica."
  },
  {
    id: "conv-04",
    partner: "TotalEnergies / Delta Combustibles",
    category: "Combustible & Flotas",
    discount: "Descuento de ₡15 por litro de diésel y gasolina con tarjeta de control de flota empresarial",
    roiEjemplo: "Ahorro de ₡60.000 mensuales en una micro-flota de 3 vehículos de reparto cantonal",
    description: "Control computarizado de consumo de combustible, kilometraje y facturación electrónica consolidada.",
    terms: "Aplica en estaciones participantes en Alajuela, El Coyol, Grecia y San Ramón."
  },
  {
    id: "conv-05",
    partner: "Claro Empresas Costa Rica",
    category: "Tecnología & Telecom",
    discount: "Planes corporativos simétricos de fibra óptica con 25% de descuento y telefonía fija gratuita",
    roiEjemplo: "Ahorro de ₡240.000 anuales en conectividad comercial de alta velocidad",
    description: "Internet garantizado para puntos de venta, enlace con zonas francas y telefonía IP.",
    terms: "Contrato comercial a 12 meses con verificación de cobertura en el cantón."
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: "faq-01",
    category: "Afiliación y Cuotas",
    question: "¿Es deducible del Impuesto sobre la Renta la cuota gremial de la Cámara?",
    answer: "Sí, en un 100%. De acuerdo con el Artículo 8, inciso i) de la Ley Costarricense del Impuesto sobre la Renta (Ley N.º 7092), las cuotas pagadas a cámaras y asociaciones gremiales legalmente constituidas constituyen un gasto deducible en la declaración jurada anual (formulario D-101 de Hacienda)."
  },
  {
    id: "faq-02",
    category: "Afiliación y Cuotas",
    question: "¿Cuáles son las tarifas y cómo se realiza el pago?",
    answer: "Disponemos de 3 planes adaptados al tamaño de cada empresa: Plan Micro (₡15.000/mes), Plan Pyme (₡28.000/mes) y Plan Corporativo (₡65.000/mes). El pago se realiza de manera 100% digital a través de SINPE Móvil al 8492-3925 o transferencia BAC Credomatic, emitiéndose de inmediato el recibo oficial timbrado."
  },
  {
    id: "faq-03",
    category: "Trámites y Patentes",
    question: "¿La Cámara tramita directamente mi patente ante la Municipalidad de Alajuela?",
    answer: "La Cámara cuenta con una Ventanilla de Enlace Técnico Municipal que guía y revisa los requisitos (Uso de Suelo, Permiso Sanitario del Ministerio de Salud, Póliza INS y CCSS) antes de la radicación formal, reduciendo los tiempos de aprobación municipal de semanas a tan solo 5 a 8 días hábiles."
  },
  {
    id: "faq-04",
    category: "Trámites y Patentes",
    question: "¿Qué ocurre si mi actividad comercial requiere permiso de salud Tipo A (Alto Riesgo)?",
    answer: "Nuestros asesores técnicos le acompañan en la formulación del plan de manejo de residuos, verificación de campanas de extracción y cumplimiento de las normas de bomberos para obtener la aprobación del Área Rectora de Salud de Alajuela sin prevenciones ni retrasos."
  },
  {
    id: "faq-05",
    category: "Arbitraje Mercantil",
    question: "¿Qué valor legal tienen los laudos del Centro de Conciliación y Arbitraje de la CCA?",
    answer: "Tienen exactamente el mismo valor vinculante de una sentencia judicial firme de cosa juzgada material, bajo el amparo de la Ley Costarricense N.º 7727 de Resolución Alterna de Conflictos. Un acuerdo o laudo arbitral no puede ser reabierto en la vía judicial ordinaria."
  },
  {
    id: "faq-06",
    category: "Arbitraje Mercantil",
    question: "¿Cuánto tiempo toma resolver una disputa comercial en el Centro de Arbitraje?",
    answer: "Mientras un proceso judicial mercantil ordinario en los tribunales puede demorar entre 3 y 5 años con elevados costos de litigio, las mediaciones en la Cámara de Comercio de Alajuela se resuelven en un promedio récord de 15 a 30 días hábiles de manera totalmente confidencial."
  },
  {
    id: "faq-07",
    category: "Bolsa de Empleo y Convenios",
    question: "¿Cómo puede mi empresa publicar vacantes en la Bolsa de Empleo?",
    answer: "Toda empresa asociada con su membresía al día tiene acceso ilimitado y gratuito a la publicación de plazas vacantes en nuestro portal y redes sociales oficiales, recibiendo hojas de vida de candidatos prefiltrados del cantón central y El Coyol."
  },
  {
    id: "faq-08",
    category: "Bolsa de Empleo y Convenios",
    question: "¿Cómo accedo a los descuentos y beneficios de los convenios comerciales?",
    answer: "Presentando su carnet digital de afiliado emitido por la Cámara o su certificado de socio activo en cualquiera de los comercios aliados (BAC, INS, Ópticas, Laboratorios, etc.). En nuestro Directorio Comercial puede calcular el ahorro estimado de cada convenio."
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
    summary: "Mecanismo alternativo de resolución de controversias entre comerciantes para evitar litigios judiciales prolongados bajo Ley 7727.",
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
    actionHref: "/servicios/arbitraje"
  },
  {
    title: "Trámites Municipales y Patentes",
    tagline: "Acompañamiento en formalización cantonal",
    description: "Ventanilla de enlace técnico con la Municipalidad de Alajuela y Ministerio de Salud para agilizar licencias comerciales y uso de suelo.",
    icon: "FileCheck",
    actionText: "Consultar guía de patentes",
    actionHref: "/servicios/tramites"
  },
  {
    title: "Bolsa de Empleo y Talento Local",
    tagline: "Conectando empresas y fuerza laboral",
    description: "Plataforma de intermediación laboral para comercios tradicionales, pymes de servicios y empresas de zonas francas en El Coyol.",
    icon: "Globe",
    actionText: "Explorar vacantes activas",
    actionHref: "/empleo"
  },
  {
    title: "Capacitaciones y Alianzas Comerciales",
    tagline: "Preparando al comercio para el futuro",
    description: "Talleres continuos en reforma fiscal (Ley 7092), comercio electrónico y más de 40 convenios con tarifas preferenciales para socios.",
    icon: "Lightbulb",
    actionText: "Ver catálogo de convenios",
    actionHref: "/servicios/convenios"
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
