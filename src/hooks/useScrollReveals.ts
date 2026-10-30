import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function revealFrom(element: HTMLElement) {
  const direction = element.dataset.reveal;
  const vars: gsap.TweenVars = {
    opacity: 0,
    duration: 1,
    delay: Number(element.dataset.revealDelay ?? 0),
    ease: 'power3.out',
  };

  if (direction === 'left') {
    vars.x = -64;
  } else if (direction === 'right') {
    vars.x = 64;
  } else if (direction === 'scale') {
    vars.y = 28;
    vars.scale = 0.93;
  } else if (direction === 'fade') {
    vars.y = 0;
  } else {
    vars.y = 44;
  }

  return vars;
}

export function useScrollReveals() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          ...revealFrom(element),
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal-lines]').forEach((group) => {
        const lines = group.querySelectorAll<HTMLElement>('[data-reveal-line]');
        if (!lines.length) return;

        gsap.from(lines, {
          yPercent: 120,
          rotate: 2,
          opacity: 0,
          duration: 1.05,
          stagger: 0.09,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 86%',
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
        const direction = group.dataset.revealGroup;
        const vars: gsap.TweenVars = {
          opacity: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: 'power3.out',
        };

        if (direction === 'left') vars.x = -56;
        else if (direction === 'right') vars.x = 56;
        else vars.y = 38;

        gsap.from(Array.from(group.children), {
          ...vars,
          scrollTrigger: {
            trigger: group,
            start: 'top 86%',
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
        const speed = Number(element.dataset.parallax ?? 0.12);
        gsap.fromTo(
          element,
          { yPercent: -speed * 100 },
          {
            yPercent: speed * 100,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-scroll-band]').forEach((band) => {
        const distance = Number(band.dataset.scrollBand ?? 24);
        gsap.fromTo(
          band,
          { xPercent: 0 },
          {
            xPercent: -distance,
            ease: 'none',
            scrollTrigger: {
              trigger: band.parentElement ?? band,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-draw-line]').forEach((element) => {
        gsap.fromTo(
          element,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: element.parentElement ?? element,
              start: 'top 78%',
              end: 'bottom 62%',
              scrub: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((element) => {
        const target = Number(element.dataset.count ?? 0);
        const suffix = element.dataset.suffix ?? '';
        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true,
          },
          onUpdate: () => {
            element.textContent = `${Math.round(counter.value)}${suffix}`;
          },
        });
      });
    });

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 450);

    return () => {
      window.clearTimeout(refreshTimer);
      context.revert();
    };
  }, []);
}
