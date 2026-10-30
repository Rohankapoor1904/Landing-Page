import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';

interface ScrollProgressProps {
  progressRef: MutableRefObject<number>;
}

export function ScrollProgress({ progressRef }: ScrollProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progressRef.current})`;
      }
      frame = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(frame);
  }, [progressRef]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-white/10" aria-hidden="true">
      <div ref={barRef} className="h-full w-full origin-left bg-bone" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}

