

import React from 'react';
import { Link } from 'wouter';
import { personalName } from '../constants';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { BlogPost } from '../types';
import { formatDate } from '../utils/dateFormatter';
import { CalendarIcon } from './icons/CalendarIcon';
import { asText } from '@prismicio/client';

interface BlogListPageProps {
  posts: BlogPost[];
  isLoading: boolean;
}

export const BlogListPage: React.FC<BlogListPageProps> = ({ posts, isLoading }) => {
  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#3D3A37] antialiased">
      <header className="bg-[#EAE3D9] py-6 px-4 sm:px-8 md:px-16 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <a
              className="text-2xl sm:text-3xl text-[#3D3A37] font-outfit-title focus:outline-none"
              aria-label="Volver a la página de inicio"
            >
              {personalName}
            </a>
          </Link>
          <Link href="/">
            <a
              className="flex items-center text-[#A97155] hover:text-[#3D3A37] font-semibold py-2 px-4 rounded-md transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A97155]"
              aria-label="Volver a la página principal"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:-translate-x-0.5 group-focus-visible:-translate-x-0.5" />
              Volver al Inicio
            </a>
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-8 md:p-12 lg:p-16">
        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#3D3A37] mb-10 sm:mb-12 text-center">
          Todas las Entradas del Blog
        </h2>
        {isLoading && <p className="text-center text-lg text-[#5A5653]">Cargando entradas...</p>}
        {!isLoading && posts.length === 0 && (
          <p className="text-center text-lg text-[#5A5653]">No hay entradas en el blog todavía. Vuelve pronto.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {!isLoading && posts.map(post => (
            <Link key={post.id} href={`/blog/${post.uid || post.id}`}>
              <a
                className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col h-full group transition-all duration-300 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A97155] focus-visible:ring-offset-2 focus-visible:ring-offset-white text-left"
                aria-label={`Leer más sobre ${asText(post.data.title)}`}
              >
                <div className="overflow-hidden">
                  <img 
                    src={post.data.featured_image?.url || `https://picsum.photos/seed/${post.id}/600/400`}
                    alt={post.data.featured_image?.alt || asText(post.data.title) || 'Imagen de entrada de blog'}
                    className="w-full h-60 sm:h-72 object-cover group-hover:scale-105 group-focus-visible:scale-105 transition-transform duration-300 ease-in-out" 
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#3D3A37] mb-1 group-hover:text-[#A97155] group-focus-visible:text-[#A97155] transition-colors duration-200 line-clamp-2">
                    {asText(post.data.title)}
                  </h3>
                  <div className="flex items-center text-xs text-[#5A5653] mb-2">
                    <CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-[#A97155]" />
                    <time dateTime={post.data.publish_date || ''}>
                      {post.data.publish_date ? formatDate(post.data.publish_date) : 'Fecha no disponible'}
                    </time>
                  </div>
                  <p className="text-sm text-[#5A5653] leading-relaxed mb-4 line-clamp-3">
                    {asText(post.data.subtitle)}
                  </p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </main>

      <footer className="bg-[#EAE3D9] text-center p-8 mt-12 text-[#5A5653] text-xs sm:text-sm">
        © {new Date().getFullYear()} {personalName}. Todos los derechos reservados.
      </footer>
    </div>
  );
};