import React, { useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { BlogPost } from '../types';
import { asText } from '@prismicio/client';

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#3D3A37] mb-8 sm:mb-10">
    <span className="pb-1 border-b-2 border-[#3D3A37]">{title}</span>
  </h2>
);

interface BlogSectionProps {
  posts: BlogPost[];
  onNavigateToBlogPage: () => void;
  onSelectPost: (post: BlogPost) => void;
}

export const BlogSection = React.forwardRef<HTMLElement, BlogSectionProps>((props, ref) => {
  const { posts, onNavigateToBlogPage, onSelectPost } = props;
  const displayedPosts = posts.slice(0, 3); // Show only first 3 or as defined

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
      id="blog"
      className={`scroll-mt-16 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <SectionTitle title="De Mi Blog" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {displayedPosts.map(post => (
          <button
            key={post.id} 
            onClick={() => onSelectPost(post)}
            className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A97155] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EAE3D9] rounded-lg flex flex-col"
            aria-label={`Leer más sobre ${asText(post.data.title)}`}
          >
            <div className="overflow-hidden rounded-md mb-4 shadow-md">
              <img 
                src={post.data.featured_image?.url || `https://picsum.photos/seed/${post.id}/600/400`} 
                alt={post.data.featured_image?.alt || asText(post.data.title) || 'Imagen de entrada de blog'} 
                className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 group-focus-visible:scale-105 transition-transform duration-300 ease-in-out" 
              />
            </div>
            <div className="flex flex-col p-1">
              <h3 className="text-lg sm:text-xl font-semibold text-[#3D3A37] group-hover:text-[#A97155] group-focus-visible:text-[#A97155] transition-colors duration-200">
                {asText(post.data.title)}
              </h3>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-12 text-center">
        <button
          onClick={onNavigateToBlogPage}
          className="bg-[#A97155] text-white py-3 px-8 rounded-md text-base sm:text-lg font-semibold hover:bg-opacity-80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#A97155] focus:ring-opacity-50"
          aria-label="Ir a la página del blog completa"
        >
          Ir al Blog
        </button>
      </div>
    </section>
  );
});

BlogSection.displayName = 'BlogSection';