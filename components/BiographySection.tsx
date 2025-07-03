
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { personalInfoBio, mainSkills, coreValues } from '../constants';
import { CheckIcon } from './icons/CheckIcon';

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#3D3A37] mb-8 sm:mb-10">
    <span className="pb-1 border-b-2 border-[#3D3A37]">{title}</span>
  </h2>
);

interface LanguageProps {
  name: string;
  percentage: number;
}

const LanguageBar: React.FC<LanguageProps> = ({ name, percentage }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-base sm:text-lg font-medium text-[#3D3A37]">{name}</span>
    </div>
    <div 
      className="w-full bg-[#D1C7B8] rounded-full h-2.5" 
      role="progressbar" 
      aria-valuenow={percentage} 
      aria-valuemin={0} 
      aria-valuemax={100} 
      aria-label={`Nivel de ${name}: ${percentage}%`}
    >
      <div 
        className="bg-[#A97155] h-2.5 rounded-full" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);


export const BiographySection = React.forwardRef<HTMLElement>((_props, ref) => {
  // One hook for each animated block
  const { ref: personalInfoRef, inView: personalInfoInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });
  const { ref: skillsValuesRef, inView: skillsValuesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });
  const { ref: languagesRef, inView: languagesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const bioParagraphs = personalInfoBio.split('\n\n');
  
  const languages: LanguageProps[] = [
    { name: 'Español', percentage: 100 },
    { name: 'Euskera', percentage: 50 },
    { name: 'Inglés', percentage: 75 },
  ];

  return (
    <section
      ref={ref} // The main ref for navigation is on the parent section
      id="biography"
      className="scroll-mt-16"
    >
      <SectionTitle title="Biografía" />
      
      {/* Block 1: Personal Info */}
      <div 
        ref={personalInfoRef}
        className={`mb-12 sm:mb-16 transition-all duration-700 ease-out ${personalInfoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#3D3A37] mb-4 sm:mb-6">Información Personal</h3>
        <div className="md:columns-2 md:gap-x-8 lg:gap-x-12">
          {bioParagraphs.map((paragraph, index) => (
            <p 
              key={index} 
              className="text-base sm:text-lg lg:text-xl text-[#5A5653] mb-4 break-inside-avoid-column"
              style={{ lineHeight: '1.8' }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      
      {/* Block 2: Skills & Values */}
      <div
        ref={skillsValuesRef}
        className={`grid md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-12 md:gap-y-0 transition-all duration-700 ease-out ${skillsValuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#3D3A37] mb-4 sm:mb-6">Principales Aptitudes</h3>
          <ul className="space-y-3">
            {mainSkills.map((skill, index) => (
              <li key={index} className="flex items-start">
                <CheckIcon className="w-5 h-5 text-[#A97155] mr-3 mt-1 flex-shrink-0" />
                <span className="text-base sm:text-lg text-[#5A5653]" style={{ lineHeight: '1.7' }}>{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#3D3A37] mb-4 sm:mb-6">Valores</h3>
          <ul className="space-y-3">
            {coreValues.map((value, index) => (
              <li key={index} className="flex items-start">
                <CheckIcon className="w-5 h-5 text-[#A97155] mr-3 mt-1 flex-shrink-0" />
                <span className="text-base sm:text-lg text-[#5A5653]" style={{ lineHeight: '1.7' }}>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Block 3: Languages */}
      <div 
        ref={languagesRef}
        className={`mt-12 sm:mt-16 transition-all duration-700 ease-out ${languagesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#3D3A37] mb-6 sm:mb-8">Idiomas que hablo</h3>
        <div className="space-y-5 max-w-3xl">
          {languages.map(lang => (
            <LanguageBar key={lang.name} {...lang} />
          ))}
        </div>
      </div>
    </section>
  );
});

BiographySection.displayName = 'BiographySection';
