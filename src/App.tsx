import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Submissions from './components/Submissions';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

export type PageType = 'home' | 'about' | 'contact' | 'submissions' | 'dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  const handleNavigate = (page: PageType, hash?: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    if (hash) {
      setScrollTarget(hash);
    }
  };

  useEffect(() => {
    if (currentPage === 'home' && scrollTarget) {
      const timer = setTimeout(() => {
        const element = document.getElementById(scrollTarget.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setScrollTarget(null);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentPage, scrollTarget]);

  return (
    <>
      {/* Background radial-gradient glow filters */}
      <div className="bg-gradient-wrapper">
        <div className="bg-glow-1"></div>
        <div className="bg-glow-2"></div>
      </div>

      {/* Landing Page Content */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main style={{ minHeight: 'calc(100vh - var(--header-height) - 350px)' }}>
        {currentPage === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <Features />
            <Services />
          </>
        )}
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'submissions' && <Submissions onNavigate={handleNavigate} />}
        {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
      </main>
      <Footer onNavigate={handleNavigate} />
    </>
  );
}
