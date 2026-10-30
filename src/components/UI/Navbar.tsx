import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, FileText, Mail, Menu, Send, X } from 'lucide-react';
import type { SectionId } from '../../hooks/useWeb3DScroll';
import { WORK_SECTIONS } from '../../hooks/useWeb3DScroll';
import { RESUME_CONTACT } from '../../data/resumeData';
import { BRAND } from '../../data/brand';
import { GithubIcon } from './GithubIcon';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: SectionId;
  setScrollLocked: (locked: boolean) => void;
  onOpenResume: () => void;
}

const NAV_LINKS: { id: SectionId; label: string }[] = [
  { id: 'cherrygram', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ onNavigate, activeSection, setScrollLocked, onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setScrollLocked(menuOpen);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      setScrollLocked(false);
    };
  }, [menuOpen, setScrollLocked]);

  const go = (id: string) => {
    setMenuOpen(false);
    setScrollLocked(false);
    onNavigate(id);
  };

  const isActive = (id: SectionId) =>
    id === 'cherrygram' ? WORK_SECTIONS.includes(activeSection) : activeSection === id;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || menuOpen
            ? 'border-b border-line bg-ink/90 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="section-shell mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between">
          <button
            type="button"
            onClick={() => go('hero')}
            className="group flex items-center gap-3 text-left"
            aria-label={`${BRAND.name} — home`}
          >
            <span className="flex h-9 w-9 items-center justify-center border border-line-strong font-mono text-[11px] tracking-[0.12em] text-bone transition-colors duration-300 group-hover:border-bone">
              {BRAND.monogram}
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-semibold leading-none tracking-tight text-bone">
                {BRAND.short}
              </span>
              <span className="mt-1 block font-mono text-[9px] uppercase leading-none tracking-[0.2em] text-dim">
                {BRAND.descriptor}
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.id);
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  className={`group relative rounded-full px-4 py-2 text-xs transition-colors duration-300 ${
                    active ? 'text-bone' : 'text-ash hover:text-bone'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-1 w-1 rounded-full bg-bone transition-all duration-300 ${
                        active ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                      }`}
                    />
                    {link.label}
                  </span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenResume();
              }}
              className="ml-1 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs text-ash transition-colors hover:text-bone"
            >
              <FileText className="h-3.5 w-3.5" />
              Résumé
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 lg:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ash">Open for projects</span>
            </span>

            <button
              type="button"
              onClick={() => go('contact')}
              className="group hidden items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-xs font-semibold text-ink transition-colors duration-300 hover:bg-white sm:flex"
            >
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center border border-line text-bone transition-colors hover:border-bone md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pb-10 pt-28 md:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {NAV_LINKS.map((link, index) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-baseline justify-between border-b border-line py-4 text-left"
                >
                  <span className="text-3xl font-medium tracking-tight text-bone">{link.label}</span>
                  <span className="font-mono text-[10px] text-dim">0{index + 1}</span>
                </motion.button>
              ))}
              <motion.button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenResume();
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + NAV_LINKS.length * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-baseline justify-between border-b border-line py-4 text-left"
              >
                <span className="flex items-center gap-3 text-3xl font-medium tracking-tight text-bone">
                  Résumé
                  <FileText className="h-5 w-5 text-ash" />
                </span>
                <span className="font-mono text-[10px] text-dim">Interactive</span>
              </motion.button>
            </nav>

            <div className="space-y-5">
              <a
                href={`mailto:${RESUME_CONTACT.email}`}
                className="flex items-center gap-3 text-sm text-ash transition-colors hover:text-bone"
              >
                <Mail className="h-4 w-4 text-bone" />
                {RESUME_CONTACT.email}
              </a>
              <a
                href={RESUME_CONTACT.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-ash transition-colors hover:text-bone"
              >
                <Send className="h-4 w-4 text-bone" />
                {RESUME_CONTACT.telegramLabel}
              </a>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={RESUME_CONTACT.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-line text-ash transition-colors hover:border-bone hover:text-bone"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${RESUME_CONTACT.email}`}
                  className="flex h-10 w-10 items-center justify-center border border-line text-ash transition-colors hover:border-bone hover:text-bone"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
