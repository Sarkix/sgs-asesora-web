
import React, { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { BlogPost } from '../types';
import { personalName } from '../constants';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { formatDate } from '../utils/dateFormatter';
import { asText, asHTML } from '@prismicio/client';

interface FullBlogPostPageProps {
  uid: string;
  posts: BlogPost[];
  isLoading: boolean;
}

export const FullBlogPostPage: React.FC<FullBlogPostPageProps> = ({ uid, posts, isLoading }) => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [uid]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8F5F0]">
        <p className="text-lg text-[#5A5653]">Cargando entrada...</p>
      </div>
    );
  }
  
  const post = posts.find(p => p.uid === uid || p.id === uid);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F5F0] p-8">
        <h1 className="text-4xl font-bold mb-4 text-center">404 - Entrada no encontrada</h1>
        <p className="text-lg mb-8 text-center">La entrada del blog que buscas no existe o ha sido movida.</p>
        <Link href="/blog">
          <a className="bg-[#A97155] text-white py-3 px-8 rounded-md text-base sm:text-lg font-semibold hover:bg-opacity-80 transition-opacity duration-200">
            Volver al Blog
          </a>
        </Link>
      </div>
    );
  }

  const subtitleHtml = asHTML(post.data.subtitle);
  const contentHtml = asHTML(post.data.main_content);

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#3D3A37] antialiased">
      <header className="bg-[#EAE3D9] py-6 px-4 sm:px-8 md:px-16 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
           <Link href="/">
              <a
                className="text-xl sm:text-2xl text-[#3D3A37] font-outfit-title focus:outline-none"
                aria-label="Volver a la página de inicio"
              >
                {personalName}
              </a>
           </Link>
          <Link href="/blog">
            <a
              className="flex items-center text-[#A97155] hover:text-[#3D3A37] font-semibold py-2 px-4 rounded-md transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A97155] whitespace-nowrap"
              aria-label="Volver a todas las entradas del blog"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:-translate-x-0.5 group-focus-visible:-translate-x-0.5" />
              Volver al Blog
            </a>
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-8 md:p-12 lg:p-16">
        <article className="bg-white shadow-xl rounded-lg overflow-hidden">
          <img 
            src={post.data.featured_image?.url || `https://picsum.photos/seed/${post.id}/800/450`} 
            alt={post.data.featured_image?.alt || asText(post.data.title) || 'Imagen de cabecera del artículo'} 
            className="w-full h-64 sm:h-80 md:h-96 object-cover" 
          />
          <div className="p-6 sm:p-8 md:p-[65px]">
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#3D3A37] mb-2">
              {asText(post.data.title)}
            </h2>
            
            <time dateTime={post.data.publish_date || ''} className="block text-sm text-[#5A5653] mb-3">
              Publicado el {post.data.publish_date ? formatDate(post.data.publish_date) : 'Fecha no disponible'}
            </time>
            
            <div 
              className="prose prose-xl max-w-none prose-p:italic prose-p:font-semibold prose-headings:text-3D3A37 prose-p:text-[#3D3A37] mb-6 sm:mb-8"
              dangerouslySetInnerHTML={{ __html: subtitleHtml }}
            />

            <div 
              className="prose prose-sm sm:prose-base max-w-none text-[#5A5653] leading-relaxed prose-headings:text-[#3D3A37] prose-a:text-[#A97155] hover:prose-a:text-[#3D3A37] prose-strong:text-[#3D3A37]"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </article>
      </main>

      <footer className="bg-[#EAE3D9] text-center p-8 mt-12 text-[#5A5653] text-xs sm:text-sm">
        © {new Date().getFullYear()} {personalName}. Todos los derechos reservados.
      </footer>
    </div>
  );
};