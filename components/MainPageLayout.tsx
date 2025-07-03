
import React, { useRef, useEffect } from 'react';
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
  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    biography: useRef<HTMLElement>(null),
    expertise: useRef<HTMLElement>(null),
    education: useRef<HTMLElement>(null),
    blog: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  useEffect(() => {
    const handleHashNavigation = () => {
      // Use a brief timeout to ensure the DOM is updated, especially after a route change.
      setTimeout(() => {
        const hash = window.location.hash.substring(1);
        if (hash) {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 0);
    };

    // This handles navigation from another page (e.g., /blog) to a hash link on the main page.
    handleHashNavigation();

    // This listener handles clicks on hash links when already on the page.
    window.addEventListener('hashchange', handleHashNavigation, false);

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation, false);
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts.

  const navigateToContact = () => {
    window.location.hash = 'contact';
    onLinkClick(); // Close mobile sidebar if open
  };

  return (
    <>
      <HeroSection 
        ref={sectionRefs.hero} 
        onNavigateToContact={navigateToContact}
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