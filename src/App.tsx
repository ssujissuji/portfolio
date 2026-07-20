import { useState } from 'react';
import content from './content';
import { FeaturedProject } from './components/FeaturedProject';
import { Intro } from './components/Intro';
import { OtherProjects } from './components/OtherProjects';
import { About, Hero, Skills, Statement, Stats, Timeline } from './components/ProfileSections';
import { Divider, ExternalLink, Icon, Lines } from './components/common';
import { useReveal } from './hooks/useReveal';

export function App() {
  const [isDark, setIsDark] = useState(false);
  useReveal();

  return (
    <div className={`ap${isDark ? ' dark' : ''}`}>
      <nav>
        <div className="nav-inner">
          <span className="nav-logo">{content.nav.logo}</span>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <button className="theme-btn" onClick={() => setIsDark((value) => !value)}>
              <Icon name={isDark ? 'ti-sun' : 'ti-moon'} /> {isDark ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Intro lines={content.intro} />
        <Divider />
        <Hero content={content.hero} />
        <Statement content={content.statement} />
        <About content={content.about} />
        <Stats content={content.stats} />
        <Skills content={content.skills} />
        <Timeline content={content.timeline} />
        <FeaturedProject project={content.featuredProject} />
        <Divider />
        <OtherProjects projects={content.otherProjects} />
        <Divider />

        <section className="contact-sec" id="contact">
          <div className="contact-box reveal">
            <div className="contact-title">{content.contact.title}</div>
            <div className="contact-sub"><Lines text={content.contact.subtitle} /></div>
            <div className="contact-btns">
              {content.contact.links.map((link) => (
                <ExternalLink className="contact-btn" href={link.href} key={link.href}>
                  <Icon name={link.icon} /> {link.label}
                </ExternalLink>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>{content.footer}</footer>
    </div>
  );
}
