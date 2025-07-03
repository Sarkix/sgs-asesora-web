
import React, { useRef, useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { HeroSection } from './components/HeroSection';
import { BiographySection } from './components/BiographySection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { EducationSection } from './components/EducationSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
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

type PageView = 'main' | 'blogList' | 'blogPost';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('main');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

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

  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    biography: useRef<HTMLElement>(null),
    expertise: useRef<HTMLElement>(null),
    education: useRef<HTMLElement>(null),
    blog: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleNavigationAndCloseSidebar = (id: string) => {
    const closeMobileSidebar = () => {
      if (window.innerWidth < 768 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    if (id === 'hero' && currentPage === 'main') {
        sectionRefs.hero.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMobileSidebar();
        return;
    }
    
    if (currentPage !== 'main') {
      setCurrentPage('main'); 
      setSelectedPost(null); 
      setTimeout(() => {
        const section = sectionRefs[id as keyof typeof sectionRefs];
        section.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMobileSidebar();
      }, 50); 
    } else {
      const section = sectionRefs[id as keyof typeof sectionRefs];
      section.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileSidebar();
    }
  };

  const navigateToBlogListPage = () => {
    setCurrentPage('blogList');
    setSelectedPost(null);
    if (window.innerWidth < 768 && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const navigateToMainPage = () => {
    setCurrentPage('main');
    setSelectedPost(null);
  };

  const handleSelectBlogPost = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentPage('blogPost');
    if (window.innerWidth < 768 && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };
  
  useEffect(() => {
    if (currentPage === 'main') {
        // Scrolling handled by onNavigate for sections
    } else {
        window.scrollTo(0, 0); 
    }
  }, [currentPage]);

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


  if (currentPage === 'blogList') {
    return (
      <BlogListPage 
        onNavigateBackToHome={navigateToMainPage} 
        onSelectPost={handleSelectBlogPost} 
        posts={blogPosts}
        isLoading={isLoadingPosts}
      />
    );
  }

  if (currentPage === 'blogPost') {
    if (!selectedPost) {
      navigateToBlogListPage(); 
      return null;
    }
    return (
      <FullBlogPostPage 
        post={selectedPost}
        onNavigateBackToBlogList={navigateToBlogListPage}
        onNavigateToHome={navigateToMainPage}
      />
    );
  }

  const sidebarClassName = `
    bg-[#F8F5F0] flex flex-col p-6 sm:p-8 fixed top-0 left-0 h-full w-60 sm:w-64 md:w-72 
    transition-transform duration-300 ease-in-out
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0
    z-30 md:z-10
  `;

  return (
    <>
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#F8F5F0] shadow-md p-4 flex justify-between items-center h-16">
        <button 
          onClick={() => handleNavigationAndCloseSidebar('hero')} 
          className="text-xl text-[#3D3A37] focus:outline-none font-outfit-title flex items-center"
        >
          {personalName}
        </button>
        <button 
          onClick={toggleSidebar} 
          className="text-[#A97155] px-2 focus:outline-none focus:ring-2 focus:ring-[#A97155] rounded flex items-center" 
          aria-label={isSidebarOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </header>
      
      <div className="min-h-screen flex text-[#3D3A37] antialiased">
        <Sidebar
          name={personalName}
          navItems={navItems}
          onNavigate={handleNavigationAndCloseSidebar}
          className={sidebarClassName}
        />

        {isSidebarOpen && window.innerWidth < 768 && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={toggleSidebar}
            aria-hidden="true"
          ></div>
        )}

        <main className={`
          flex-1 ml-0 md:ml-60 lg:ml-72 bg-[#F8F5F0] overflow-y-auto
          pt-16 md:pt-0
        `}>
          <HeroSection 
            ref={sectionRefs.hero} 
            onNavigateToContact={() => handleNavigationAndCloseSidebar('contact')} 
          />
          <div className="bg-[#EAE3D9] px-6 sm:px-12 md:px-20 lg:px-28 py-20 md:py-24 space-y-16 md:space-y-20">
            <BiographySection ref={sectionRefs.biography} />
            <ExpertiseSection ref={sectionRefs.expertise} />
            <EducationSection ref={sectionRefs.education} />
            <BlogSection 
              ref={sectionRefs.blog} 
              posts={blogPosts}
              onNavigateToBlogPage={navigateToBlogListPage} 
              onSelectPost={handleSelectBlogPost}
            />
            <ContactSection ref={sectionRefs.contact} />
          </div>
          <footer className="bg-[#EAE3D9] text-center p-8 text-[#5A5653] text-xs sm:text-sm">
            © {new Date().getFullYear()} {personalName}. Todos los derechos reservados.
          </footer>
        </main>
      </div>
    </>
  );
};

export default App;
