import { useState } from 'react';
import { ArrowRight, Play, Layout, ShieldCheck, Database, CreditCard, Sparkles, Code2, Globe } from 'lucide-react';
import './Hero.css';

type TabType = 'canvas' | 'code' | 'preview';
type CardType = 'analytics' | 'auth' | 'database' | 'payments';

interface HeroProps {
  onNavigate: (page: 'home' | 'about' | 'contact') => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [activeTab, setActiveTab] = useState<TabType>('canvas');
  const [selectedCard, setSelectedCard] = useState<CardType>('analytics');
  const [counterValue, setCounterValue] = useState<number>(4);

  const getCodeSnippet = () => {
    switch (selectedCard) {
      case 'auth':
        return `// Auth0 Security Module
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';

export const UserProfile = () => {
  const { user, isAuthenticated } = useAuth0();
  
  return isAuthenticated ? (
    <div className="flex items-center gap-4">
      <img src={user?.picture} alt={user?.name} />
      <div>
        <p className="font-bold">{user?.name}</p>
        <span className="text-xs">Secure Logged In</span>
      </div>
    </div>
  ) : (
    <Button variant="outline">Sign In</Button>
  );
};`;
      case 'database':
        return `// Supabase Realtime Database Query
import { supabase } from '@/lib/supabaseClient';

export async function fetchLiveAnalytics() {
  const { data, error } = await supabase
    .from('platform_events')
    .select('event_type, created_at')
    .order('created_at', { ascending: false })
    .limit(10);
    
  if (error) throw new Error(error.message);
  return data;
}`;
      case 'payments':
        return `// Stripe Checkout Integration
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY!);

export const handleCheckout = async (priceId: string) => {
  const stripe = await stripePromise;
  
  const response = await fetch('/api/create-checkout', {
    method: 'POST',
    body: JSON.stringify({ priceId }),
  });
  
  const session = await response.json();
  await stripe?.redirectToCheckout({
    sessionId: session.id,
  });
};`;
      case 'analytics':
      default:
        return `// Real-Time Analytics Component
import React from 'react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

export const Analytics = ({ liveData }) => {
  return (
    <div className="card glass">
      <h3>Global Users Traffic</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={liveData}>
            <Line type="monotone" dataKey="active" stroke="#6366f1" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};`;
    }
  };

  return (
    <section className="hero">
      <div className="section">
        <div className="hero-grid">
          {/* Left Text Column */}
          <div className="hero-content">
            <div className="hero-tag">
              <span className="hero-tag-pulse"></span>
              MainCrafts v2.5 Launching Now
            </div>
            
            <h1 className="hero-title">
              Build Smarter 
              <span>with MainCrafts</span>
            </h1>
            
            <p className="hero-desc">
              The next-generation visual development platform that translates your design modules directly into optimized React code. Connect APIs, sync databases, and deploy with zero config.
            </p>
            
            <div className="hero-buttons">
              <a href="#signup" className="btn btn-primary" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}>
                Get Started
                <ArrowRight size={16} />
              </a>
              <a href="#demo" className="btn btn-secondary">
                <Play size={16} fill="currentColor" />
                Watch Demo
              </a>
            </div>
            
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-val">10x</span>
                <span className="stat-label">Faster Deployment</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">99.9%</span>
                <span className="stat-label">Serverless Uptime</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">15k+</span>
                <span className="stat-label">Active Developers</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Mockup Dashboard */}
          <div className="hero-visual">
            <div className="visual-bg-glow"></div>
            <div className="mockup-wrapper">
              <div className="mockup-container">
                {/* Dashboard Tab Headers */}
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <div className="mockup-tabs">
                    <button 
                      className={`mockup-tab ${activeTab === 'canvas' ? 'active' : ''}`}
                      onClick={() => setActiveTab('canvas')}
                    >
                      Canvas Designer
                    </button>
                    <button 
                      className={`mockup-tab ${activeTab === 'code' ? 'active' : ''}`}
                      onClick={() => setActiveTab('code')}
                    >
                      React Code
                    </button>
                    <button 
                      className={`mockup-tab ${activeTab === 'preview' ? 'active' : ''}`}
                      onClick={() => setActiveTab('preview')}
                    >
                      Live App
                    </button>
                  </div>
                  <div className="mockup-title-bar">workspace.maincrafts</div>
                </div>

                {/* Dashboard Shell Grid */}
                <div className="mockup-body">
                  {/* Left Mock Sidebar */}
                  <div className="mockup-sidebar">
                    <div className="sidebar-section">
                      <span className="sidebar-title">Components</span>
                      <div className={`sidebar-item ${selectedCard === 'analytics' ? 'active' : ''}`} onClick={() => { setSelectedCard('analytics'); setActiveTab('canvas'); }}>
                        <Layout size={14} />
                        Analytics
                      </div>
                      <div className={`sidebar-item ${selectedCard === 'auth' ? 'active' : ''}`} onClick={() => { setSelectedCard('auth'); setActiveTab('canvas'); }}>
                        <ShieldCheck size={14} />
                        Secure Auth
                      </div>
                      <div className={`sidebar-item ${selectedCard === 'database' ? 'active' : ''}`} onClick={() => { setSelectedCard('database'); setActiveTab('canvas'); }}>
                        <Database size={14} />
                        Data Fetch
                      </div>
                      <div className={`sidebar-item ${selectedCard === 'payments' ? 'active' : ''}`} onClick={() => { setSelectedCard('payments'); setActiveTab('canvas'); }}>
                        <CreditCard size={14} />
                        Stripe Pay
                      </div>
                    </div>

                    <div className="sidebar-section">
                      <span className="sidebar-title">Status</span>
                      <div className="sidebar-item" style={{ cursor: 'default', opacity: 0.8 }}>
                        <Sparkles size={14} className="canvas-card-icon" />
                        AI Agent Online
                      </div>
                    </div>
                  </div>

                  {/* Main Mock Workspace Content */}
                  <div className="mockup-workspace">
                    {activeTab === 'canvas' && (
                      <div className="canvas-view">
                        <div className="canvas-header">
                          <span>Visual Workspace Editor</span>
                          <span style={{ fontSize: '0.75rem', background: 'rgba(20, 184, 166, 0.1)', padding: '2px 8px', borderRadius: '4px', color: '#14b8a6' }}>
                            Ready to Export
                          </span>
                        </div>
                        <div className="canvas-grid">
                          <div 
                            className={`canvas-card ${selectedCard === 'analytics' ? 'selected' : ''}`}
                            onClick={() => setSelectedCard('analytics')}
                          >
                            <Layout className="canvas-card-icon" size={18} />
                            <span className="canvas-card-title">Analytics Card</span>
                            <span className="canvas-card-desc">Charts, active user grids, and event streams.</span>
                          </div>
                          
                          <div 
                            className={`canvas-card ${selectedCard === 'auth' ? 'selected' : ''}`}
                            onClick={() => setSelectedCard('auth')}
                          >
                            <ShieldCheck className="canvas-card-icon" size={18} />
                            <span className="canvas-card-title">Secure Auth</span>
                            <span className="canvas-card-desc">Encrypted OAuth login flows using Auth0.</span>
                          </div>
                          
                          <div 
                            className={`canvas-card ${selectedCard === 'database' ? 'selected' : ''}`}
                            onClick={() => setSelectedCard('database')}
                          >
                            <Database className="canvas-card-icon" size={18} />
                            <span className="canvas-card-title">Supabase Sync</span>
                            <span className="canvas-card-desc">Real-time DB updates and state mutations.</span>
                          </div>
                          
                          <div 
                            className={`canvas-card ${selectedCard === 'payments' ? 'selected' : ''}`}
                            onClick={() => setSelectedCard('payments')}
                          >
                            <CreditCard className="canvas-card-icon" size={18} />
                            <span className="canvas-card-title">Stripe Gateway</span>
                            <span className="canvas-card-desc">Checkout links, subscription webhooks.</span>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 'auto', textAlign: 'center' }}>
                          💡 Tip: Select components to inspect code or toggle previews.
                        </p>
                      </div>
                    )}

                    {activeTab === 'code' && (
                      <pre className="code-view">
                        <code>
                          {getCodeSnippet()}
                        </code>
                      </pre>
                    )}

                    {activeTab === 'preview' && (
                      <div className="preview-view">
                        <div className="preview-widget">
                          <span className="preview-title">Live Preview Component</span>
                          <span className="preview-count">{counterValue}</span>
                          <span className="canvas-card-desc">Active User Nodes online</span>
                          <div className="preview-actions">
                            <button className="preview-btn preview-btn-add" onClick={() => setCounterValue(c => c + 1)}>
                              Add Node
                            </button>
                            <button className="preview-btn preview-btn-reset" onClick={() => setCounterValue(4)}>
                              Reset
                            </button>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Code2 size={12} /> React 19</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Globe size={12} /> Edge Network</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
