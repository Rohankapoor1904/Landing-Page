import { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { ScrambleText } from './AnimatedText';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
  onNavigate: (sectionId: string) => void;
}

export function ServicesSection({ onSelectService, onNavigate }: ServicesSectionProps) {
  const [openId, setOpenId] = useState<string | null>(SERVICES_DATA[0].id);

  return (
    <section id="services" className="relative border-t border-line py-24 sm:py-32">
      <div className="section-shell mx-auto w-full max-w-[1400px]">
        <div className="flex items-end justify-between border-t border-line pt-6" data-reveal>
          <ScrambleText className="label" text="04 — Services" />
          <ScrambleText className="label hidden sm:block" text="What we can build for you" delay={140} />
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
                    Work with the team
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.09em]">
                  <span data-reveal-line className="text-shimmer block font-serif font-normal italic">
                    that shipped these.
                  </span>
                </span>
              </h2>
              <p className="mt-7 max-w-sm text-sm leading-relaxed text-ash" data-reveal>
                The three products above are the portfolio. These are the four ways we put that same engineering into
                your product — from architecture to release.
              </p>

              <div className="mt-9 border-t border-line pt-7" data-reveal>
                <ScrambleText className="label block" text="Not sure where to start?" />
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="group mt-4 flex w-full items-center justify-center gap-2.5 rounded-full border border-line-strong px-5 py-3 text-xs font-medium text-bone transition-colors hover:border-bone sm:w-fit sm:justify-start"
                >
                  Book an intro call
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-line" data-reveal-group="left">
              {SERVICES_DATA.map((service, index) => {
                const isOpen = openId === service.id;
                return (
                  <div key={service.id} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : service.id)}
                      className="group flex w-full items-start gap-5 py-7 text-left sm:items-center sm:gap-8"
                      aria-expanded={isOpen}
                    >
                      <span className="mt-1 flex items-center gap-2.5 sm:mt-0">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: service.accentColor }}
                        />
                        <span className="font-mono text-[10px] tabular-nums text-dim">0{index + 1}</span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-lg font-medium tracking-tight text-bone transition-colors duration-300 sm:text-xl">
                          {service.title}
                        </span>
                        <span className="mt-1.5 block max-w-xl text-sm leading-relaxed text-ash">
                          {service.shortDesc}
                        </span>
                      </span>
                      <span className="flex items-center gap-4">
                        <span className="hidden font-mono text-[9px] uppercase tracking-[0.14em] text-dim md:block">
                          {service.highlightMetric}
                        </span>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                            isOpen
                              ? 'rotate-45 border-bone bg-bone text-ink'
                              : 'border-line text-ash group-hover:border-bone group-hover:text-bone'
                          }`}
                        >
                          <Plus className="h-4 w-4" />
                        </span>
                      </span>
                    </button>

                    <div className="accordion-body" data-open={isOpen}>
                      <div className="accordion-inner">
                        <div className="pb-9 pl-0 sm:pl-[3.25rem]">
                          <p className="max-w-2xl text-sm leading-relaxed text-ash">{service.fullDesc}</p>

                          <div className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                            {service.deliverables.map((deliverable) => (
                              <div key={deliverable} className="flex gap-3 text-xs leading-relaxed text-ash">
                                <span
                                  className="mt-2 h-px w-3 shrink-0"
                                  style={{ backgroundColor: service.accentColor }}
                                />
                                {deliverable}
                              </div>
                            ))}
                          </div>

                          <div className="mt-6 flex flex-wrap items-center gap-2">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-ash"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() => onSelectService(service.title)}
                            className="group/cta mt-7 inline-flex items-center gap-2 text-xs font-medium text-bone"
                          >
                            Discuss this service
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
