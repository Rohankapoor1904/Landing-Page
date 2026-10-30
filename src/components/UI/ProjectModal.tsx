import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Check,
  Download,
  ExternalLink,
  Layers,
  Sparkles,
  X,
} from 'lucide-react';
import type { Project } from '../../types';
import { GithubIcon } from './GithubIcon';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const overlay: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.28, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

const panel: Variants = {
  hidden: { opacity: 0, y: 44, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: 24, scale: 0.98, transition: { duration: 0.2, ease: 'easeIn' } },
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    const timer = window.setTimeout(() => closeRef.current?.focus(), 100);

    return () => {
      window.removeEventListener('keydown', handleKey);
      window.clearTimeout(timer);
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [project, onClose]);

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          variants={overlay}
          initial={reduce ? false : 'hidden'}
          animate="show"
          exit="exit"
          className="fixed inset-0 z-[95] flex items-start justify-center overflow-y-auto bg-ink/85 p-3 backdrop-blur-md sm:items-center sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} technical specification`}
          data-lenis-prevent
        >
          <motion.div
            variants={panel}
            onClick={(event) => event.stopPropagation()}
            className="surface-raised relative my-auto flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-ink shadow-2xl"
            data-lenis-prevent
          >
            {/* Accent Gradient Border */}
            <div
              className="absolute inset-x-0 top-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, ${project.accentColor}, transparent 80%)`,
              }}
            />

            {/* Modal Header */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line bg-ink/95 px-6 py-4.5 backdrop-blur">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-dim">
                  <Layers className="h-3 w-3 text-ash" />
                  Engineering Specification
                </span>
                <span className="font-mono text-[9px] text-dim">·</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em]" style={{ color: project.accentColor }}>
                  {project.category}
                </span>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-line text-ash transition-colors hover:border-bone hover:text-bone"
                aria-label="Close case study"
              >
                <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              ref={scrollRef}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-7 sm:px-9 sm:py-8"
              data-lenis-prevent
            >
              <div className="pr-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-line bg-panel px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ash">
                    {project.category}
                  </span>
                  {project.version && (
                    <span className="rounded-full border border-line bg-panel px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-dim">
                      v{project.version}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 rounded-full border border-line bg-panel px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    {project.status}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-bone sm:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm font-medium sm:text-base" style={{ color: project.accentColor }}>
                  {project.tagline}
                </p>
                {project.baseVersion && (
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                    {project.baseVersion}
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="mt-6 text-sm leading-relaxed text-ash sm:text-base">
                {project.description}
              </p>

              {/* Technical Metrics Grid */}
              <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="bg-ink p-4">
                    <span className="block font-mono text-[8px] uppercase tracking-[0.14em] text-dim">
                      {metric.label}
                    </span>
                    <span className="mt-1.5 block text-xs font-medium text-bone sm:text-sm">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Architecture & Features Split */}
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div className="rounded-xl border border-line bg-panel/50 p-5">
                  <span className="label flex items-center gap-2">
                    <Layers className="h-3.5 w-3.5" style={{ color: project.accentColor }} />
                    Architecture &amp; Protocol
                  </span>
                  <div className="mt-4 space-y-3">
                    {project.architectureHighlights.map((highlight) => (
                      <div key={highlight} className="flex gap-3 text-xs leading-relaxed text-ash">
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0"
                          style={{ color: project.accentColor }}
                        />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-line bg-panel/50 p-5">
                  <span className="label flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5" style={{ color: project.accentColor }} />
                    Key Capabilities &amp; Engineering
                  </span>
                  <div className="mt-4 space-y-3">
                    {project.keyFeatures.map((feature) => (
                      <div key={feature} className="flex gap-3 text-xs leading-relaxed text-ash">
                        <span
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: project.accentColor }}
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-8 border-t border-line pt-6">
                <span className="label block">Tech Stack &amp; Dependencies</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line bg-panel px-3 py-1 font-mono text-[10px] text-ash"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
                <div className="flex flex-wrap items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-xs font-semibold text-ink transition-transform hover:scale-[1.02] hover:bg-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-xs font-medium text-bone transition-colors hover:border-bone"
                    >
                      <GithubIcon className="h-4 w-4" />
                      Repository
                    </a>
                  )}
                  {project.releaseUrl && (
                    <a
                      href={project.releaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-xs font-medium text-bone transition-colors hover:border-bone"
                    >
                      <Download className="h-4 w-4" />
                      Releases &amp; Binaries
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="font-mono text-xs text-dim transition-colors hover:text-bone"
                >
                  Close [ESC]
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
