import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Bot,
  Check,
  CloudSun,
  Cpu,
  Download,
  ExternalLink,
  Film,
  Globe,
  Layers,
  Navigation,
  PlayCircle,
  Search,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { PROJECTS_DATA } from '../../data/projectsData';
import type { Project } from '../../types';
import { GithubIcon } from './GithubIcon';
import { ScrambleText } from './AnimatedText';

interface ProjectsSectionProps {
  onOpenProject: (project: Project) => void;
  onNavigate: (sectionId: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'android', label: 'Android & Mobile' },
  { id: 'backend', label: 'Bots & Backend' },
  { id: 'ai', label: 'AI & Systems' },
  { id: 'web', label: 'Web & Streaming' },
] as const;

function getCategoryMatch(project: Project, catId: string): boolean {
  if (catId === 'all') return true;
  const cat = project.category.toLowerCase();
  const title = project.title.toLowerCase();
  const desc = project.description.toLowerCase();
  const stack = project.techStack.map((s) => s.toLowerCase());

  if (catId === 'android') {
    return (
      cat.includes('android') ||
      cat.includes('mobile') ||
      stack.some((s) => s.includes('android') || s.includes('kotlin') || s.includes('react native')) ||
      desc.includes('android')
    );
  }
  if (catId === 'backend') {
    return (
      cat.includes('bot') ||
      cat.includes('backend') ||
      title.includes('bot') ||
      desc.includes('fastapi') ||
      desc.includes('telegram')
    );
  }
  if (catId === 'ai') {
    return (
      cat.includes('ai') ||
      title.includes('agentic') ||
      title.includes('tools') ||
      desc.includes('ollama') ||
      desc.includes('agent')
    );
  }
  if (catId === 'web') {
    return (
      cat.includes('streaming') ||
      cat.includes('web') ||
      cat.includes('geospatial') ||
      stack.some((s) => s.includes('web') || s.includes('maplibre') || s.includes('html5'))
    );
  }
  return true;
}

function getProjectIcon(project: Project) {
  switch (project.iconName) {
    case 'Smartphone':
      return Smartphone;
    case 'Bot':
      return Bot;
    case 'PlayCircle':
      return PlayCircle;
    case 'Cpu':
      return Cpu;
    case 'Navigation':
      return Navigation;
    case 'Globe':
      return Globe;
    case 'CloudSun':
      return CloudSun;
    case 'Film':
      return Film;
    default:
      return Sparkles;
  }
}

export function ProjectsSection({ onOpenProject, onNavigate }: ProjectsSectionProps) {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCat = getCategoryMatch(project, selectedCat);
      if (!matchesCat) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();
      return (
        project.title.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(query))
      );
    });
  }, [selectedCat, searchQuery]);

  return (
    <section id="projects" className="relative border-t border-line py-24 sm:py-32">
      <div className="section-shell mx-auto w-full max-w-[1400px]">
        {/* Section Header */}
        <div className="flex items-end justify-between border-t border-line pt-6" data-reveal>
          <ScrambleText className="label" text="02 — Engineering Archive & Systems" />
          <ScrambleText
            className="label hidden sm:block"
            text={`${PROJECTS_DATA.length} production builds & case studies`}
            delay={140}
          />
        </div>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" data-reveal>
          <div>
            <h2 className="text-[clamp(2.4rem,4.4vw,4.4rem)] font-medium leading-[0.96] tracking-[-0.045em] text-bone">
              Technical blueprints,
              <br />
              <span className="text-shimmer font-serif font-normal italic">shipped and field-tested.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ash">
              Explore the comprehensive technical architecture, benchmark metrics, and production repositories across
              Android NDK clients, asynchronous bot ecosystems, autonomous AI IDEs, and high-frequency geospatial telemetry.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="group inline-flex items-center gap-2 self-start rounded-full border border-line-strong px-5 py-2.5 text-xs font-semibold text-bone transition-colors hover:border-bone sm:self-auto"
          >
            Commission custom build
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-6" data-reveal>
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((cat) => {
              const active = selectedCat === cat.id;
              const count =
                cat.id === 'all'
                  ? PROJECTS_DATA.length
                  : PROJECTS_DATA.filter((p) => getCategoryMatch(p, cat.id)).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCat(cat.id)}
                  className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs transition-colors duration-200 ${
                    active
                      ? 'bg-bone font-medium text-ink'
                      : 'border border-line bg-panel/60 text-ash hover:border-line-strong hover:text-bone'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`font-mono text-[10px] ${
                      active ? 'text-ink/70' : 'text-dim'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-dim" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack, title..."
              className="w-full rounded-full border border-line bg-panel/70 py-1.5 pl-8 pr-3 text-xs text-bone placeholder:text-dim focus:border-bone focus:outline-none"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project, index) => {
            const Icon = getProjectIcon(project);
            return (
              <article
                key={project.id}
                className="group surface relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-panel/80 p-6 transition-all duration-300 hover:border-line-strong sm:p-7"
              >
                {/* Glowing Top Accent */}
                <div
                  className="absolute inset-x-0 top-0 h-[2px] opacity-75 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, ${project.accentColor}, transparent 75%)`,
                  }}
                />

                <div>
                  {/* Meta Bar */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[10px] tabular-nums text-dim">
                        0{index + 1}
                      </span>
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: project.accentColor }}
                      />
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ash">
                        {project.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {project.version && (
                        <span className="rounded-md border border-line bg-ink/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-dim">
                          v{project.version}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-emerald-400">
                        <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Header & Icon */}
                  <div className="mt-5 flex items-start gap-3.5">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-ink"
                      style={{ color: project.accentColor }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-semibold tracking-tight text-bone transition-colors group-hover:text-white sm:text-2xl">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-xs leading-snug" style={{ color: project.accentColor }}>
                        {project.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 line-clamp-3 text-xs leading-relaxed text-ash sm:text-sm">
                    {project.description}
                  </p>

                  {/* Architecture Highlights Preview */}
                  <div className="mt-5 space-y-2 border-t border-line/70 pt-4">
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-dim">
                      Architecture Highlights
                    </span>
                    <ul className="space-y-1.5">
                      {project.architectureHighlights.slice(0, 2).map((highlight) => (
                        <li key={highlight} className="flex gap-2.5 text-xs text-ash">
                          <Check
                            className="mt-0.5 h-3.5 w-3.5 shrink-0"
                            style={{ color: project.accentColor }}
                          />
                          <span className="line-clamp-1">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Live Metrics */}
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {project.metrics.slice(0, 2).map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg border border-line/70 bg-ink-soft/80 p-2.5"
                      >
                        <span className="block font-mono text-[8px] uppercase tracking-[0.14em] text-dim">
                          {m.label}
                        </span>
                        <span className="mt-1 block text-xs font-medium text-bone">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack & Action Footer */}
                <div className="mt-6 border-t border-line pt-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line bg-ink/50 px-2 py-0.5 font-mono text-[9px] text-dim"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="font-mono text-[9px] text-dim">
                        +{project.techStack.length - 5}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenProject(project)}
                      className="inline-flex items-center gap-2 rounded-full bg-bone px-4 py-2 text-xs font-semibold text-ink transition-transform hover:scale-[1.02] hover:bg-white"
                    >
                      <Layers className="h-3.5 w-3.5" />
                      Case Study &amp; Specs
                    </button>

                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-ash transition-colors hover:border-bone hover:text-bone"
                          title="View Live Demo"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Demo</span>
                        </a>
                      )}
                      {project.releaseUrl && (
                        <a
                          href={project.releaseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-ash transition-colors hover:border-bone hover:text-bone"
                          title="Download APKs / Releases"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Releases</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ash transition-colors hover:border-bone hover:text-bone"
                          title="GitHub Source"
                          aria-label={`${project.title} on GitHub`}
                        >
                          <GithubIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-line p-12 text-center">
            <p className="text-sm text-ash">No projects matching your search filter.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCat('all');
                setSearchQuery('');
              }}
              className="mt-3 font-mono text-xs text-bone underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Bottom Callout banner */}
        <div
          className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-gradient-to-r from-panel via-panel to-panel-2 p-7 sm:flex-row sm:items-center sm:p-9"
          data-reveal
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
              Next Production Release
            </span>
            <h3 className="mt-2 text-2xl font-medium tracking-tight text-bone sm:text-3xl">
              Have a complex technical architecture to engineer?
            </h3>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-ash sm:text-sm">
              We specialize in custom Android engines, high-concurrency bot infrastructure, streaming servers, and AI tooling.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-bone px-6 py-3.5 text-xs font-semibold text-ink transition-transform hover:scale-[1.02] hover:bg-white"
          >
            Start your project
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
