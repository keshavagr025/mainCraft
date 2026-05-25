import { Zap, Smartphone, TrendingUp, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import './Features.css';

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const featuresList: FeatureItem[] = [
  {
    icon: Zap,
    title: 'Lightning Speed',
    desc: 'Deploy static templates and dynamically computed nodes directly onto global edge networks. Experience sub-millisecond execution with zero warming delay.'
  },
  {
    icon: Smartphone,
    title: 'Adaptive Grids',
    desc: 'Design visually on a flexible viewport. MainCrafts compiles responsive layout breakpoints automatically, rendering pixel-perfect UI across all screens.'
  },
  {
    icon: TrendingUp,
    title: 'Infinite Scalability',
    desc: 'Backed by resilient serverless cloud clusters. Scale from your first user to ten million concurrent queries without worrying about server limits or throttling.'
  },
  {
    icon: Users,
    title: 'Multiplayer Branching',
    desc: 'Work collaboratively with your engineering team. Review changes, comment inline on elements, and resolve merge conflicts visually within the live designer.'
  }
];

export default function Features() {
  return (
    <section id="features" className="section">
      {/* Section Header */}
      <div className="section-header">
        <span className="section-tag">Core Features</span>
        <h2 className="section-title">Built for speed. Designed for scale.</h2>
        <p className="section-desc">
          MainCrafts combines the productivity of visual builder tools with the full capabilities and flexibility of modern cloud environments.
        </p>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        {featuresList.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="feature-card glass glass-hover">
              <div className="feature-glow"></div>
              <div className="feature-icon-wrapper">
                <Icon size={24} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
