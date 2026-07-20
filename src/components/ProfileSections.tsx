import { useState } from 'react';
import type { PortfolioContent } from '../content';
import { Divider, Icon, Lines, SectionHeading } from './common';

export function Hero({ content }: { content: PortfolioContent['hero'] }) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <section className="hero" id="about">
        <div className="hero-eyebrow reveal">{content.eyebrow}</div>
        <div className="hero-avatar reveal d1">
          <img src="assets/profile.png" alt="황수지 프로필" />
        </div>
        <div className="hero-name reveal d1">{content.name}</div>
        <div className="hero-sub reveal d2">{content.subtitle}</div>
        <div className="hero-desc reveal d2">{content.description}</div>
        <div className="hero-btns reveal d3">
          <button className="btn-blue" onClick={() => scrollTo('projects')}>
            프로젝트 보기
          </button>
          <button className="btn-ghost" onClick={() => scrollTo('contact')}>
            연락하기
          </button>
        </div>
      </section>
      <Divider />
    </>
  );
}

export function Statement({
  content,
}: {
  content: PortfolioContent['statement'];
}) {
  return (
    <>
      <section className="statement">
        <div className="st-text reveal">
          {content.line1}
          <br />
          <span>{content.highlight}</span> {content.line2}
        </div>
        <div className="st-sub reveal d2">{content.sub}</div>
      </section>
      <Divider />
    </>
  );
}

function AboutImage({
  image,
  icon,
  label,
}: {
  image?: string;
  icon: string;
  label: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (!image || hasError) {
    return (
      <div className="feature-visual reveal">
        <Icon name={icon} />
      </div>
    );
  }

  return (
    <div className="feature-visual reveal feature-visual--img">
      <img src={image} alt={label} onError={() => setHasError(true)} />
    </div>
  );
}

export function About({ content }: { content: PortfolioContent['about'] }) {
  return (
    <>
      <div id="about-features" style={{ background: 'var(--bg)' }}>
        {content.map((item, index) => (
          <div key={item.title}>
            {index > 0 && <Divider />}
            <div className={`feature-row${item.reversed ? ' rev' : ''}`}>
              <AboutImage image={item.image} icon={item.icon} label={item.eyebrow} />
              <div className="reveal d2">
                <div className="feature-eyebrow">{item.eyebrow}</div>
                <div className="feature-title">{item.title}</div>
                <div className="feature-desc">
                  {item.description.split('\n\n').map((paragraph, paragraphIndex) => (
                    <span key={paragraph}>
                      {paragraphIndex > 0 && <><br /><br /></>}
                      {paragraph}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Divider />
    </>
  );
}

export function Stats({ content }: { content: PortfolioContent['stats'] }) {
  return (
    <>
      <section className="stats-sec">
        <div className="stats-grid">
          {content.map((stat, index) => (
            <div
              className={`stat-item reveal${index > 0 ? ` d${Math.min(index, 3)}` : ''}`}
              key={stat.label}>
              {stat.icon && <div className="stat-icon"><Icon name={stat.icon} /></div>}
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label"><Lines text={stat.label} /></div>
            </div>
          ))}
        </div>
      </section>
      <Divider />
    </>
  );
}

export function Skills({ content }: { content: PortfolioContent['skills'] }) {
  return (
    <>
      <section className="skills-sec" id="skills">
        <SectionHeading
          eyebrow="Skills"
          title="기술 스택"
          subtitle="다양한 도구로 아이디어를 현실로 만듭니다."
        />
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div id="skills-list">
            {content.map((category, index) => (
              <div
                className={`skill-cat reveal${index > 0 && index < 3 ? ` d${index}` : ''}`}
                key={category.label}>
                <div className="skill-cat-label">{category.label}</div>
                <div className="chips">
                  {category.items.map((item) => <div className="chip" key={item}>{item}</div>)}
                </div>
                {category.description && (
                  <div className="skill-cat-desc">{category.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Divider />
    </>
  );
}

export function Timeline({ content }: { content: PortfolioContent['timeline'] }) {
  return (
    <>
      <section className="timeline-sec" id="timeline">
        <SectionHeading
          eyebrow="Timeline"
          title="걸어온 길"
          subtitle="경험이 쌓여 지금의 개발자가 되었습니다."
        />
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div className="tl reveal">
            {content.map((item, index) => (
              <div key={item.title}>
                {index > 0 && <div className="tl-gap" />}
                <div className="tl-main">
                  <div className="tl-main-dot" />
                  <div className="tl-date">{item.date}</div>
                  <div className="tl-title">{item.title}</div>
                  <div className="tl-subtitle">{item.subtitle}</div>
                  {item.subItems.length > 0 && (
                    <div className="tl-subs">
                      {item.subItems.map((subItem) => (
                        <div className="tl-sub-item" key={`${subItem.date}-${subItem.title}`}>
                          <div className="tl-sub-dot" />
                          <div>
                            <div className="tl-sub-date">{subItem.date}</div>
                            <div className="tl-sub-title">{subItem.title}</div>
                            <div className="tl-sub-desc">{subItem.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Divider />
    </>
  );
}
