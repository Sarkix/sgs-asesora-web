import { EducationEntry, ExperienceEntry, SocialLink } from './types';

export const personalName = "Sara García Sánchez";
export const personalEmail = "sgsasesora@gmail.com"; // Updated email

export const socialLinks: SocialLink[] = [
  { name: 'LinkedIn', acronym: 'LI', url: 'https://www.linkedin.com/in/saragarsa/' }, // Updated LinkedIn URL
  // { name: 'Facebook', acronym: 'FB', url: 'https://facebook.com' }, // Eliminado
  // { name: 'Twitter', acronym: 'TW', url: 'https://twitter.com' }, // Eliminado
  // { name: 'Instagram', acronym: 'IG', url: 'https://instagram.com' }, // Eliminado si no se quiere
];

export const educationData: EducationEntry[] = [
  {
    institution: 'Universidad Pública del País Vasco (UPV/EHU)',
    degreeOrFocus: 'Grado en Derecho',
    years: '2018-2022',
    description: 'Formación integral en el ordenamiento jurídico español, con especial interés en el derecho público y administrativo.',
  },
  {
    institution: 'Universidad Nebrija',
    degreeOrFocus: 'Curso de Especialización en Gestión del Personal Funcionario',
    years: '2024', // Updated from 2023
    description: 'Profundización en la gestión de recursos humanos en el sector público, incluyendo régimen disciplinario y situaciones administrativas.',
  },
  {
    institution: 'Universidad Europea Miguel de Cervantes',
    degreeOrFocus: 'Curso de Especialización en Procedimiento Administrativo Común',
    years: '2024', // Updated from 2023
    description: 'Análisis detallado de la Ley 39/2015, del Procedimiento Administrativo Común de las Administraciones Públicas.',
  },
  {
    institution: 'Universidad Nebrija',
    degreeOrFocus: 'Curso de Especialización en Materia de Igualdad en la Administración Local',
    years: '2024', // Year maintained as 2024 (as per request for all specializations)
    description: 'Formación sobre la aplicación de políticas de igualdad en el ámbito local y la integración de la perspectiva de género.',
  },
  {
    institution: 'Universidad Isabel I',
    degreeOrFocus: 'Máster en Recursos Humanos',
    years: '2024-Actualidad',
    description: 'Desarrollo de competencias avanzadas para la dirección y gestión estratégica del capital humano en las organizaciones.',
  },
  {
    institution: 'ENEB - Escuela de Negocios Europea de Barcelona',
    degreeOrFocus: 'Master of Business Administration - MBA, Administración y gestión de empresas e Inteligencia Artificial',
    years: '2024-Actualidad',
    description: 'Formación directiva integral con énfasis en la aplicación de la inteligencia artificial en la estrategia y gestión empresarial.',
  },
  {
    institution: 'Develhope', // Updated institution
    degreeOrFocus: 'Bootcamp Full Stack Developer',
    years: '2024', // Updated from 2023
    description: 'Formación intensiva en desarrollo web front-end y back-end, cubriendo tecnologías como JavaScript, React, Node.js, y bases de datos. Capacitada como desarrolladora web profesional.',
  }
];

export const experienceData: ExperienceEntry[] = [
  {
    company: 'EIBEX Asesoría-Consultoría', // Updated company
    role: 'Asesora Jurídica Especialista en Función Pública', // Role maintained
    years: '2024-Actualidad', // Updated years
    description: 'Asesoramiento especializado a Administraciones Locales en materia de personal y función pública, incluyendo la gestión de procesos de selección (OPE), gestión de personal, y elaboración de informes jurídicos.', // Updated description
    // link and linkText removed as no specific URL provided
  },
  {
    company: 'Ayuntamiento de Barakaldo', // Updated company
    role: 'Técnica de Administración General', // Updated role
    years: '2023-2024', // Updated years
    description: 'Desempeño de funciones como Técnica de Administración General en el Departamento de Personal, incluyendo la gestión de expedientes administrativos, soporte en procesos selectivos y aplicación de la normativa de función pública.', // Updated description
     // link and linkText removed as no specific URL provided
  },
];

export const personalInfoBio = "Soy Graduada en Derecho por la Universidad Pública del País Vasco (UPV/EHU) en 2022, con una sólida base en el ordenamiento jurídico y un marcado interés por la gestión pública. He profundizado mis conocimientos a través de especializaciones en Gestión del Personal Funcionario, Materia de Igualdad en la Administración Local (Universidad Nebrija), y Procedimiento Administrativo Común (Universidad Europea Miguel de Cervantes). Actualmente, estoy ampliando mi perfil profesional cursando un Máster en Recursos Humanos en la Universidad Isabel I y un Master of Business Administration (MBA) con especialización en Inteligencia Artificial por ENEB.\n\nMi pasión por la tecnología y la innovación me llevó a completar un Bootcamp de Full Stack Developer en Develhope, habilitándome como desarrolladora web profesional. Esta combinación de conocimientos jurídicos, de gestión y tecnológicos me permite abordar los desafíos de la administración moderna con una perspectiva integral y multidisciplinar, buscando siempre optimizar procesos, aportar soluciones eficientes y aplicar esta formación diversa para transformar el sector público.";

export const mainSkills: string[] = [
  "Derecho Administrativo",
  "Gestión de Recursos Humanos en el Sector Público",
  "Procesos de Selección y OPE",
  "Elaboración de Informes Jurídicos",
  "Asesoramiento en Contratación Pública",
  "Análisis y Resolución de Problemas",
];

export const coreValues: string[] = [
  "Rigor Jurídico y Ética Profesional",
  "Compromiso con la Eficiencia y la Transparencia",
  "Innovación y Mejora Continua",
  "Orientación al Servicio Público",
  "Colaboración y Trabajo en Equipo",
  "Adaptabilidad y Aprendizaje Constante",
];

export const contactSectionText = "Siempre estoy abierta a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de algo emocionante. No dudes en ponerte en contacto por correo electrónico, conectar conmigo en las redes sociales o utilizar el formulario.";