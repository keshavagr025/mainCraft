import { Check, Code, Sparkles, Database, CloudLightning, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import './Services.css';

interface ServiceCard {
  icon: LucideIcon;
  badge: string;
  title: string;
  desc: string;
  features: string[];
}

const servicesData: ServiceCard[] = [
  {
    icon: Code,
    badge: 'Visual Design',
    title: 'Visual Drag & Drop Canvas',
    desc: 'Assemble premium React user interfaces without touching HTML syntax. Drag boxes, arrange panels, customize margins visually.',
    features: ['React 19 & Next.js compatibility', 'Clean inline CSS export', 'Full layout flexbox/grid controls']
  },
  {
    icon: Database,
    badge: 'State & Storage',
    title: 'Real-Time Database Sync',
    desc: 'Connect databases, map data columns, and configure state mutation schemas through our automated database connection wizard.',
    features: ['Supabase & PostgreSQL bindings', 'GraphQL & REST auto-generation', 'Encrypted local cache storage']
  },
  {
    icon: CloudLightning,
    badge: 'Global CDN',
    title: 'Multi-Cloud Edge Routing',
    desc: 'Compile your assets directly into globally distributed edge networks. Never manage server infrastructure or manual scale triggers again.',
    features: ['AWS CloudFront & Cloudflare routing', 'Dynamic geographical load routing', '99.99% automatic failover network']
  }
];

export default function Services() {
  return (
    <section id="services" className="section">
      {/* Section Header */}
      <div className="section-header">
        <span className="section-tag">Our Services</span>
        <h2 className="section-title">Everything you need to launch.</h2>
        <p className="section-desc">
          Professional cloud infrastructure, AI scaffolding agents, and rapid visual design tools, combined under a single interface.
        </p>
      </div>

      {/* Showcase Visual Element */}
      <div className="services-showcase">
        <div className="showcase-content">
          <div className="service-badge">
            <span className="service-badge-dot"></span>
            Autopilot Deployment Live
          </div>
          <h3 className="showcase-title">AI-Powered Build Pipelines</h3>
          <p className="showcase-desc">
            MainCrafts continuously monitors your workspace. When you change components, our AI reviews your layouts, verifies accessibility standards, compiles TypeScript types, and deploys.
          </p>
          <a href="#pipelines" className="btn btn-outline" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
            Explore Pipelines
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Showcase Pipeline Visual Mockup */}
        <div className="showcase-visual">
          <div className="showcase-visual-row">
            <div className="showcase-visual-info">
              <Sparkles className="showcase-visual-icon" size={16} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>1. AI Design Audit</span>
            </div>
            <span className="showcase-visual-status status-active">Passed (0 warnings)</span>
          </div>

          <div className="showcase-visual-row">
            <div className="showcase-visual-info">
              <Code className="showcase-visual-icon" size={16} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>2. Compile TypeScript modules</span>
            </div>
            <span className="showcase-visual-status status-active">Compiled successfully</span>
          </div>

          <div className="showcase-visual-row" style={{ opacity: 0.9 }}>
            <div className="showcase-visual-info">
              <Database className="showcase-visual-icon" size={16} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>3. Sync Database Schemas</span>
            </div>
            <span className="showcase-visual-status status-active">Synced migrations</span>
          </div>

          <div className="showcase-visual-row animate-pulse" style={{ borderLeft: '3px solid var(--accent)' }}>
            <div className="showcase-visual-info">
              <CloudLightning className="showcase-visual-icon" style={{ color: 'var(--accent)' }} size={16} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>4. Deploy to edge nodes</span>
            </div>
            <span className="showcase-visual-status status-building">Deploying to 32 regions...</span>
          </div>
        </div>
      </div>

      {/* Services Grid cards */}
      <div className="services-grid">
        {servicesData.map((service, index) => {
          const Icon = service.icon;
          return (
            <div key={index} className="service-card-wrapper">
              <div className="service-card">
                <div className="service-badge">
                  <span className="service-badge-dot"></span>
                  {service.badge}
                </div>
                <h3 className="service-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={20} style={{ color: 'var(--primary)' }} />
                  {service.title}
                </h3>
                <p className="service-desc">{service.desc}</p>
                <ul className="service-features-list">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="service-feature">
                      <Check size={14} className="service-feature-check" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
