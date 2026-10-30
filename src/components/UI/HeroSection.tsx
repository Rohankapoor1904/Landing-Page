import { useRef } from 'react';
import type { PointerEvent } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Bot, FileText, Play, Smartphone } from 'lucide-react';
import { SHOWCASE_ACTS } from '../../data/showcaseData';
import { BRAND } from '../../data/brand';
import { RotatingText, ScrambleText } from './AnimatedText';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.085, delayChildren: 0.18 },
  },
};

const item: Variants = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const line: Variants = {
  hidden: { y: '120%', rotate: 2.5, opacity: 0 },
  show: {
    y: '0%',
    rotate: 0,
    opacity: 1,
    transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardIn: Variants = {
  hidden: { opacity: 0, x: 84, rotateY: -18, scale: 0.96 },
  show: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
};

const copyStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.012, delayChildren: 0.1 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const HERO_COPY: { text: string; hot?: boolean }[] = [
  { text: BRAND.name },
  { text: 'builds' },
  { text: 'and' },
  { text: 'runs' },
  { text: 'live' },
  { text: 'software:' },
  { text: 'an', hot: true },
  { text: 'Android', hot: true },
  { text: 'Telegram', hot: true },
  { text: 'client,', hot: true },
  { text: 'a', hot: true },
  { text: 'high-throughput', hot: true },
  { text: 'bot', hot: true },
  { text: 'platform', hot: true },
  { text: 'and' },
  { text: 'a', hot: true },
  { text: 'torrent-to-video', hot: true },
  { text: 'streaming', hot: true },
  { text: 'engine.', hot: true },
  { text: 'Three' },
  { text: 'products,' },
  { text: 'all' },
  { text: 'in' },
  { text: 'production' },
  { text: '—' },
  { text: 'scroll' },
  { text: 'to' },
  { text: 'watch' },
  { text: 'each' },
  { text: 'one' },
  { text: 'work.' },
];

const HERO_ROTATION = ['3 live products', 'Android · bots · AI', 'Shipping worldwide'];

const PRODUCT_ICONS = [Smartphone, Bot, Play];

const STACK = [
  'Android NDK',
  'Kotlin',
  'C++ / JNI',
  'Python',
  'FastAPI',
  'Redis',
  'React Native',
  'Node.js',
  'VLC',
  'BitTorrent',
  'SQLite',
  'Docker',
];

export function HeroSection({ onNavigate, onOpenResume }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.975]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.82], [1, 0.06]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, 104]);
  const cardsX = useTransform(scrollYProgress, [0, 1], [0, 42]);
  const cardsRotate = useTransform(scrollYProgress, [0, 1], [0, 4.5]);
  const cardsOpacity = useTransform(scrollYProgress, [0, 0.86], [1, 0.18]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 190]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useSpring(useTransform(pointerY, [-0.5, 0.5], [7, -7]), {
    stiffness: 140,
    damping: 18,
    mass: 0.35,
  });
  const tiltY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-9, 9]), {
    stiffness: 140,
    damping: 18,
    mass: 0.35,
  });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section ref={heroRef} id="hero" className="relative z-10 overflow-hidden pb-6 pt-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div style={{ y: orbY }} className="absolute inset-0">
          <motion.div
            className="absolute -right-40 top-0 h-[560px] w-[560px] rounded-full bg-white/[0.05] blur-[130px]"
            animate={reduceMotion ? undefined : { scale: [1, 1.16, 1], opacity: [0.55, 0.9, 0.55] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute -left-32 top-1/3 h-[380px] w-[380px] rounded-full bg-white/[0.025] blur-[120px]" />
        </motion.div>
        <motion.div
          style={{ y: gridY }}
          className="screen-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(circle_at_70%_20%,black,transparent_62%)]"
        />
      </div>

      <motion.div
        data-hero-content
        style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
        className="section-shell relative mx-auto flex w-full max-w-[1400px] flex-col justify-center py-4 lg:min-h-[calc(100svh-12rem)]"
      >
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="min-w-0 lg:col-span-7"
          >
            <motion.div variants={item} className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="flex items-center gap-2 rounded-full border border-line bg-panel/70 px-3 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <ScrambleText
                  className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone"
                  text={`${BRAND.name} · Open for projects`}
                  delay={350}
                  duration={1100}
                />
              </span>
              <RotatingText
                words={HERO_ROTATION}
                className="font-mono text-[9px] uppercase tracking-[0.18em] text-dim"
              />
            </motion.div>

            <h1 className="mt-7 text-[clamp(3.2rem,8.4vw,7.4rem)] font-medium leading-[0.88] tracking-[-0.055em] text-bone">
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span variants={line} initial="hidden" animate="show" className="block">
                  Products,
                </motion.span>
              </span>
              <span className="mt-1 block overflow-hidden pb-[0.08em]">
                <motion.span
                  variants={line}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.12 }}
                  className="text-shimmer block font-serif font-normal italic tracking-[-0.035em]"
                >
                  not portfolios.
                </motion.span>
              </span>
            </h1>

            <motion.p variants={copyStagger} className="mt-8 max-w-xl text-base leading-relaxed text-ash sm:text-lg">
              {HERO_COPY.map((token, index) => (
                <span key={`${token.text}-${index}`}>
                  <motion.span variants={word} className={token.hot ? 'inline-block text-bone' : 'inline-block'}>
                    {token.text}
                  </motion.span>
                  {index < HERO_COPY.length - 1 ? ' ' : ''}
                </span>
              ))}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('cherrygram')}
                className="group inline-flex items-center gap-2.5 rounded-full bg-bone px-6 py-3.5 text-xs font-semibold text-ink transition-colors duration-300 hover:bg-white"
              >
                See the three products
                <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="group inline-flex items-center gap-2.5 rounded-full border border-line-strong px-6 py-3.5 text-xs font-semibold text-bone transition-colors duration-300 hover:border-bone"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </motion.div>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                type="button"
                onClick={onOpenResume}
                className="group inline-flex items-center gap-2 text-xs text-ash transition-colors hover:text-bone"
              >
                <FileText className="h-3.5 w-3.5" />
                <span className="relative block overflow-hidden leading-snug">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                    Founder&apos;s résumé
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 block translate-y-full text-bone transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                  >
                    Open résumé
                  </span>
                </span>
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <span className="hidden h-3 w-px bg-line sm:block" />
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-dim">
                Remote · India · Worldwide
              </span>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-11 grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 border-t border-line pt-7 sm:grid-cols-4"
            >
              {[
                { value: '3', label: 'Live products' },
                { value: '6+', label: 'Shipped builds' },
                { value: '99.98%', label: 'Bot uptime' },
                { value: '120Hz', label: 'Client refresh' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-mono text-xl leading-none text-bone">{stat.value}</p>
                  <p className="mt-2 font-mono text-[9px] uppercase leading-tight tracking-[0.12em] text-dim">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            data-hero-cards
            style={{ y: cardsY, x: cardsX, rotate: cardsRotate, opacity: cardsOpacity }}
            className="min-w-0 lg:col-span-5 lg:pl-8"
          >
            <motion.div
              onPointerMove={handlePointerMove}
              onPointerLeave={resetPointer}
              style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
              className="[transform-style:preserve-3d]"
            >
              <div className="mb-4 flex items-center justify-between">
                <ScrambleText className="label" text="Live products" delay={600} />
                <ScrambleText
                  className="font-mono text-[9px] uppercase tracking-[0.16em] text-dim"
                  text="01 — 03"
                  delay={780}
                />
              </div>

              <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
                {SHOWCASE_ACTS.map((act, index) => {
                  const Icon = PRODUCT_ICONS[index];
                  return (
                    <motion.div
                      key={act.id}
                      data-hero-card
                      variants={cardIn}
                      transition={{ duration: 0.95, delay: 0.4 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <motion.div
                        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
                        transition={{
                          duration: 5.5 + index * 0.8,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 1.6 + index * 0.3,
                        }}
                      >
                        <motion.button
                          type="button"
                          whileHover={{ x: -5 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => onNavigate(act.id)}
                          className="group relative w-full min-w-0 overflow-hidden rounded-xl border border-line bg-panel/90 p-4 text-left transition-colors duration-300 hover:border-line-strong"
                        >
                          <span
                            className="absolute inset-y-0 left-0 w-[2px]"
                            style={{ backgroundColor: act.accent }}
                            aria-hidden="true"
                          />
                          <div className="flex items-center justify-between gap-3 pl-2">
                            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-dim">
                              {act.index} / {act.category}
                            </span>
                            <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ash">
                              <span
                                className="h-1 w-1 rounded-full"
                                style={{ backgroundColor: act.accent }}
                              />
                              {act.status}
                            </span>
                          </div>

                          <div className="mt-3 flex items-center gap-4 pl-2">
                            <span
                              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line"
                              style={{ backgroundColor: act.accentSoft, color: act.accent }}
                            >
                              <Icon className="h-5 w-5" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-base font-semibold tracking-tight text-bone">
                                {act.product}
                              </span>
                              <span className="mt-0.5 block text-xs leading-snug text-ash line-clamp-2">
                                {act.tagline}
                              </span>
                            </span>
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3 pl-2">
                            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-dim">
                              {act.metrics[0].label}
                            </span>
                            <span className="font-mono text-[10px] text-bone">{act.metrics[0].value}</span>
                          </div>
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="mt-4 flex items-center justify-end gap-2 text-right font-mono text-[9px] uppercase tracking-[0.16em] text-dim"
              >
                <motion.span
                  className="h-px w-8 origin-right bg-line-strong"
                  animate={reduceMotion ? undefined : { scaleX: [0.3, 1, 0.3] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                Scroll — each product plays out as you go
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="section-shell relative mx-auto mt-6 w-full max-w-[1400px]">
        <div className="mt-5 hidden items-center gap-5 border-t border-line pt-4 [@media(min-height:801px)]:flex">
          <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-dim">Stack</span>
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <div className="marquee-track flex w-max items-center">
              {[...STACK, ...STACK].map((tech, index) => (
                <span
                  key={`${tech}-${index}`}
                  className="flex items-center gap-5 pr-5 font-mono text-[9px] uppercase tracking-[0.16em] text-dim"
                >
                  {tech}
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                </span>
              ))}
            </div>
          </div>
          <span className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-dim sm:block">
            Scroll to explore
          </span>
          <motion.span
            animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDownRight className="h-4 w-4 shrink-0 text-dim" />
          </motion.span>
        </div>
      </div>
    </section>
  );
}
