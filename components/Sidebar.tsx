

import React from 'react';
import { Link } from 'wouter';
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
      {/* Name is shown in mobile header, so hide it here on smaller screens if sidebar is part of main layout */}
      <Link href="/">
        <a 
          onClick={onLinkClick}
          className="text-3xl text-[#3D3A37] mb-12 sm:mb-16 hidden md:block font-outfit-title text-left focus:outline-none"
          aria-label="Ir a la página de inicio"
        >
          {name}
        </a>
      </Link>
      {/* Using a placeholder for mobile top padding, if needed when name is not shown always */}
      <div className="md:hidden h-16"></div> {/* Spacer for mobile header if name is not shown */}


      <nav className="flex flex-col space-y-4 sm:space-y-5">
        {navItems.map((item) => (
          <Link key={item.id} href={`/#${item.id}`}>
            <a
              onClick={onLinkClick}
              className="text-left text-lg text-[#A97155] hover:text-[#3D3A37] transition-colors duration-200 focus:outline-none font-chiron-sidebar uppercase"
              aria-label={`Navegar a ${item.name}`}
            >
              {item.name}
            </a>
          </Link>
        ))}
      </nav>
    </aside>
  );
};