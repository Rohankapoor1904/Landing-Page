import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Activity,
  BatteryFull,
  Bot,
  Cast,
  Database,
  Download,
  EyeOff,
  Layers,
  Lock,
  Maximize2,
  Mic,
  Paperclip,
  Play,
  Radio,
  Search,
  Server,
  Signal,
  Terminal,
  Users,
  Volume2,
  Wifi,
  Zap,
} from 'lucide-react';
import type { ShowcaseAct } from '../../data/showcaseData';
import { SHOWCASE_ACTS } from '../../data/showcaseData';
import { PROJECTS_DATA } from '../../data/projectsData';
import type { Project } from '../../types';
import { GithubIcon } from './GithubIcon';
import { ScrambleText } from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

interface WorkActsProps {
  onOpenProject?: (project: Project) => void;
}

export function WorkActs({ onOpenProject }: WorkActsProps) {
  return (
    <div className="relative">
      <div className="relative overflow-hidden border-t border-line py-10 sm:py-14">
        <div className="section-shell mx-auto flex w-full max-w-[1400px] items-end justify-between gap-6">
          <ScrambleText className="label" text="The work — 01 / 03" />
          <ScrambleText className="label hidden sm:block" text="Three products, all live" delay={140} />
        </div>

        <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_7%,black_93%,transparent)]">
          <div
            data-scroll-band="8"
            className="flex w-max items-center gap-10 whitespace-nowrap pl-5 will-change-transform sm:gap-14 sm:pl-8"
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-10 sm:gap-14" aria-hidden={copy === 1}>
                {SHOWCASE_ACTS.map((act) => (
                  <span key={`${copy}-${act.id}`} className="flex items-center gap-6 sm:gap-9">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{act.index}</span>
                    <span className="text-[clamp(2.4rem,5.6vw,5.2rem)] font-medium uppercase leading-none tracking-[-0.045em] text-transparent [-webkit-text-stroke:1px_rgba(248,248,246,0.2)]">
                      {act.product}
                    </span>
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: act.accent }}
                    />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="section-shell mx-auto mt-7 flex w-full max-w-[1400px] items-center gap-4">
          <span className="h-px flex-1 bg-line" />
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-dim">
            Scroll to open product 01
          </span>
        </div>
      </div>

      {SHOWCASE_ACTS.map((act) => (
        <ActSection key={act.id} act={act} onOpenProject={onOpenProject} />
      ))}
    </div>
  );
}

function ActSection({
  act,
  onOpenProject,
}: {
  act: ShowcaseAct;
  onOpenProject?: (project: Project) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const steps = gsap.utils.toArray<HTMLElement>('[data-act-step]', section);
      const visual = section.querySelector<HTMLElement>('[data-act-visual]');
      const chips = gsap.utils.toArray<HTMLElement>('[data-chip]', section);
      const marks = gsap.utils.toArray<HTMLElement>('[data-step-mark]', section);
      const layer2 = gsap.utils.toArray<HTMLElement>('[data-visual-layer="2"]', section);
      const layer3 = gsap.utils.toArray<HTMLElement>('[data-visual-layer="3"]', section);
      const ghosts = gsap.utils.toArray<HTMLElement>('[data-visual-ghost]', section);
      const watermark = section.querySelector<HTMLElement>('[data-act-watermark]');

      if (steps.length < 3 || !visual) return;

      gsap.set(steps.slice(1), { opacity: 0, x: 54, y: 20 });
      gsap.set(chips, { opacity: 0, x: 30, y: 8 });
      gsap.set(layer2, { opacity: 0, y: 24, scale: 0.97 });
      gsap.set(layer3, { opacity: 0, y: 24, scale: 0.97 });
      gsap.set(ghosts, { opacity: 0.4 });

      if (watermark) {
        gsap.fromTo(
          watermark,
          { yPercent: 12, xPercent: 4, rotate: -3 },
          {
            yPercent: -12,
            xPercent: -4,
            rotate: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          },
        );
      }

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      tl.fromTo(
        visual,
        { rotateY: -20, rotateX: 5, y: 26, scale: 0.94 },
        { rotateY: 0, rotateX: 0, y: 0, scale: 1, duration: 1 },
        0,
      );

      tl.to(steps[0], { opacity: 0, x: -46, y: -18, duration: 0.3 }, 0.38);
      tl.to(visual, { rotateY: 12, rotateX: -2, x: -22, duration: 0.6 }, 0.38);
      tl.to(steps[1], { opacity: 1, x: 0, y: 0, duration: 0.32 }, 0.5);
      tl.to(chips, { opacity: 1, x: 0, y: 0, duration: 0.32, stagger: 0.06 }, 0.56);
      tl.to(layer2, { opacity: 1, y: 0, scale: 1, duration: 0.34, stagger: 0.05 }, 0.5);
      tl.to(ghosts, { opacity: 1, duration: 0.32 }, 0.5);
      tl.to(marks[0], { backgroundColor: 'rgba(248, 248, 246, 0.16)', duration: 0.25 }, 0.38);
      tl.to(marks[1], { backgroundColor: act.accent, duration: 0.25 }, 0.5);

      tl.to(steps[1], { opacity: 0, x: -46, y: -18, duration: 0.3 }, 1);
      tl.to(visual, { rotateY: -9, rotateX: 2, x: 20, scale: 1.02, duration: 0.6 }, 1);
      tl.to(steps[2], { opacity: 1, x: 0, y: 0, duration: 0.32 }, 1.12);
      tl.to(layer3, { opacity: 1, y: 0, scale: 1, duration: 0.34 }, 1.1);
      tl.to(marks[1], { backgroundColor: 'rgba(248, 248, 246, 0.16)', duration: 0.25 }, 1);
      tl.to(marks[2], { backgroundColor: act.accent, duration: 0.25 }, 1.12);

      return () => {
        gsap.set(steps, { clearProps: 'all' });
        gsap.set(visual, { clearProps: 'all' });
        gsap.set(chips, { clearProps: 'all' });
        gsap.set(marks, { clearProps: 'all' });
        gsap.set(layer2, { clearProps: 'all' });
        gsap.set(layer3, { clearProps: 'all' });
        gsap.set(ghosts, { clearProps: 'all' });
        if (watermark) gsap.set(watermark, { clearProps: 'all' });
      };
    });

    return () => mm.revert();
  }, [act.accent]);

  return (
    <section
      ref={sectionRef}
      id={act.id}
      aria-labelledby={`${act.id}-title`}
      className="relative border-t border-line"
    >
      {/* Desktop: sticky stage with scroll-scrubbed choreography */}
      <div className="relative hidden lg:block lg:h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden" aria-hidden="true">
            <span
              data-act-watermark
              className="select-none pr-10 font-serif text-[clamp(14rem,28vw,28rem)] italic leading-none text-white/[0.04]"
            >
              {act.index}
            </span>
          </div>

          <div className="section-shell relative mx-auto w-full max-w-[1400px] pb-6 pt-24">
            <div className="grid grid-cols-12 items-center gap-10">
              <div className="col-span-5">
                <div className="flex items-center justify-between gap-4" data-reveal>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                    Product {act.index} / 03
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ash">
                    <span className="h-1 w-1 rounded-full" style={{ backgroundColor: act.accent }} />
                    {act.status}
                  </span>
                </div>

                <h2
                  id={`${act.id}-title`}
                  className="mt-4 text-[clamp(2.2rem,3.6vw,3.4rem)] font-medium leading-[0.95] tracking-[-0.045em] text-bone"
                  data-reveal-lines
                >
                  <span className="block overflow-hidden pb-[0.08em]">
                    <span data-reveal-line className="block">
                      {act.product}
                    </span>
                  </span>
                </h2>
                <p
                  className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-dim"
                  data-reveal
                >
                  {act.platform} · {act.version}
                </p>

                <div className="relative mt-8 h-[clamp(300px,42vh,360px)]">
                  {act.steps.map((step, index) => (
                    <div
                      key={step.title}
                      data-act-step
                      className="absolute inset-0"
                      style={{ opacity: index === 0 ? 1 : 0 }}
                    >
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.2em]"
                        style={{ color: act.accent }}
                      >
                        {step.kicker}
                      </span>
                      <h3 className="mt-3 max-w-md text-[clamp(1.35rem,1.9vw,1.9rem)] font-medium leading-[1.15] tracking-[-0.025em] text-bone">
                        {step.title}
                      </h3>
                      <p className="mt-3.5 max-w-md text-sm leading-relaxed text-ash">{step.body}</p>

                      <ul className="mt-4 space-y-2">
                        {step.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2.5 text-xs leading-relaxed text-ash">
                            <span
                              className="mt-[6px] h-1 w-1 shrink-0 rounded-full"
                              style={{ backgroundColor: act.accent }}
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      {index === 2 && (
                        <div className="mt-5 flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const matchId =
                                act.id === 'cherrygram'
                                  ? 'cherrygram-plus'
                                  : act.id === 'bot-suite'
                                  ? 'official-bot-suite'
                                  : 'adm-streamer';
                              const match = PROJECTS_DATA.find((p) => p.id === matchId);
                              if (match && onOpenProject) onOpenProject(match);
                            }}
                            className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-semibold text-ink transition-transform hover:scale-[1.02]"
                            style={{ backgroundColor: act.accent }}
                          >
                            <Layers className="h-3.5 w-3.5" />
                            Case Study &amp; Specs
                          </button>
                          <a
                            href={act.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-2 text-[11px] font-medium text-bone transition-colors hover:border-bone"
                          >
                            <GithubIcon className="h-3.5 w-3.5" />
                            Source
                          </a>
                          {act.releaseUrl && (
                            <a
                              href={act.releaseUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-2 text-[11px] font-medium text-bone transition-colors hover:border-bone"
                            >
                              <Download className="h-3.5 w-3.5" />
                              Releases
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex gap-1.5" aria-hidden="true">
                    {act.steps.map((step, index) => (
                      <span
                        key={step.title}
                        data-step-mark
                        className="h-[2px] w-7 origin-left"
                        style={{ backgroundColor: index === 0 ? act.accent : 'rgba(248, 248, 246, 0.16)' }}
                      />
                    ))}
                  </div>
                  <div className="ml-2 h-px flex-1 bg-line">
                    <div
                      ref={barRef}
                      className="h-full w-full origin-left"
                      style={{ backgroundColor: act.accent, transform: 'scaleX(0)' }}
                    />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-dim">Scroll</span>
                </div>
              </div>

              <div className="col-span-7">
                <div className="flex justify-center [perspective:1500px]">
                  <div data-act-visual className="relative w-full max-w-[640px]">
                    <ActVisual act={act} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked, no pinning */}
      <div className="lg:hidden">
        <div className="section-shell mx-auto w-full max-w-[1400px] py-16 sm:py-20">
          <div className="flex items-center justify-between gap-4" data-reveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
              Product {act.index} / 03
            </span>
            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ash">
              <span className="h-1 w-1 rounded-full" style={{ backgroundColor: act.accent }} />
              {act.status}
            </span>
          </div>

          <h2
            id={`${act.id}-mobile-title`}
            className="mt-4 text-[clamp(2.2rem,8vw,3rem)] font-medium leading-[0.95] tracking-[-0.045em] text-bone"
            data-reveal
          >
            {act.product}
          </h2>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-dim" data-reveal>
            {act.platform} · {act.version}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ash" data-reveal>
            {act.summary}
          </p>

          <div className="mt-8 flex justify-center overflow-hidden" data-reveal>
            <ActVisual act={act} compact />
          </div>

          <div className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line" data-reveal>
            {act.metrics.map((metric) => (
              <div key={metric.label} className="bg-panel p-4">
                <span className="block font-mono text-[8px] uppercase tracking-[0.14em] text-dim">
                  {metric.label}
                </span>
                <span className="mt-1.5 block text-sm text-bone">{metric.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-9 space-y-7" data-reveal-group>
            {act.steps.map((step, index) => (
              <div key={step.title} className="border-t border-line pt-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: act.accent }}>
                  0{index + 1} — {step.kicker}
                </span>
                <h3 className="mt-2 text-lg font-medium leading-snug tracking-tight text-bone">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">{step.body}</p>
                <ul className="mt-3 space-y-1.5">
                  {step.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 text-xs leading-relaxed text-ash">
                      <span
                        className="mt-[6px] h-1 w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: act.accent }}
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2" data-reveal>
            {act.stack.map((tech) => (
              <span key={tech} className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-ash">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3" data-reveal>
            <button
              type="button"
              onClick={() => {
                const matchId =
                  act.id === 'cherrygram'
                    ? 'cherrygram-plus'
                    : act.id === 'bot-suite'
                    ? 'official-bot-suite'
                    : 'adm-streamer';
                const match = PROJECTS_DATA.find((p) => p.id === matchId);
                if (match && onOpenProject) onOpenProject(match);
              }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold text-ink"
              style={{ backgroundColor: act.accent }}
            >
              <Layers className="h-4 w-4" />
              Case Study &amp; Specs
            </button>
            <a
              href={act.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-xs font-medium text-bone"
            >
              <GithubIcon className="h-4 w-4" />
              Source
            </a>
            {act.releaseUrl && (
              <a
                href={act.releaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-xs font-medium text-bone"
              >
                <Download className="h-4 w-4" />
                Releases
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ActVisual({ act, compact = false }: { act: ShowcaseAct; compact?: boolean }) {
  if (act.visual === 'phone') return <PhoneMockup act={act} compact={compact} />;
  if (act.visual === 'console') return <BotConsole act={act} />;
  return <StreamPlayer act={act} />;
}

function FloatingChip({ label, accent }: { label: string; accent: string }) {
  return (
    <div
      data-chip
      className="act-chip flex items-center gap-2 rounded-full px-3 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-bone"
    >
      <span className="h-1 w-1 rounded-full" style={{ backgroundColor: accent }} />
      {label}
    </div>
  );
}

function PhoneMockup({ act, compact }: { act: ShowcaseAct; compact?: boolean }) {
  return (
    <div className="flex items-center gap-5 sm:gap-7">
      <div
        className={`relative shrink-0 rounded-[2.6rem] border border-line-strong bg-[#050608] p-[7px] shadow-[0_60px_120px_-45px_rgba(0,0,0,0.95)] ${
          compact ? 'h-[min(58vh,460px)]' : 'h-[min(68vh,540px)]'
        } aspect-[9/19]`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[2.15rem] bg-[#0b0d12]">
          <div className="screen-grid pointer-events-none absolute inset-0 opacity-[0.16]" />

          <div className="relative flex h-full flex-col">
            <div className="flex items-center justify-between px-5 pt-3 font-mono text-[8px] text-ash">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <Signal className="h-2.5 w-2.5" />
                <Wifi className="h-2.5 w-2.5" />
                <BatteryFull className="h-3 w-3" />
              </span>
            </div>

            <div className="mt-4 flex items-center gap-3 px-4">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-ink"
                style={{ backgroundColor: act.accent }}
              >
                C
              </div>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-bone">Cherrygram Plus</p>
                <p className="font-mono text-[8px] text-dim">10.19.18 · 120 Hz</p>
              </div>
              <Search className="ml-auto h-3.5 w-3.5 text-ash" />
            </div>

            <div
              className="mx-3 mt-4 flex items-center justify-between rounded-lg border px-3 py-2"
              style={{ borderColor: 'rgba(251, 113, 133, 0.35)', backgroundColor: 'rgba(251, 113, 133, 0.08)' }}
            >
              <span className="flex items-center gap-2 text-[9px] text-bone">
                <EyeOff className="h-3 w-3" style={{ color: act.accent }} />
                Ghost mode 2.0
              </span>
              <span
                className="flex h-3.5 w-6 items-center rounded-full p-0.5"
                style={{ backgroundColor: act.accent }}
              >
                <span className="ml-auto h-2.5 w-2.5 rounded-full bg-ink" />
              </span>
            </div>

            <div className="mt-4 flex flex-1 flex-col justify-end space-y-2 px-3">
              <div className="max-w-[84%] rounded-xl rounded-bl-sm border border-line bg-panel px-3 py-2">
                <p className="text-[9px] leading-relaxed text-ash">
                  Release v10.19.18 is live — arm64, v7a and universal.
                </p>
              </div>

              <div className="ml-auto max-w-[72%] rounded-xl rounded-br-sm border border-line bg-panel-2 px-3 py-2">
                <p className="text-[9px] leading-relaxed text-ash">Pulled. 120Hz build feels fast.</p>
              </div>

              <div
                data-visual-layer="2"
                className="max-w-[80%] rounded-xl rounded-bl-sm border border-line bg-panel px-3 py-2"
              >
                <p className="text-[9px] leading-relaxed text-ash line-through [text-decoration-color:rgba(251,113,133,0.7)]">
                  Deleted this message · 12s ago
                </p>
                <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.1em]" style={{ color: act.accent }}>
                  Retained by anti-delete
                </p>
              </div>

              <div
                data-visual-layer="2"
                className="ml-auto max-w-[80%] rounded-xl rounded-br-sm px-3 py-2 text-[9px] leading-relaxed text-ink"
                style={{ backgroundColor: act.accent }}
              >
                Kept it. Try deleting again.
              </div>

              <div
                data-visual-layer="2"
                className="max-w-[88%] overflow-hidden rounded-xl rounded-bl-sm border border-line bg-panel"
              >
                <div
                  className="h-12 w-full"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 20%, rgba(251,113,133,0.55), transparent 55%), linear-gradient(135deg, #1b1e28, #0d0f15)',
                  }}
                />
                <p className="px-3 py-2 text-[8px] text-ash">Album · 4 items · original quality</p>
              </div>

              <div
                data-visual-layer="2"
                className="max-w-[72%] rounded-xl rounded-bl-sm border border-line bg-panel px-3 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <Play className="h-3 w-3" style={{ color: act.accent }} />
                  <span className="flex items-end gap-[2px]">
                    {[5, 9, 6, 12, 8, 14, 7, 10, 5, 9, 12, 6].map((h, index) => (
                      <span
                        key={index}
                        className="w-[2px] rounded-full bg-ash/70"
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </span>
                  <span className="ml-auto font-mono text-[7px] text-dim">0:38</span>
                </div>
              </div>
            </div>

            <div className="m-3 flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-2">
              <Paperclip className="h-3 w-3 text-ash" />
              <span className="flex-1 text-[9px] text-dim">Message</span>
              <Mic className="h-3 w-3 text-ash" />
            </div>
          </div>

          <div
            data-visual-layer="3"
            className="absolute inset-x-3 bottom-3 hidden rounded-xl border bg-[#0f1116]/95 p-2.5 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)] backdrop-blur lg:block"
            style={{ borderColor: 'rgba(251, 113, 133, 0.35)' }}
          >
            <div className="flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.1em]">
              <span className="flex items-center gap-1.5 text-ash">
                <Download className="h-2.5 w-2.5" style={{ color: act.accent }} />
                signed build
              </span>
              <span className="text-bone">arm64-v8a · 34.2 MB</span>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[86%] rounded-full" style={{ backgroundColor: act.accent }} />
            </div>
            <p className="mt-1.5 font-mono text-[7px] text-dim">installing 10.19.18 · 86%</p>
          </div>

          <div className="absolute left-1/2 top-[7px] h-[18px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>

      <div className="hidden flex-col gap-2.5 lg:flex">
        {act.chips.map((chip) => (
          <FloatingChip key={chip} label={chip} accent={act.accent} />
        ))}
      </div>
    </div>
  );
}

function BotConsole({ act }: { act: ShowcaseAct }) {
  return (
    <div className="relative mx-auto w-[min(100%,540px)]">
      <div className="overflow-hidden rounded-xl border border-line-strong bg-panel shadow-[0_50px_120px_-50px_rgba(0,0,0,0.95)]">
        <div className="flex h-9 items-center gap-2 border-b border-line bg-ink-soft px-3">
          <span className="h-2 w-2 rounded-full bg-[#f87171]" />
          <span className="h-2 w-2 rounded-full bg-[#fbbf24]" />
          <span className="h-2 w-2 rounded-full bg-[#34d399]" />
          <span className="ml-3 font-mono text-[8px] uppercase tracking-[0.14em] text-dim">
            official-bot / control room
          </span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-ash">
            <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
            live
          </span>
        </div>

        <div className="flex">
          <aside className="hidden w-32 shrink-0 border-r border-line p-3 sm:block">
            <div className="flex items-center gap-2">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-md border border-line"
                style={{ backgroundColor: act.accentSoft, color: act.accent }}
              >
                <Bot className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[9px] font-semibold text-bone">Official Bot</p>
                <p className="font-mono text-[7px] text-dim">v4.2.0</p>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              {[
                { label: 'Overview', icon: Activity, active: true },
                { label: 'Locks', icon: Lock },
                { label: 'Broadcast', icon: Radio },
                { label: 'Moderation', icon: Users },
                { label: 'Logs', icon: Terminal },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[9px] ${
                    item.active ? 'text-bone' : 'text-dim'
                  }`}
                  style={item.active ? { backgroundColor: act.accentSoft } : undefined}
                >
                  <item.icon className="h-3 w-3" />
                  {item.label}
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-line pt-3">
              <div className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.1em] text-dim">
                <Database className="h-2.5 w-2.5" />
                redis
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[72%]" style={{ backgroundColor: act.accent }} />
              </div>
              <p className="mt-1 font-mono text-[7px] text-dim">queue 12 · 1.8ms</p>
            </div>
          </aside>

          <div className="min-w-0 flex-1 p-3.5">
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Uptime', value: '99.98%' },
                { label: 'Throughput', value: '1.2k/s' },
                { label: 'Cache', value: '1.8ms' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-md border border-line bg-ink-soft p-2">
                  <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-dim">{stat.label}</p>
                  <p className="mt-1 font-mono text-xs text-bone">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="relative mt-3 overflow-hidden rounded-md border border-line bg-[#080a0e] p-3 font-mono text-[8px] leading-[1.9]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-10 scan-line bg-gradient-to-b from-transparent to-transparent" />
              <div data-visual-ghost>
                <p className="text-dim">
                  <span className="text-ash">14:02:11</span> <span style={{ color: act.accent }}>/lock on</span> · group
                  1204 armed
                </p>
                <p className="text-dim">
                  <span className="text-ash">14:02:12</span> kicked <span className="text-bone">@spam_bot</span> · 1
                  invite neutralised
                </p>
                <p className="text-dim">
                  <span className="text-ash">14:02:13</span> terabox stream <span className="text-bone">ready</span> ·
                  ffmpeg worker 3
                </p>
                <p className="text-dim">
                  <span className="text-ash">14:02:13</span> broadcast cycle queued ·{' '}
                  <span className="text-bone">2,140</span> chats
                </p>
                <p className="text-dim">
                  <span className="text-ash">14:02:14</span> api <span className="text-bone">healthy</span> · redis pong
                  0.9ms
                </p>
              </div>
            </div>

            <div
              data-visual-layer="2"
              className="mt-3 flex items-center gap-2 rounded-md border border-line bg-ink-soft px-3 py-2"
            >
              <span className="font-mono text-[9px]" style={{ color: act.accent }}>
                /
              </span>
              <span className="font-mono text-[8px] text-ash">dwarn @spammer reason</span>
              <span className="caret ml-auto h-3 w-[1px] bg-bone" />
            </div>

            <div
              data-visual-layer="3"
              className="mt-2.5 flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.1em] text-dim"
            >
              <span className="flex items-center gap-1.5">
                <Server className="h-2.5 w-2.5" />
                fastapi · 4 workers
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-2.5 w-2.5" />
                18,402 members
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-2.5 w-2.5" style={{ color: act.accent }} />
                1,204 msg/s
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 hidden flex-wrap justify-center gap-2 lg:flex">
        {act.chips.slice(0, 3).map((chip) => (
          <FloatingChip key={chip} label={chip} accent={act.accent} />
        ))}
      </div>
    </div>
  );
}

function StreamPlayer({ act }: { act: ShowcaseAct }) {
  return (
    <div className="relative mx-auto w-[min(100%,550px)]">
      <div className="overflow-hidden rounded-xl border border-line-strong bg-panel shadow-[0_50px_120px_-50px_rgba(0,0,0,0.95)]">
        <div className="relative aspect-video overflow-hidden bg-[#07080c]">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 70% 30%, rgba(129,140,248,0.42), transparent 48%), radial-gradient(circle at 18% 80%, rgba(34,211,238,0.18), transparent 42%), linear-gradient(150deg, #151827, #07080c 65%)',
            }}
          />
          <div className="screen-grid absolute inset-0 opacity-20" />
          <div
            className="scan-line pointer-events-none absolute inset-x-0 top-0 h-16 opacity-40"
            style={{ background: `linear-gradient(180deg, transparent, ${act.accent}44, transparent)` }}
          />

          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            <span className="rounded-full border border-line-strong bg-ink/70 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.12em] text-bone">
              torrent
            </span>
            <span
              className="rounded-full px-2 py-1 font-mono text-[7px] uppercase tracking-[0.12em] text-ink"
              style={{ backgroundColor: act.accent }}
            >
              real-debrid · 4k
            </span>
          </div>

          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-line-strong bg-ink/70 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.12em] text-ash">
            <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
            24.8 mb/s
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/40 text-bone backdrop-blur">
              <Play className="ml-0.5 h-5 w-5" />
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2.5 pt-8">
            <p className="text-[11px] font-semibold text-bone">Dune: Part Two</p>
            <p className="font-mono text-[8px] text-ash">4K HDR · 3h 46m · hardware decode</p>
          </div>
        </div>

        <div className="p-3.5">
          <div className="relative h-1 w-full rounded-full bg-white/12">
            <div className="absolute inset-y-0 left-0 w-[72%] rounded-full bg-white/25" />
            <div
              className="absolute inset-y-0 left-0 w-[28%] rounded-full"
              style={{ backgroundColor: act.accent }}
            />
            <span
              className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-bone shadow"
              style={{ left: '28%' }}
            />
          </div>

          <div className="mt-3 flex items-center gap-3 text-ash">
            <Play className="h-3.5 w-3.5 text-bone" />
            <Volume2 className="h-3.5 w-3.5" />
            <span className="font-mono text-[8px] text-dim">00:42:18 / 03:46:02</span>
            <span className="ml-auto flex items-center gap-3">
              <Cast className="h-3.5 w-3.5" />
              <Maximize2 className="h-3.5 w-3.5" />
            </span>
          </div>

          <div
            data-visual-ghost
            className="mt-3 grid grid-cols-3 gap-2 border-t border-line pt-3"
          >
            {[
              { label: 'Torrentio', value: '14 seeds' },
              { label: 'Real-Debrid', value: 'instant' },
              { label: 'AllDebrid', value: 'ready' },
            ].map((source) => (
              <div key={source.label} className="rounded-md border border-line bg-ink-soft px-2.5 py-2">
                <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-dim">{source.label}</p>
                <p className="mt-0.5 text-[9px] text-bone">{source.value}</p>
              </div>
            ))}
          </div>

          <div
            data-visual-layer="3"
            className="mt-2.5 flex items-center justify-between rounded-md border border-line bg-ink-soft px-2.5 py-2"
          >
            <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.1em] text-ash">
              <Download className="h-3 w-3" style={{ color: act.accent }} />
              background download
            </span>
            <span className="font-mono text-[8px] text-bone">68% · 4.2 GB</span>
          </div>
        </div>
      </div>

      <div className="mt-3 hidden flex-wrap justify-center gap-2 lg:flex">
        {act.chips.slice(0, 3).map((chip) => (
          <FloatingChip key={chip} label={chip} accent={act.accent} />
        ))}
      </div>
    </div>
  );
}
