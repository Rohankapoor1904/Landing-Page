import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import type { MutableRefObject } from 'react';

gsap.registerPlugin(ScrollTrigger);

export type SectionId =
  | 'hero'
  | 'cherrygram'
  | 'bot-suite'
  | 'streamer'
  | 'projects'
  | 'services'
  | 'process'
  | 'contact';

const SECTION_IDS: SectionId[] = [
  'hero',
  'cherrygram',
  'bot-suite',
  'streamer',
  'projects',
  'services',
  'process',
  'contact',
];

export const WORK_SECTIONS: SectionId[] = ['cherrygram', 'bot-suite', 'streamer', 'projects'];

interface SiteScrollApi {
  progressRef: MutableRefObject<number>;
  activeSection: SectionId;
  scrollTo: (sectionId: string) => void;
  setScrollLocked: (locked: boolean) => void;
}

export function useSiteScroll(): SiteScrollApi {
  const progressRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);
  const [activeSection, setActiveSection] = useState<SectionId>('hero');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      prevent: (node) => {
        return (
          node.hasAttribute('data-lenis-prevent') ||
          Boolean(node.closest?.('[data-lenis-prevent]')) ||
          Boolean(node.closest?.('[role="dialog"]'))
        );
      },
    });
    lenisRef.current = lenis;

    const handleScroll = (event: { progress: number }) => {
      progressRef.current = event.progress;
      ScrollTrigger.update();
    };

    lenis.on('scroll', handleScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const triggers = SECTION_IDS.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;
      return ScrollTrigger.create({
        trigger: element,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => {
          if (self.isActive) setActiveSection(id);
        },
      });
    }).filter((trigger): trigger is ScrollTrigger => trigger !== null);

    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh).catch(() => undefined);

    return () => {
      window.removeEventListener('load', refresh);
      triggers.forEach((trigger) => trigger.kill());
      gsap.ticker.remove(tick);
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    if (lenisRef.current) {
      // Lenis already subtracts the element's scroll-margin-top (84px nav clearance).
      // force: scroll still has to run while the mobile menu holds the scroll lock.
      lenisRef.current.scrollTo(target, { duration: 1.35, force: true });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const setScrollLocked = useCallback((locked: boolean) => {
    if (!lenisRef.current) return;
    if (locked) {
      lenisRef.current.stop();
      document.documentElement.style.overflow = 'hidden';
    } else {
      lenisRef.current.start();
      document.documentElement.style.overflow = '';
    }
  }, []);

  return { progressRef, activeSection, scrollTo, setScrollLocked };
}
