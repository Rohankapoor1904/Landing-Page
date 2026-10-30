import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowUpRight, Check, Clock, FileText, Mail, MapPin, Send } from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { RESUME_CONTACT } from '../../data/resumeData';
import { GithubIcon } from './GithubIcon';
import { ScrambleText } from './AnimatedText';

interface ContactSectionProps {
  initialService?: string;
  onOpenResume: () => void;
}

interface ContactForm {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  brief: string;
}

const SERVICE_OPTIONS = [...SERVICES_DATA.map((service) => service.title), 'Something else'];

const SERVICE_LABELS: Record<string, string> = {
  'Custom Android & Mobile Client Architecture': 'Custom Android client',
  'Telegram & Discord High-Throughput Bot Ecosystems': 'Telegram / Discord bots',
  'Embedded Streaming Engines & High-Performance APIs': 'Streaming engine & APIs',
  'Autonomous AI Agents & Custom Developer Tools': 'AI agents & dev tools',
  'Something else': 'Something else',
};

const BUDGET_OPTIONS = [
  'Not sure yet',
  'Under ₹50,000',
  '₹50,000 — ₹1,50,000',
  '₹1,50,000 — ₹4,00,000',
  '₹4,00,000+',
];

const EMPTY_FORM: ContactForm = {
  name: '',
  email: '',
  projectType: SERVICE_OPTIONS[0],
  budget: BUDGET_OPTIONS[0],
  brief: '',
};

export function ContactSection({ initialService, onOpenResume }: ContactSectionProps) {
  const [form, setForm] = useState<ContactForm>(() => ({
    ...EMPTY_FORM,
    projectType: initialService ?? EMPTY_FORM.projectType,
  }));
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof ContactForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const mailtoLink = () => {
    const subject = encodeURIComponent(`Project enquiry — ${form.projectType}`);
    const body = encodeURIComponent(
      `Hi Alpha Tech team,\n\nWe'd like to discuss: ${form.projectType}\nBudget: ${form.budget}\n\n${form.brief}\n\n— ${form.name}\n${form.email}`,
    );
    return `mailto:${RESUME_CONTACT.email}?subject=${subject}&body=${body}`;
  };

  const telegramLink = () => {
    const text = encodeURIComponent(
      `Hi Alpha Tech team, I'd like to discuss ${form.projectType}. Budget: ${form.budget}. ${form.brief}`,
    );
    return `${RESUME_CONTACT.telegram}?text=${text}`;
  };

  return (
    <section id="contact" className="relative border-t border-line py-24 sm:py-32">
      <div className="section-shell mx-auto w-full max-w-[1400px]">
        <div className="flex items-end justify-between border-t border-line pt-6" data-reveal>
          <ScrambleText className="label" text="06 — Contact" />
          <ScrambleText className="label hidden sm:block" text="Let's talk" delay={140} />
        </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2
              className="text-[clamp(2.6rem,5.4vw,5.4rem)] font-medium leading-[0.94] tracking-[-0.05em] text-bone"
              data-reveal-lines
            >
              <span className="block overflow-hidden pb-[0.04em]">
                <span data-reveal-line className="block">
                  Tell us what
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.04em]">
                <span data-reveal-line className="block">
                  you&apos;re
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span data-reveal-line className="text-shimmer block font-serif font-normal italic">
                  building.
                </span>
              </span>
            </h2>

            <p className="mt-8 max-w-md text-sm leading-relaxed text-ash" data-reveal>
              Send the problem, the platform and your timeline. We&apos;ll reply with an honest read on scope, cost
              and whether we&apos;re the right team for it — usually within a day.
            </p>

            <button
              type="button"
              onClick={onOpenResume}
              className="group mt-7 inline-flex items-center gap-2.5 rounded-full border border-line-strong px-4 py-2.5 text-xs font-medium text-bone transition-colors hover:border-bone"
              data-reveal
            >
              <FileText className="h-3.5 w-3.5" />
              <span className="relative block overflow-hidden leading-snug">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                  Founder&apos;s résumé
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                >
                  Open résumé
                </span>
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <div className="mt-10 space-y-1" data-reveal="left">
              <a
                href={`mailto:${RESUME_CONTACT.email}`}
                className="group flex items-center justify-between gap-4 border-b border-line py-4 transition-colors hover:border-line-strong"
              >
                <span className="flex items-center gap-3 text-sm text-ash transition-colors group-hover:text-bone">
                  <Mail className="h-4 w-4 text-bone" />
                  {RESUME_CONTACT.email}
                </span>
                <ArrowUpRight className="h-4 w-4 text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
              </a>
              <a
                href={RESUME_CONTACT.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border-b border-line py-4 transition-colors hover:border-line-strong"
              >
                <span className="flex items-center gap-3 text-sm text-ash transition-colors group-hover:text-bone">
                  <Send className="h-4 w-4 text-bone" />
                  Telegram — {RESUME_CONTACT.telegramLabel}
                </span>
                <ArrowUpRight className="h-4 w-4 text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
              </a>
              <a
                href={RESUME_CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border-b border-line py-4 transition-colors hover:border-line-strong"
              >
                <span className="flex items-center gap-3 text-sm text-ash transition-colors group-hover:text-bone">
                  <GithubIcon className="h-4 w-4 text-bone" />
                  {RESUME_CONTACT.githubLabel}
                </span>
                <ArrowUpRight className="h-4 w-4 text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
              </a>
            </div>

            <div className="mt-9 grid gap-5 sm:grid-cols-2" data-reveal>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bone" />
                <div>
                  <span className="label block">Based in</span>
                  <p className="mt-1.5 text-sm text-ash">{RESUME_CONTACT.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-bone" />
                <div>
                  <span className="label block">Response time</span>
                  <p className="mt-1.5 text-sm text-ash">Usually within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-clip lg:col-span-6">
            <div className="surface rounded-2xl p-6 sm:p-8" data-reveal="right">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center justify-between border-b border-line pb-5">
                    <span className="text-sm font-medium text-bone">Project enquiry</span>
                    <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ash">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Open for work
                    </span>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="label mb-2 block">Your name</span>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(event) => update('name', event.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full rounded-lg border border-line bg-ink px-4 py-3 text-sm text-bone placeholder:text-dim focus:border-bone focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="label mb-2 block">Email</span>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(event) => update('email', event.target.value)}
                        placeholder="alex@company.com"
                        className="w-full rounded-lg border border-line bg-ink px-4 py-3 text-sm text-bone placeholder:text-dim focus:border-bone focus:outline-none"
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="label mb-2 block">Project type</span>
                      <select
                        value={form.projectType}
                        onChange={(event) => update('projectType', event.target.value)}
                        className="w-full cursor-pointer rounded-lg border border-line bg-ink px-4 py-3 text-sm text-bone focus:border-bone focus:outline-none"
                      >
                        {SERVICE_OPTIONS.map((option) => (
                          <option key={option} value={option} className="bg-panel text-bone">
                            {SERVICE_LABELS[option] ?? option}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="label mb-2 block">Budget</span>
                      <select
                        value={form.budget}
                        onChange={(event) => update('budget', event.target.value)}
                        className="w-full cursor-pointer rounded-lg border border-line bg-ink px-4 py-3 text-sm text-bone focus:border-bone focus:outline-none"
                      >
                        {BUDGET_OPTIONS.map((option) => (
                          <option key={option} value={option} className="bg-panel text-bone">
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="block">
                    <span className="label mb-2 block">What are you building?</span>
                    <textarea
                      required
                      rows={4}
                      value={form.brief}
                      onChange={(event) => update('brief', event.target.value)}
                      placeholder="A short brief — the problem, the platform, and your timeline."
                      className="w-full resize-none rounded-lg border border-line bg-ink px-4 py-3 text-sm text-bone placeholder:text-dim focus:border-bone focus:outline-none"
                    />
                  </label>

                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-bone px-6 py-3.5 text-xs font-semibold text-ink transition-colors hover:bg-white"
                  >
                    Prepare enquiry
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  <p className="text-center font-mono text-[9px] uppercase tracking-[0.14em] text-dim">
                    No spam. No mailing list. Just a reply.
                  </p>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 text-emerald-400">
                    <Check className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="text-xl font-medium tracking-tight text-bone">
                      Your draft is ready, {form.name.split(' ')[0]}.
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ash">
                      Send it directly through your email client or Telegram — both open pre-filled with your details.
                    </p>
                  </div>

                  <div className="space-y-2 rounded-lg border border-line bg-ink p-4 font-mono text-[10px] leading-relaxed text-ash">
                    <div>
                      <span className="text-dim">Project:</span> {form.projectType}
                    </div>
                    <div>
                      <span className="text-dim">Budget:</span> {form.budget}
                    </div>
                    <div>
                      <span className="text-dim">Brief:</span> {form.brief.slice(0, 120)}
                      {form.brief.length > 120 ? '…' : ''}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      href={mailtoLink()}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-bone px-5 py-3 text-xs font-semibold text-ink transition-colors hover:bg-white"
                    >
                      <Mail className="h-4 w-4" />
                      Open email draft
                    </a>
                    <a
                      href={telegramLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-line-strong px-5 py-3 text-xs font-semibold text-bone transition-colors hover:border-bone"
                    >
                      <Send className="h-4 w-4" />
                      Send on Telegram
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim underline-offset-4 transition-colors hover:text-bone hover:underline"
                  >
                    Edit details
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
