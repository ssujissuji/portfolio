import { useEffect, useState } from 'react';
import type { PortfolioContent } from '../content';

type IntroLine = PortfolioContent['intro'][number];

export function Intro({ lines }: { lines: IntroLine[] }) {
  const [rendered, setRendered] = useState(() => lines.map(() => ''));
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    let lineIndex = 0;
    let charIndex = 0;

    const tick = () => {
      const line = lines[lineIndex];

      if (charIndex <= line.text.length) {
        setRendered((current) =>
          current.map((text, index) =>
            index === lineIndex ? line.text.slice(0, charIndex) : text,
          ),
        );
        charIndex += 1;
        timers.push(window.setTimeout(tick, charIndex === 1 ? 180 : 46));
        return;
      }

      if (lineIndex < lines.length - 1) {
        lineIndex += 1;
        charIndex = 0;
        timers.push(window.setTimeout(tick, 360));
        return;
      }

      timers.push(window.setTimeout(() => setIsComplete(true), 500));
    };

    timers.push(window.setTimeout(tick, 300));
    return () => timers.forEach(window.clearTimeout);
  }, [lines]);

  return (
    <div className="intro">
      <div className="typing-copy" aria-label={lines.map((line) => line.text).join(' ')}>
        {rendered.map((text, index) => (
          <span key={lines[index].text} className={lines[index].accent ? 'accent' : undefined}>
            {index > 0 && text.length > 0 && <br />}
            {text}
          </span>
        ))}
        <span className={`caret${isComplete ? ' blink' : ''}`} />
      </div>
      <div className={`intro-bottom${isComplete ? ' show' : ''}`}>
        <span className="intro-sub">scroll</span>
        <div className="scroll-line" />
      </div>
    </div>
  );
}
