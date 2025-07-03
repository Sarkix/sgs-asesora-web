
import React, { useRef, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { HeroSection } from './HeroSection';
import { BiographySection } from './BiographySection';
import { ExpertiseSection } from './ExpertiseSection';
import { EducationSection } from './EducationSection';
import { BlogSection } from './BlogSection';
import { ContactSection } from './ContactSection';
import { BlogPost } from '../types';
import { personalName } from '../constants';

interface MainPageLayoutProps {
  blogPosts: BlogPost[];
  onLinkClick: () => void;
}

export const MainPageLayout: React.FC<MainPageLayoutProps> = ({ blogPosts, onLinkClick }) => {
  const [location] = useLocation();

  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    biography: useRef<HTMLElement>(null),
    expertise: useRef<HTMLElement>(null),
    education: useRef<HTMLElement>(null),
    blog: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };
  
  useEffect(() => {
    const hash = location.split('#')[1];
    if (hash) {
      const section = sectionRefs[hash as keyof typeof sectionRefs];
      setTimeout(() => {
        section.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (location === '/') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
      <HeroSection 
        ref={sectionRefs.hero} 
        onNavigateToContact={() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            onLinkClick();
        }}
      />
      <div className="bg-[#EAE3D9] px-6 sm:px-12 md:px-20 lg:px-28 py-20 md:py-24 space-y-16 md:space-y-20">
        <BiographySection ref={sectionRefs.biography} />
        <ExpertiseSection ref={sectionRefs.expertise} />
        <EducationSection ref={sectionRefs.education} />
        <BlogSection 
          ref={sectionRefs.blog} 
          posts={blogPosts}
        />
        <ContactSection ref={sectionRefs.contact} />
      </div>
      <footer className="bg-[#EAE3D9] text-center p-8 text-[#5A5653] text-xs sm:text-sm">
        © {new Date().getFullYear()} {personalName}. Todos los derechos reservados.
      </footer>
    </>
  );
};
