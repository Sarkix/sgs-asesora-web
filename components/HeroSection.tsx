


import React from 'react';
// import { socialLinks, personalEmail } from '../constants'; // No longer needed here

interface HeroSectionProps {
  onNavigateToContact: () => void;
}

export const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>((props, ref) => {
  const { onNavigateToContact } = props;

  const introParagraphs = [
    "Especialista en Derecho Administrativo y Gestión de Recursos Humanos en el Sector Público.",
    "Ofrezco asesoramiento integral a Ayuntamientos y Entidades Públicas en la gestión de su personal. Mi experiencia abarca desde la dirección de Ofertas Públicas de Empleo (OPE) y la gestión del régimen de personal funcionario y laboral, hasta la elaboración de Informes Jurídicos, Valoraciones de Puestos de Trabajo (VPT) y Planes de Ordenación de Recursos Humanos.",
    "Mi objetivo es garantizar la seguridad jurídica y optimizar los procesos de gestión, aplicando con rigor la normativa estatal y vasca vigente."
  ];

  return (
    <section 
      ref={ref} 
      id="home"
      className="flex flex-col lg:flex-row min-h-[80vh] lg:min-h-screen scroll-mt-16"
    >
      <div className="w-full lg:w-5/12 bg-[#F8F5F0] flex items-center justify-center p-6 lg:p-0 order-1 lg:order-none">
        <img
          src="/assets/Hero_section-2.png"
          alt="Sara García Sánchez"
          className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[400px] h-auto object-contain shadow-xl"
        />
      </div>
      <div 
        className="w-full lg:w-7/12 bg-[#EAE3D9] 
                   pt-8 pb-8 
                   sm:pt-12 sm:pb-12 
                   lg:pt-12 lg:pb-12 
                   xl:pt-16 xl:pb-16 
                   flex flex-col justify-center relative order-none lg:order-1"
      >
        <div className="absolute top-12 right-12 w-20 h-20 bg-[#A97155] rounded-full opacity-80 hidden lg:block"></div>
        
        {/* Wrapper for all content to be vertically centered as a group */}
        <div>
          <div
            className="px-6 
                      sm:px-12 
                      md:px-20
                      lg:pl-28 lg:pr-36"
          >
            <h1 
              className="font-serif text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-medium text-[#3D3A37] mb-6 lg:mb-8 z-10"
              style={{ lineHeight: '1.2' }}
            >
              Asesora jurídica especializada en <span className="underline decoration-2 decoration-[#A97155] underline-offset-8">Función Pública</span>
            </h1>
            
            <div className="text-base sm:text-lg lg:text-xl text-[#5A5653] mb-8 lg:mb-10 z-10 space-y-4">
              {introParagraphs.map((paragraph, index) => (
                <p 
                  key={index}
                  style={{ lineHeight: '1.8' }} // Applied inline style for line-height
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="w-full flex justify-center mt-8 lg:mt-16">
            <button
              onClick={onNavigateToContact}
              className="bg-[#A97155] text-white py-3 px-8 rounded-md text-base sm:text-lg font-semibold hover:bg-opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[#A97155] focus:ring-offset-2 focus:ring-offset-[#EAE3D9] z-10"
              aria-label="Contacta conmigo para más información"
            >
              Contacta Conmigo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';