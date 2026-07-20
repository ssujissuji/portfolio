import type { ReactNode } from 'react';

export function Divider() {
  return <div className="divider" />;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="sec-head reveal">
      <div className="sec-eyebrow">{eyebrow}</div>
      <div className="sec-title">{title}</div>
      <div className="sec-sub">{subtitle}</div>
    </div>
  );
}

export function Lines({ text }: { text: string }) {
  return text.split('\n').map((line, index) => (
    <span key={`${line}-${index}`}>
      {index > 0 && <br />}
      {line}
    </span>
  ));
}

export function Icon({ name }: { name: string }) {
  return <i className={`ti ${name}`} aria-hidden="true" />;
}

export function ExternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const isExternal = href.startsWith('http');

  return (
    <a
      className={className}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}>
      {children}
    </a>
  );
}
