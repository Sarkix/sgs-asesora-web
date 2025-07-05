
import React from 'react';
import { NavItem } from '../types';

interface SidebarProps {
  name: string;
  navItems: NavItem[];
  onLinkClick: () => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ name, navItems, onLinkClick, className }) => {
  return (
    <aside className={className}>
      {/* Name is shown on desktop, but hidden on mobile where it appears in the header. */}
      <div className="hidden md:block">
        <a 
          href="#home"
          onClick={onLinkClick}
          className="text-3xl text-[#3D3A37] mb-12 sm:mb-16 font-outfit-title text-left focus:outline-none"
          aria-label="Ir a la página de inicio"
        >
          {name}
        </a>
      </div>
      
      {/* Spacer for mobile header if name is not shown */}
      <div className="md:hidden h-16"></div> {/* Spacer for mobile header */}


      <nav className="flex flex-col space-y-4 sm:space-y-5">
        {navItems.map((item) => {
          // Use standard <a> tags for hash links to scroll on the same page for all items.
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={onLinkClick}
              className="text-left text-lg text-[#A97155] hover:text-[#3D3A37] transition-colors duration-200 focus:outline-none font-chiron-sidebar uppercase"
              aria-label={`Navegar a ${item.name}`}
            >
              {item.name}
            </a>
          );
        })}
      </nav>
    </aside>
  );
};