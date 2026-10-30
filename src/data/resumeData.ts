export interface ResumeEntry {
  period: string;
  role: string;
  organisation: string;
  location?: string;
  summary: string;
  points: string[];
}

export interface EducationEntry {
  period: string;
  qualification: string;
  institution: string;
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export const RESUME_PROFILE =
  'Final-year Computer Science engineer and AI-native product architect. I specialize in system design, technical research, and architectural direction—orchestrating modern AI engineering workflows to build, verify, and ship production-grade software across Android NDK clients, high-concurrency bot infrastructure, streaming backends, and autonomous developer tooling.';

export const RESUME_CONTACT = {
  email: 'rohankapoor1904@gmail.com',
  location: 'Ladwa, Kurukshetra, Haryana',
  github: 'https://github.com/Rohankapoor1904',
  githubLabel: 'github.com/Rohankapoor1904',
  telegram: 'https://t.me/tech_beast69',
  telegramLabel: '@tech_beast69',
};

export const RESUME_EXPERIENCE: ResumeEntry[] = [
  {
    period: 'Aug 2024 — Dec 2024',
    role: 'Trainee — Java & Full-Stack Web Development',
    organisation: 'YHiils',
    location: 'Remote',
    summary:
      'Researched system requirements and directed full-stack feature development across front-end interfaces and core Java backends in a fast-paced environment.',
    points: [
      'Architected and delivered end-to-end full-stack modules across front-end UI and Java back-end APIs.',
      'Formulated technical workflows and marketing strategies that elevated product reach and user engagement.',
      'Enforced modular architecture, automated test baselines, and code review hygiene across sprint cycles.',
    ],
  },
  {
    period: 'Jul 2023 — Sep 2023',
    role: 'Trainee — Python Developer',
    organisation: 'Novem Controls Pvt. Ltd.',
    location: 'India',
    summary:
      'Collaborated with senior engineers on a production Django web application, focusing on API design, test-driven development (TDD), and system reliability.',
    points: [
      'Researched and structured backend Django components in collaboration with senior software developers.',
      'Participated in rigorous code reviews, pair programming, and architectural design evaluations.',
      'Authored automated unit tests and applied TDD methodologies to eliminate regressions and enhance test coverage.',
    ],
  },
];

export const RESUME_EDUCATION: EducationEntry[] = [
  {
    period: 'Aug 2021 — Present',
    qualification: 'B.Tech, Computer Science & Engineering',
    institution: 'Kurukshetra University',
  },
  {
    period: '2019 — 2021',
    qualification: 'XII (High School)',
    institution: 'Army School',
  },
];

export const RESUME_SKILLS: SkillGroup[] = [
  {
    label: 'Architecture & Protocols',
    skills: [
      'System Architecture',
      'MTProto & WebSockets',
      'P2P & BitTorrent',
      'Redis Task Queues',
      'Android NDK / JNI',
      '16KB Memory Alignment',
    ],
  },
  {
    label: 'AI-Native Engineering & Direction',
    skills: [
      'Technical Research',
      'AI Code Orchestration',
      'Autonomous Agent Loops',
      'Codebase Verification',
      'Prompt Architecture',
      'TDD & Debugging',
    ],
  },
  {
    label: 'Core Languages & Runtimes',
    skills: [
      'Python 3.12',
      'Kotlin & Java',
      'C / C++',
      'TypeScript & Node.js',
      'FastAPI',
      'Electron & React 19',
    ],
  },
  {
    label: 'Databases & Infrastructure',
    skills: [
      'PostgreSQL & PostGIS',
      'SQLite & Room DB',
      'Redis Distributed Cache',
      'Docker & Containerization',
      'Git & CI/CD Pipelines',
      'Linux / Bash',
    ],
  },
];

export const RESUME_LANGUAGES = ['English', 'Hindi', 'Punjabi'];

export const RESUME_INTERESTS = [
  'Artificial Intelligence',
  'Distributed Systems & Concurrency',
  'Reverse Engineering',
  'Sports',
];

export const RESUME_PROJECTS = [
  {
    name: 'Cherrygram Plus',
    role: 'System Architect & Android Lead',
    description:
      'Researched upstream MTProto protocol specs and directed C++/NDK & Kotlin implementation for dynamic AGSL GPU shaders, 16 parallel socket streams, and zero-leak SQLite reaction indexing.',
  },
  {
    name: 'Official Bot Suite & Control Room',
    role: 'Backend Architect & Systems Engineer',
    description:
      'Designed asynchronous non-blocking event architecture handling 1,200+ msg/s with real-time FastAPI telemetry console, distributed Redis task queues, and automated FFmpeg streaming pipelines.',
  },
  {
    name: 'ADM Streamer',
    role: 'Mobile & Streaming Systems Architect',
    description:
      'Spearheaded P2P-to-HTTP video streaming architecture, integrating Node.js Mobile gateway, Android 15 16KB memory alignment, and hardware-accelerated VLC player patching.',
  },
  {
    name: 'Homies Tools (Agentic IDE)',
    role: 'AI Systems Architect & Creator',
    description:
      'Architected autonomous 5-stage multi-agent reasoning loop combining local Ollama models with cloud LLMs, structured line-by-line diff review, and multi-threaded ripgrep search.',
  },
  {
    name: 'MMU FleetRadar 3D',
    role: 'Geospatial & IoT Systems Lead',
    description:
      'Designed 3D geospatial telemetry architecture with 1-2 Hz WebSocket position ingestion, 60 FPS slerp trajectory interpolation, and MapLibre volumetric campus extrusions.',
  },
  {
    name: 'TeraBox Cloud Suite & Harvester',
    role: 'Full-Stack & Extension Engineer',
    description:
      'Built Manifest V3 Chrome extensions and static GitHub Pages direct video extraction engine bypassing download speed limitations.',
  },
];

export const RESUME_STATS = [
  { value: 2, suffix: '', label: 'Industry internships' },
  { value: 8, suffix: '+', label: 'Shipped systems' },
  { value: 16, suffix: '+', label: 'Technologies & tools' },
  { value: 3, suffix: '', label: 'Languages spoken' },
];
