
import React, { useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { experienceData } from '../constants';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { ExperienceEntry } from '../types';

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
 <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#3D3A37] mb-8 sm:mb-10">
    <span className="pb-1 border-b-2 border-[#3D3A37]">{title}</span>
  </h2>
);

interface ExperienceItemProps {
  entry: ExperienceEntry;
  isLastItem: boolean;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ entry, isLastItem }) => (
  <div className="py-6 border-b border-[#D1C7B8] last:border-b-0 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,2fr)] md:gap-x-6 lg:gap-x-8">
    {/* Column 1: Company & Years */}
    <div className="mb-3 md:mb-0">
      <h3 className="text-lg sm:text-xl font-semibold text-[#3D3A37]">
        <span className="italic">{entry.company}</span>
      </h3>
      <p className="text-xs sm:text-sm text-[#5A5653]">{entry.years}</p>
    </div>

    {/* Column 2: Timeline visual elements */}
    <div className="hidden md:flex md:flex-col md:items-center pt-1.5"> {/* pt-1.5 to align dot with text */}
      <div className="w-3 h-3 bg-[#A97155] rounded-full shrink-0" aria-hidden="true"></div> {/* Dot */}
      {!isLastItem && (
        <div className="w-0.5 flex-1 bg-[#A97155] mt-1" aria-hidden="true"></div> /* Line */
      )}
    </div>

    {/* Column 3: Role, Description & Link */}
    <div>
      <h4 className="text-lg sm:text-xl font-semibold text-[#3D3A37] mb-2">{entry.role}</h4>
      <p className="text-sm sm:text-base lg:text-lg text-[#5A5653] mb-3 leading-relaxed">{entry.description}</p>
      {entry.link && entry.linkText && (
         <a 
          href={entry.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs sm:text-sm lg:text-base text-[#A97155] font-medium hover:underline flex items-center group"
        >
          <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-[#A97155] transition-transform duration-200 group-hover:translate-x-0.5" />
          {entry.linkText}
        </a>
      )}
    </div>
  </div>
);

export const ExpertiseSection = React.forwardRef<HTMLElement>((_props, ref) => {
  const { ref: viewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
      viewRef(node);
    },
    [ref, viewRef]
  );

  return (
    <section
      ref={setRefs}
      id="expertise"
      className={`scroll-mt-16 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <SectionTitle title="Experiencia" />
      <div> {/* Removed space-y-4 as py-6 on Item handles spacing */}
        {experienceData.map((entry, index) => (
          <ExperienceItem 
            key={index} 
            entry={entry} 
            isLastItem={index === experienceData.length - 1}
          />
        ))}
      </div>
    </section>
  );
});

ExpertiseSection.displayName = 'ExpertiseSection';