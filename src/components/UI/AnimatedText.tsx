import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789—/+·';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export function ScrambleText({ text, className, delay = 0, duration = 850 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (!inView || reduce) return;

    const chars = text.split('');
    const resolvable = Math.max(1, chars.filter((char) => char !== ' ').length);
    const start = performance.now() + delay;

    const id = window.setInterval(() => {
      const now = performance.now();
      if (now < start) {
        setOutput(
          chars
            .map((char) => (char === ' ' ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join(''),
        );
        return;
      }

      const progress = Math.min(1, (now - start) / duration);
      const resolved = Math.floor(progress * resolvable);
      let seen = 0;
      setOutput(
        chars
          .map((char) => {
            if (char === ' ') return char;
            const done = seen < resolved;
            seen += 1;
            return done ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(''),
      );

      if (progress >= 1) {
        window.clearInterval(id);
        setOutput(text);
      }
    }, 30);

    return () => window.clearInterval(id);
  }, [inView, reduce, text, delay, duration]);

  return (
    <span ref={ref} className={className}>
      {output}
    </span>
  );
}

interface WordStreamProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function WordStream({ text, className, delay = 0, stagger = 0.012 }: WordStreamProps) {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  return (
    <motion.span
      className={className}
      initial={reduce ? false : 'hidden'}
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <motion.span
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: 12, filter: 'blur(5px)' },
              show: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </motion.span>
  );
}

interface RotatingTextProps {
  words: string[];
  interval?: number;
  className?: string;
}

export function RotatingText({ words, interval = 2800, className }: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '');

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [interval, reduce, words.length]);

  return (
    <span className={`relative inline-flex overflow-hidden align-bottom [perspective:600px] ${className ?? ''}`}>
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        {longest}
      </span>
      <span className="absolute inset-0 flex items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[index]}
            initial={reduce ? false : { y: '115%', opacity: 0, rotateX: 45 }}
            animate={{ y: '0%', opacity: 1, rotateX: 0 }}
            exit={reduce ? undefined : { y: '-115%', opacity: 0, rotateX: -45 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="whitespace-nowrap"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
