import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowUpRight, Mail, Send, X } from 'lucide-react';
import {
  RESUME_CONTACT,
  RESUME_EDUCATION,
  RESUME_EXPERIENCE,
  RESUME_INTERESTS,
  RESUME_LANGUAGES,
  RESUME_PROFILE,
  RESUME_PROJECTS,
  RESUME_SKILLS,
  RESUME_STATS,
} from '../../data/resumeData';
import { BRAND } from '../../data/brand';
import { GithubIcon } from './GithubIcon';
import { ScrambleText, WordStream } from './AnimatedText';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

const overlay: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
};

const panel: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: 32, scale: 0.98, transition: { duration: 0.25, ease: 'easeIn' } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const slideSide: Variants = {
  hidden: { opacity: 0, x: -42 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const maskLine: Variants = {
  hidden: { y: '115%', rotate: 2 },
  show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const chip: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKey);
    const timer = window.setTimeout(() => closeRef.current?.focus(), 140);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;

    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={overlay}
          initial={reduce ? false : 'hidden'}
          animate="show"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-ink/80 backdrop-blur-md sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Founder's résumé"
          data-lenis-prevent
        >
          <motion.div
            variants={panel}
            onClick={(event) => event.stopPropagation()}
            className="relative flex h-full w-full max-w-5xl flex-col overflow-hidden border-line bg-ink sm:h-auto sm:max-h-[92vh] sm:rounded-2xl sm:border"
            data-lenis-prevent
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line bg-ink/95 px-5 py-4 backdrop-blur sm:px-8">
              <ScrambleText className="label" text="Founder's résumé — 2026" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-line text-ash transition-colors hover:border-bone hover:text-bone"
                aria-label="Close résumé"
              >
                <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            <motion.div
              ref={scrollRef}
              variants={stagger}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-9 sm:px-8 sm:py-11"
              data-lenis-prevent
            >
              <div className="grid gap-10 border-b border-line pb-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-8">
                  <motion.p
                    variants={rise}
                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim"
                  >
                    Rohan Kapoor · AI-Native Product Architect · Founder, {BRAND.name}
                  </motion.p>

                  <h2 className="mt-4 text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[0.92] tracking-[-0.05em] text-bone">
                    <span className="block overflow-hidden pb-[0.05em]">
                      <motion.span variants={maskLine} className="block">
                        The person
                      </motion.span>
                    </span>
                    <span className="block overflow-hidden pb-[0.1em]">
                      <motion.span
                        variants={maskLine}
                        className="text-shimmer block font-serif font-normal italic"
                      >
                        behind the work.
                      </motion.span>
                    </span>
                  </h2>

                  <p className="mt-6 max-w-xl text-sm leading-relaxed text-ash sm:text-base">
                    <WordStream text={RESUME_PROFILE} delay={0.35} stagger={0.008} />
                  </p>
                </div>

                <div className="lg:col-span-4">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 lg:border-t-0 lg:pt-0">
                    {RESUME_STATS.map((stat) => (
                      <motion.div key={stat.label} variants={rise}>
                        <p className="font-mono text-2xl leading-none text-bone">
                          {stat.value}
                          {stat.suffix}
                        </p>
                        <p className="mt-2 font-mono text-[9px] uppercase leading-tight tracking-[0.12em] text-dim">
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div variants={rise} className="mt-8 border-t border-line pt-6">
                    <span className="label">Reach</span>
                    <div className="mt-3 space-y-2.5">
                      <a
                        href={`mailto:${RESUME_CONTACT.email}`}
                        className="group flex items-center gap-2.5 text-xs text-ash transition-colors hover:text-bone"
                      >
                        <Mail className="h-3.5 w-3.5 text-bone" />
                        {RESUME_CONTACT.email}
                      </a>
                      <a
                        href={RESUME_CONTACT.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2.5 text-xs text-ash transition-colors hover:text-bone"
                      >
                        <Send className="h-3.5 w-3.5 text-bone" />
                        {RESUME_CONTACT.telegramLabel}
                      </a>
                      <a
                        href={RESUME_CONTACT.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2.5 text-xs text-ash transition-colors hover:text-bone"
                      >
                        <GithubIcon className="h-3.5 w-3.5 text-bone" />
                        {RESUME_CONTACT.githubLabel}
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="mt-10">
                <motion.div variants={rise}>
                  <ScrambleText className="label" text="Experience" />
                </motion.div>

                <div className="mt-5">
                  {RESUME_EXPERIENCE.map((entry) => (
                    <motion.article
                      key={`${entry.role}-${entry.period}`}
                      variants={stagger}
                      className="grid gap-4 border-b border-line py-6 first:border-t first:border-line sm:grid-cols-12 sm:gap-8"
                    >
                      <motion.p
                        variants={slideSide}
                        className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim sm:col-span-3"
                      >
                        {entry.period}
                      </motion.p>
                      <div className="sm:col-span-9">
                        <motion.h3
                          variants={slideSide}
                          className="text-base font-medium tracking-tight text-bone sm:text-lg"
                        >
                          {entry.role}
                        </motion.h3>
                        <motion.p variants={slideSide} className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ash">
                          {entry.organisation}
                          {entry.location ? ` · ${entry.location}` : ''}
                        </motion.p>
                        <motion.p variants={slideSide} className="mt-3 max-w-2xl text-sm leading-relaxed text-ash">
                          {entry.summary}
                        </motion.p>
                        <ul className="mt-3 space-y-2">
                          {entry.points.map((point) => (
                            <motion.li
                              key={point}
                              variants={slideSide}
                              className="flex gap-3 text-xs leading-relaxed text-ash"
                            >
                              <span className="mt-2 h-px w-3 shrink-0 bg-line-strong" />
                              {point}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <motion.div variants={rise}>
                  <ScrambleText className="label" text="Selected builds" />
                </motion.div>
                <div className="mt-5 space-y-4">
                  {RESUME_PROJECTS.map((project, index) => (
                    <motion.div
                      key={project.name}
                      variants={rise}
                      className="grid gap-2 border-b border-line pb-4 sm:grid-cols-12 sm:gap-8"
                    >
                      <span className="font-mono text-[10px] tabular-nums text-dim sm:col-span-1">
                        0{index + 1}
                      </span>
                      <div className="sm:col-span-4">
                        <h3 className="text-sm font-medium tracking-tight text-bone">{project.name}</h3>
                        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-dim">
                          {project.role}
                        </p>
                      </div>
                      <p className="text-xs leading-relaxed text-ash sm:col-span-7">{project.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-10 grid gap-10 border-t border-line pt-8 sm:grid-cols-2">
                <div>
                  <motion.div variants={rise}>
                    <ScrambleText className="label" text="Toolkit" />
                  </motion.div>
                  <div className="mt-4 space-y-4">
                    {RESUME_SKILLS.map((group) => (
                      <motion.div key={group.label} variants={rise}>
                        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-dim">{group.label}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {group.skills.map((skill) => (
                            <motion.span
                              key={skill}
                              variants={chip}
                              className="rounded-full border border-line px-2.5 py-1 text-[10px] text-ash"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <motion.div variants={rise}>
                    <ScrambleText className="label" text="Education" />
                  </motion.div>
                  <div className="mt-4 space-y-3">
                    {RESUME_EDUCATION.map((entry) => (
                      <motion.div key={entry.qualification} variants={rise}>
                        <p className="text-sm text-bone">{entry.qualification}</p>
                        <p className="mt-1 text-xs text-ash">{entry.institution}</p>
                        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-dim">
                          {entry.period}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div variants={rise} className="mt-6 border-t border-line pt-4">
                    <span className="label">Languages</span>
                    <p className="mt-2 text-xs text-ash">{RESUME_LANGUAGES.join(' · ')}</p>
                  </motion.div>
                  <motion.div variants={rise} className="mt-4 border-t border-line pt-4">
                    <span className="label">Interests</span>
                    <p className="mt-2 text-xs text-ash">{RESUME_INTERESTS.join(' · ')}</p>
                  </motion.div>
                </div>
              </div>

              <motion.div
                variants={rise}
                className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center"
              >
                <p className="max-w-md text-sm text-ash">
                  Hiring, or want the same engineering on your product? The studio is open.
                </p>
                <a
                  href={`mailto:${RESUME_CONTACT.email}?subject=${encodeURIComponent('Project enquiry — Alpha Tech')}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-white"
                >
                  Get in touch
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
