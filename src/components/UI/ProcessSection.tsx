import { ScrambleText } from './AnimatedText';

const STEPS = [
  {
    title: 'Scope',
    description:
      'We define the real problem, the constraints, and what success actually looks like before a single line of code is written.',
    output: 'One-page technical brief',
  },
  {
    title: 'Architect',
    description:
      'We map the data flow, choose the stack, and break the work into demonstrable milestones with clear acceptance criteria.',
    output: 'System diagram + milestone plan',
  },
  {
    title: 'Build',
    description:
      'Weekly builds, clean commits, and tests where they matter. You see working software early, not a status report at the end.',
    output: 'Reviewed, staged releases',
  },
  {
    title: 'Ship & support',
    description:
      'Release, monitoring, documentation, and a clean handover so your team can own the codebase without reverse-engineering it.',
    output: 'Production build + runbook',
  },
];

const PRINCIPLES = ['Clarity over cleverness', 'Ship small, ship often', 'Own the outcome'];

export function ProcessSection() {
  return (
    <section id="process" className="relative border-t border-line py-24 sm:py-32">
      <div className="section-shell mx-auto w-full max-w-[1400px]">
        <div className="flex items-end justify-between border-t border-line pt-6" data-reveal>
          <ScrambleText className="label" text="05 — Process" />
          <ScrambleText className="label hidden sm:block" text="From brief to release" delay={140} />
        </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2
                className="text-[clamp(2.4rem,4.2vw,4rem)] font-medium leading-[0.98] tracking-[-0.045em] text-bone"
                data-reveal-lines
              >
                <span className="block overflow-hidden pb-[0.05em]">
                  <span data-reveal-line className="block">
                    A calm process
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.09em]">
                  <span data-reveal-line className="text-shimmer block font-serif font-normal italic">
                    for complex builds.
                  </span>
                </span>
              </h2>
              <p className="mt-7 max-w-sm text-sm leading-relaxed text-ash" data-reveal>
                No black boxes, no surprise invoices. Four stages, visible progress, and a codebase you can actually
                inherit.
              </p>

              <div className="mt-10 space-y-4 border-t border-line pt-7" data-reveal="left">
                {PRINCIPLES.map((principle, index) => (
                  <div key={principle} className="flex items-center gap-4">
                    <span className="font-mono text-[9px] text-dim">0{index + 1}</span>
                    <span className="h-px flex-1 bg-line" />
                    <span className="text-xs text-ash">{principle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="relative">
              <span className="absolute left-[3px] top-1 h-[calc(100%-1rem)] w-px bg-white/25" data-draw-line />
              <div className="space-y-10 pl-9" data-reveal-group="left">
                {STEPS.map((step, index) => (
                  <div key={step.title} className="relative">
                    <span className="absolute -left-[35px] top-2 h-[7px] w-[7px] rounded-full border border-bone bg-ink" />
                    <div className="flex items-baseline justify-between gap-6">
                      <h3 className="text-xl font-medium tracking-tight text-bone sm:text-2xl">{step.title}</h3>
                      <span className="font-serif text-3xl italic leading-none text-white/20">0{index + 1}</span>
                    </div>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-ash">{step.description}</p>
                    <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-dim">
                      Output — <span className="text-bone">{step.output}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14 border-t border-line pt-8" data-reveal>
              <p className="max-w-2xl font-serif text-2xl italic leading-snug text-bone sm:text-3xl">
                &ldquo;Good engineering is boring on purpose. It behaves the same way every time you ship.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
