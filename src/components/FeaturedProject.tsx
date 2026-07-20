import { useEffect, useMemo, useRef, useState } from 'react';
import type { FeaturedProject as FeaturedProjectContent, FeaturedStep } from '../content';
import { ExternalLink, Icon, Lines } from './common';

function ProjectLinks({ links }: { links: FeaturedStep['links'] }) {
  if (links.length === 0) return null;

  return (
    <div className="project-step__links">
      {links.map((link) => (
        <ExternalLink className="project-step__link" href={link.url} key={link.url}>
          <Icon name={link.icon} /> {link.label}
        </ExternalLink>
      ))}
    </div>
  );
}

function ProjectStep({
  step,
  articleRef,
  slideIndex,
}: {
  step: FeaturedStep;
  articleRef: (node: HTMLElement | null) => void;
  slideIndex: number;
}) {
  const images = 'images' in step ? step.images : undefined;
  const decisions = 'decisions' in step ? step.decisions : undefined;
  const isMulti = Boolean(images?.length);

  return (
    <article
      ref={articleRef}
      className={`project-step${isMulti ? ' feature-multi' : ''}`}
      data-step={step.step}
      style={isMulti ? { minHeight: `${images!.length * 100}vh` } : undefined}>
      <div className={isMulti ? 'feature-step-inner' : undefined}>
        <div className="project-step__eyebrow">{step.eyebrow}</div>
        <div className="project-step__title"><Lines text={step.title} /></div>
        <div className="project-step__desc">{step.description}</div>
        {decisions && decisions.length > 0 && (
          <div className="decision-grid">
            {decisions.map((decision) => (
              <div className="decision-card" key={decision.title}>
                <div className="decision-title">{decision.title}</div>
                <div className="decision-desc">{decision.description}</div>
              </div>
            ))}
          </div>
        )}
        <ProjectLinks links={step.links} />
        {images && images.length > 1 && (
          <div className="feature-img-dots" aria-label="이미지 진행 상태">
            {images.map((image, index) => (
              <span
                className={`feature-img-dot${slideIndex === index ? ' active' : ''}`}
                key={image}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export function FeaturedProject({ project }: { project: FeaturedProjectContent }) {
  const steps = useMemo(() => project.steps.filter((step) => !('hidden' in step && step.hidden)), [project]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const articleRefs = useRef<(HTMLElement | null)[]>([]);
  const activeStep = steps[activeIndex];
  const activeImages = 'images' in activeStep ? activeStep.images : undefined;
  const activeImage = 'image' in activeStep ? activeStep.image : undefined;
  const isReversed = activeStep.step === 'approach' || activeStep.step === 'feature';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = articleRefs.current.indexOf(entry.target as HTMLElement);
          if (index >= 0) {
            setActiveIndex(index);
            setSlideIndex(0);
          }
        });
      },
      { threshold: 0.15 },
    );

    articleRefs.current.forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, [steps]);

  useEffect(() => {
    if (!activeImages?.length) return;

    const updateSlide = () => {
      const article = articleRefs.current[activeIndex];
      if (!article) return;

      const rect = article.getBoundingClientRect();
      const scrollableHeight = article.offsetHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? -rect.top / scrollableHeight : 0;
      const boundedProgress = Math.max(0, Math.min(0.999, progress));
      setSlideIndex(Math.floor(boundedProgress * activeImages.length));
    };

    updateSlide();
    window.addEventListener('scroll', updateSlide, { passive: true });
    return () => window.removeEventListener('scroll', updateSlide);
  }, [activeImages, activeIndex]);

  return (
    <section className="featured-sec" id="projects">
      <div className="featured-label reveal">{project.label}</div>
      <div className="featured-title reveal">{project.title}</div>
      <div className="featured-sub reveal">{project.subtitle}</div>

      <div className={`featured-project${isReversed ? ' layout-reversed' : ''}`}>
        <div className="featured-project__sticky">
          <div className="project-mockup" data-step={activeStep.step}>
            <div className="mockup-bar">
              <div className="mockup-dots" aria-hidden="true">
                <div className="mockup-dot red" />
                <div className="mockup-dot yellow" />
                <div className="mockup-dot green" />
              </div>
              <div className="mockup-addr">yummpi.com</div>
            </div>
            {activeImages?.length ? (
              <div className="mockup-img-wrapper">
                <div
                  className="mockup-img-track"
                  style={{
                    width: `${activeImages.length * 100}%`,
                    transform: `translateX(-${slideIndex * (100 / activeImages.length)}%)`,
                  }}>
                  {activeImages.map((image) => (
                    <div
                      className="feature-img-panel"
                      style={{ width: `${100 / activeImages.length}%`, minWidth: `${100 / activeImages.length}%` }}
                      key={image}>
                      <img className="mockup-screenshot" src={image} alt={`${project.title} 화면`} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <img className="mockup-screenshot" src={activeImage} alt={`${project.title} 화면`} />
            )}
          </div>
        </div>

        <div className="featured-project__steps">
          {steps.map((step, index) => (
            <ProjectStep
              articleRef={(node) => { articleRefs.current[index] = node; }}
              slideIndex={activeIndex === index ? slideIndex : 0}
              step={step}
              key={step.step}
            />
          ))}
        </div>
      </div>

      <div className="featured-result">
        <div className="featured-result__inner">
          <div className="featured-result__mockup reveal">
            <img
              className="mockup-screenshot"
              src={project.result.image}
              alt={`${project.title} 프로젝트 결과`}
            />
          </div>
          <div className="featured-result__text reveal d1">
            <div className="project-step__eyebrow">{project.result.eyebrow}</div>
            <div className="project-step__title"><Lines text={project.result.title} /></div>
            <div className="project-step__desc">{project.result.description}</div>
            <ProjectLinks links={project.result.links} />
          </div>
        </div>
      </div>
    </section>
  );
}
