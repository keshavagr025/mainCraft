import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      {/* Background radial-gradient glow filters */}
      <div className="bg-gradient-wrapper">
        <div className="bg-glow-1"></div>
        <div className="bg-glow-2"></div>
      </div>

      {/* Landing Page Content */}
      <Header />
      <main>
        <Hero />
        <Features />
        <Services />
      </main>
      <Footer />
    </>
  );
}
