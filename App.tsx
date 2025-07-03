

import React, { useRef, useState, useEffect } from 'react';
import { Switch, Route, Router, Link, useLocation } from 'wouter';
import { Sidebar } from './components/Sidebar';
import { MainPageLayout } from './components/MainPageLayout';
import { BlogListPage } from './components/BlogListPage';
import { FullBlogPostPage } from './components/FullBlogPostPage';
import { NavItem, BlogPost } from './types';
import { personalName } from './constants';
import { MenuIcon } from './components/icons/MenuIcon';
import { CloseIcon } from './components/icons/CloseIcon';
import client from './utils/prismicConfig';

const navItems: NavItem[] = [
  { name: 'Biografía', id: 'biography' },
  { name: 'Experiencia', id: 'expertise' },
  { name: 'Educación', id: 'education' },
  { name: 'Blog', id: 'blog' },
  { name: 'Contacto', id: 'contact' },
];

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [location] = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoadingPosts(true);
      try {
        const posts = await client.getAllByType('blog_post', {
          orderings: {
            field: 'my.blog_post.publish_date',
            direction: 'desc',
          },
        });
        setBlogPosts(posts as unknown as BlogPost[]);
      } catch (error) {
        console.error("Failed to fetch blog posts from Prismic:", error);
      } finally {
        setIsLoadingPosts(false);
      }
    };
    fetchPosts();
  }, []);
  
  // Close sidebar on route change
  useEffect(() => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    const mobile = window.innerWidth < 768;
    if (isSidebarOpen && mobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleLinkClick = () => {
    if (window.innerWidth < 768 && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const sidebarClassName = `
    bg-[#F8F5F0] flex flex-col p-6 sm:p-8 fixed top-0 left-0 h-full w-60 sm:w-64 md:w-72 
    transition-transform duration-300 ease-in-out
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0
    z-30 md:z-10
  `;
  
  const showSidebarAndMobileHeader = !location.startsWith('/blog');

  return (
    <Router>
      {showSidebarAndMobileHeader && (
        <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#F8F5F0] shadow-md p-4 flex justify-between items-center h-16">
          <a href="#home" className="text-xl text-[#3D3A37] focus:outline-none font-outfit-title flex items-center">
            {personalName}
          </a>
          <button 
            onClick={toggleSidebar} 
            className="text-[#A97155] px-2 focus:outline-none focus:ring-2 focus:ring-[#A97155] rounded flex items-center" 
            aria-label={isSidebarOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={isSidebarOpen}
          >
            {isSidebarOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </header>
      )}
      
      <div className="min-h-screen flex text-[#3D3A37] antialiased">
        {showSidebarAndMobileHeader && (
          <>
            <Sidebar
              name={personalName}
              navItems={navItems}
              onLinkClick={handleLinkClick}
              className={sidebarClassName}
            />

            {isSidebarOpen && window.innerWidth < 768 && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                onClick={toggleSidebar}
                aria-hidden="true"
              ></div>
            )}
          </>
        )}

        <main className={`
          flex-1 bg-[#F8F5F0] overflow-y-auto
          ${showSidebarAndMobileHeader ? 'pt-16 md:pt-0 ml-0 md:ml-60 lg:ml-72' : 'pt-0 ml-0'}
        `}>
          <Switch>
            <Route path="/">
              <MainPageLayout blogPosts={blogPosts} onLinkClick={handleLinkClick} />
            </Route>
            <Route path="/blog">
              <BlogListPage 
                posts={blogPosts}
                isLoading={isLoadingPosts}
              />
            </Route>
            <Route path="/blog/:uid">
              {(params: Record<string, string | undefined>) => <FullBlogPostPage uid={params.uid || ''} posts={blogPosts} isLoading={isLoadingPosts} />}
            </Route>
            <Route>
              <div className="flex flex-col items-center justify-center h-full p-8">
                <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
                <p className="text-lg mb-8">La página que buscas no existe.</p>
                <Link href="/">
                  <a className="bg-[#A97155] text-white py-3 px-8 rounded-md text-base sm:text-lg font-semibold hover:bg-opacity-80 transition-opacity duration-200">
                    Volver al Inicio
                  </a>
                </Link>
              </div>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;