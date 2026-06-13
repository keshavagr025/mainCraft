import React, { useState } from 'react';
import { Mail, Slack, Send, CheckCircle2, Github, Twitter } from 'lucide-react';
import './Footer.css';
import logo from '../assets/logo.svg';
import type { PageType } from '../App';

interface FooterProps {
  onNavigate: (page: PageType, hash?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000); // Clear after 5 seconds
    }
  };

  return (
    <footer id="contact" className="footer-wrapper">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-brand">
          <a href="#" className="footer-brand-logo" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
            <img src={logo} alt="MainCrafts Logo" className="footer-logo-icon" />
            <span className="logo-text">MainCrafts</span>
          </a>
          <p className="footer-brand-text">
            Build smarter, deploy faster, and scale infinitely. The next-generation visual developer workspace powered by generative AI.
          </p>
          <div className="footer-socials">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="https://slack.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Slack">
              <Slack size={18} />
            </a>
            <a href="mailto:info@maincrafts.com" className="social-link" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Product Columns */}
        <div className="footer-links-col">
          <span className="footer-col-title">Product</span>
          <ul className="footer-links-list">
            <li><a href="#features" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('home', '#features'); }}>Features</a></li>
            <li><a href="#services" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('home', '#services'); }}>Services</a></li>
            <li><a href="#pricing" className="footer-link">Pricing Plans</a></li>
            <li><a href="#security" className="footer-link">Enterprise Security</a></li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="footer-links-col">
          <span className="footer-col-title">Company</span>
          <ul className="footer-links-list">
            <li><a href="#about" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>About Us</a></li>
            <li><a href="#careers" className="footer-link">Careers</a></li>
            <li><a href="#press" className="footer-link">Press Kit</a></li>
            <li><a href="#contact" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}>Contact Sales</a></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="footer-newsletter">
          <span className="footer-col-title">Keep Updated</span>
          <p className="newsletter-desc">
            Subscribe to our weekly changelog for visual designer enhancements and framework integrations.
          </p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="newsletter-input-group">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary newsletter-btn">
              Subscribe
              <Send size={14} />
            </button>
          </form>

          {isSubscribed && (
            <div className="newsletter-success">
              <CheckCircle2 size={16} />
              <span>Subscribed! Check your inbox soon.</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <span>&copy; 2025 MainCrafts Inc. All rights reserved.</span>
        <div className="footer-bottom-links">
          <a href="#privacy" className="footer-bottom-link">Privacy Policy</a>
          <a href="#terms" className="footer-bottom-link">Terms of Service</a>
          <a href="#contact" className="footer-bottom-link" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}>Contact</a>
        </div>
      </div>
    </footer>
  );
}
