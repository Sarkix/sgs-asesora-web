
import React, { useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { educationData } from '../constants';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { EducationEntry } from '../types';

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#3D3A37] mb-8 sm:mb-10">
    <span className="pb-1 border-b-2 border-[#3D3A37]">{title}</span>
  </h2>
);

const EducationItem: React.FC<{ entry: EducationEntry }> = ({ entry }) => (
  <div className="grid md:grid-cols-3 gap-x-8 gap-y-4 py-6 border-b border-[#D1C7B8] last:border-b-0">
    <div className="md:col-span-1">
      <h3 className="text-lg sm:text-xl font-semibold text-[#3D3A37]">
        <span className="italic">{entry.institution}</span>
      </h3>
      <p className="text-xs sm:text-sm text-[#5A5653]">{entry.years}</p>
    </div>
    <div className="md:col-span-2">
      <h4 className="text-lg sm:text-xl font-semibold text-[#3D3A37] mb-2">{entry.degreeOrFocus}</h4>
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

export const EducationSection = React.forwardRef<HTMLElement>((_props, ref) => {
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
      id="education"
      className={`scroll-mt-16 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <SectionTitle title="Educación" />
      <div className="space-y-4">
        {educationData.map((entry, index) => (
          <EducationItem key={index} entry={entry} />
        ))}
      </div>
    </section>
  );
});

EducationSection.displayName = 'EducationSection';