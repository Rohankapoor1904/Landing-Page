import { ArrowUp, ArrowUpRight, FileText, Mail, Send } from 'lucide-react';
import { RESUME_CONTACT } from '../../data/resumeData';
import { SHOWCASE_ACTS } from '../../data/showcaseData';
import { BRAND } from '../../data/brand';
import { GithubIcon } from './GithubIcon';
import { ScrambleText } from './AnimatedText';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
}

const YEAR = new Date().getFullYear();

const SITEMAP = [
  { id: 'cherrygram', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
];

export function Footer({ onNavigate, onOpenResume }: FooterProps) {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-line bg-ink">
      <div className="section-shell mx-auto w-full max-w-[1400px] pt-16">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end" data-reveal>
          <div>
            <ScrambleText className="label" text="Have something to ship?" />
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="group mt-4 flex items-center gap-4 text-left"
            >
              <span className="text-[clamp(2rem,4vw,3.6rem)] font-medium leading-none tracking-[-0.04em] text-bone">
                Let&apos;s make it real.
              </span>
              <ArrowUpRight className="h-7 w-7 shrink-0 text-bone transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-9 sm:w-9" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${RESUME_CONTACT.email}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2.5 text-xs text-ash transition-colors hover:border-bone hover:text-bone"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
            <a
              href={RESUME_CONTACT.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2.5 text-xs text-ash transition-colors hover:border-bone hover:text-bone"
            >
              <Send className="h-4 w-4" />
              Telegram
            </a>
            <a
              href={RESUME_CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2.5 text-xs text-ash transition-colors hover:border-bone hover:text-bone"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
          <div>
            <span className="label">Sitemap</span>
            <div className="mt-4 space-y-2.5">
              {SITEMAP.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className="block text-left text-sm text-ash transition-colors hover:text-bone"
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={onOpenResume}
                className="flex items-center gap-1.5 text-sm text-ash transition-colors hover:text-bone"
              >
                Résumé
                <FileText className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div>
            <span className="label">Products</span>
            <div className="mt-4 space-y-2.5">
              {SHOWCASE_ACTS.map((act) => (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => onNavigate(act.id)}
                  className="block text-left text-sm text-ash transition-colors hover:text-bone"
                >
                  {act.product}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="label">Elsewhere</span>
            <div className="mt-4 space-y-2.5">
              <a
                href={RESUME_CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-ash transition-colors hover:text-bone"
              >
                GitHub
              </a>
              <a
                href={RESUME_CONTACT.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-ash transition-colors hover:text-bone"
              >
                Telegram
              </a>
              <a
                href={`mailto:${RESUME_CONTACT.email}`}
                className="block text-sm text-ash transition-colors hover:text-bone"
              >
                Email
              </a>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="label">Studio</span>
            <p className="mt-4 text-sm leading-relaxed text-ash">
              {RESUME_CONTACT.location}
              <br />
              Available worldwide, remote.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line py-7 sm:flex-row sm:items-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-dim">
            © {YEAR} {BRAND.name} — All rights reserved
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-dim">
            Built with React, GSAP &amp; Lenis
          </p>
          <button
            type="button"
            onClick={() => onNavigate('hero')}
            className="group flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-dim transition-colors hover:text-bone"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line transition-colors group-hover:border-bone group-hover:text-bone">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden">
        <p className="translate-y-[18%] whitespace-nowrap text-center text-[13vw] font-medium leading-[0.75] tracking-[-0.06em] text-white/[0.035]">
          {BRAND.watermark}
        </p>
      </div>
    </footer>
  );
}
