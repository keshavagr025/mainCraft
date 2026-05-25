import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Code2, Cpu, Globe, Layers, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import './Header.css';
import logo from '../assets/logo.svg';

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
}

const servicesList: ServiceItem[] = [
  {
    icon: Code2,
    title: 'Visual App Builder',
    desc: 'Drag & drop components with instant clean code output.',
    href: '#services'
  },
  {
    icon: Cpu,
    title: 'AI Code Assistant',
    desc: 'Describe functionality and watch it construct in real-time.',
    href: '#services'
  },
  {
    icon: Layers,
    title: 'Collaborative Editor',
    desc: 'Multiplayer editing and shared staging workspaces.',
    href: '#services'
  },
  {
    icon: Globe,
    title: 'Cloud Edge Hosting',
    desc: 'Deploy worldwide instantly with auto-scaling APIs.',
    href: '#services'
  }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setIsMobileDropdownOpen(false); // Close dropdown when menu closes
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <a href="#" className="logo">
          <img src={logo} alt="MainCrafts Logo" className="logo-icon" />
          <span className="logo-text">Main<span>Crafts</span></span>
        </a>

        {/* Desktop Navigation */}
        <nav>
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#" className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a href="#features" className="nav-link">Features</a>
            </li>
            <li className="nav-item">
              <a href="#services" className="nav-link">
                Services <ChevronDown size={14} />
              </a>
              {/* Dropdown Menu */}
              <div className="dropdown glass">
                {servicesList.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <a key={index} href={service.href} className="dropdown-item">
                      <Icon className="dropdown-icon" size={18} />
                      <div className="dropdown-info">
                        <span className="dropdown-title">{service.title}</span>
                        <span className="dropdown-desc">{service.desc}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link">Contact</a>
            </li>
          </ul>
        </nav>

        {/* CTA Buttons */}
        <div className="header-actions">
          <a href="#signup" className="btn btn-primary">
            Get Started
            <ArrowRight size={16} />
          </a>
          <button className="mobile-toggle" onClick={toggleMobileMenu} aria-label="Toggle Navigation">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`} 
        onClick={toggleMobileMenu}
      />

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-list">
          <li>
            <a href="#" className="mobile-nav-link" onClick={toggleMobileMenu}>Home</a>
          </li>
          <li>
            <a href="#features" className="mobile-nav-link" onClick={toggleMobileMenu}>Features</a>
          </li>
          <li>
            <div className="mobile-nav-item">
              <button 
                className="mobile-dropdown-btn" 
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              >
                Services
                <ChevronDown 
                  size={18} 
                  style={{ 
                    transform: isMobileDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }} 
                />
              </button>
              <div className={`mobile-dropdown ${isMobileDropdownOpen ? 'active' : ''}`}>
                {servicesList.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <a 
                      key={index} 
                      href={service.href} 
                      className="mobile-dropdown-link"
                      onClick={toggleMobileMenu}
                    >
                      <Icon className="dropdown-icon" size={16} />
                      <span className="mobile-dropdown-title">{service.title}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </li>
          <li>
            <a href="#contact" className="mobile-nav-link" onClick={toggleMobileMenu}>Contact</a>
          </li>
        </ul>

        <div className="mobile-actions">
          <a href="#signup" className="btn btn-primary" onClick={toggleMobileMenu}>
            Get Started
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </header>
  );
}
