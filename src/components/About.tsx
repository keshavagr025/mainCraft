import { Target, Cpu, Users } from 'lucide-react';
import './About.css';

export default function About() {
  return (
    <section className="about-section">
      <div className="section">
        {/* About Header */}
        <div className="section-header">
          <span className="section-tag">About MainCrafts</span>
          <h1 className="section-title">The Future of Visual Development</h1>
          <p className="section-desc">
            We are pioneering a new paradigm where builders can design, connect services, and compile highly performant React applications entirely visually, powered by Generative AI.
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="about-grid">
          <div className="about-card glass glass-hover">
            <div className="about-card-glow"></div>
            <div className="about-card-icon">
              <Target size={24} />
            </div>
            <h3 className="about-card-title">Our Mission</h3>
            <p className="about-card-desc">
              To democratize software engineering by removing boilerplate and configuration hurdles, allowing creators to focus entirely on visual product design and logic synthesis.
            </p>
          </div>

          <div className="about-card glass glass-hover">
            <div className="about-card-glow"></div>
            <div className="about-card-icon">
              <Cpu size={24} />
            </div>
            <h3 className="about-card-title">AI-First Compiler</h3>
            <p className="about-card-desc">
              We believe code is an intermediate compilation target, not a manual entry interface. MainCrafts compiles pure, optimized, human-readable React code automatically.
            </p>
          </div>
        </div>

        {/* Stats Showcase */}
        <div className="about-stats-container glass">
          <div className="about-stats-grid">
            <div className="about-stat">
              <span className="stat-number">10M+</span>
              <span className="stat-desc">Serverless Deployments</span>
            </div>
            <div className="about-stat">
              <span className="stat-number">99.99%</span>
              <span className="stat-desc">Edge Node Uptime SLA</span>
            </div>
            <div className="about-stat">
              <span className="stat-number">10x</span>
              <span className="stat-desc">Accelerated Cycle Times</span>
            </div>
            <div className="about-stat">
              <span className="stat-number">100k+</span>
              <span className="stat-desc">Developers Workspace</span>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-header">
          <span className="section-tag">Our Team</span>
          <h2>The Minds Behind the Platform</h2>
        </div>

        <div className="team-grid">
          <div className="team-member-card glass glass-hover">
            <div className="avatar-placeholder avatar-ceo">
              <span>KA</span>
            </div>
            <h3 className="member-name">Keshav Agrawal</h3>
            <span className="member-role">Founder & CEO</span>
            <p className="member-bio">Leading the vision for visual and automated compiler platforms for software creators.</p>
          </div>

          <div className="team-member-card glass glass-hover">
            <div className="avatar-placeholder avatar-cto">
              <span>AR</span>
            </div>
            <h3 className="member-name">Alex Rivera</h3>
            <span className="member-role">CTO & Lead Architect</span>
            <p className="member-bio">Expert in browser engines, AST transformations, and edge deployment architectures.</p>
          </div>

          <div className="team-member-card glass glass-hover">
            <div className="avatar-placeholder avatar-cdo">
              <span>SC</span>
            </div>
            <h3 className="member-name">Sarah Chen</h3>
            <span className="member-role">VP of Design</span>
            <p className="member-bio">Committed to crafting high-fidelity design utilities and ergonomic user workspaces.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
