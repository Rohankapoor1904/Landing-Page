import type { ServiceOffering } from '../types';

export const SERVICES_DATA: ServiceOffering[] = [
  {
    id: 'custom-mobile-apps',
    title: 'Custom Android & Mobile Client Architecture',
    shortDesc: 'Hardened Telegram forks, custom media players, NDK/C++ JNI modifications, and 120Hz display optimization.',
    fullDesc:
      'Engineered from the ground up for power, privacy, and low-latency execution. We deliver customized Android builds, upstream base synchronization, custom AGSL shaders, reverse-engineered protocol extensions, lossless media sending engines, and battery-safe background services with Smart WakeLocks.',
    icon: 'Smartphone',
    tags: ['Android NDK / C++', 'Kotlin & Java', 'React Native & Expo', 'AGSL Shaders', 'Telegram Forks', '120Hz Pacing'],
    deliverables: [
      'Production-ready signed APKs & App Bundles (arm64-v8a, armeabi-v7a, universal)',
      'Custom UI/UX overhauls with liquid blur shaders and custom layout engines',
      'High-speed multi-threaded networking engines (16+ parallel transfer streams)',
      'Android 15+ 16KB memory page alignment and NDK build optimizations',
      'Automated GitHub Actions CI/CD release pipelines for one-click publishing'
    ],
    highlightMetric: 'Up to 16x Network Acceleration',
    accentColor: '#f43f5e'
  },
  {
    id: 'bot-infrastructure',
    title: 'Telegram & Discord High-Throughput Bot Ecosystems',
    shortDesc: 'Asynchronous bot fleets, group moderation locks, anti-spam matrices, and real-time FastAPI web dashboards.',
    fullDesc:
      'High-concurrency bot solutions built with Python 3.12, python-telegram-bot v21, Pyrogram v2, and Discord.py. Architected with Redis distributed queues, automated group security locks, TeraBox stream extraction, cyclically scheduled broadcast engines, and comprehensive telemetry administration portals.',
    icon: 'Bot',
    tags: ['Python 3.12+', 'python-telegram-bot', 'Pyrogram v2', 'FastAPI & Uvicorn', 'Redis Queues', 'Discord API'],
    deliverables: [
      'Modular bot core capable of processing 1,000+ messages/sec without API rate throttling',
      'Automated security shields: bot kickers, anti-channel spam, invite link neutralization',
      'FastAPI web management console for toggling locks, viewing stats, and broadcasting',
      'Custom webhook bridges connecting mobile clients to backend premium tier servers',
      'Dockerized deployment configs with health check watchdogs and zero-downtime auto-restart'
    ],
    highlightMetric: '99.98% Monitored Uptime',
    accentColor: '#00f2fe'
  },
  {
    id: 'streaming-apis',
    title: 'Embedded Streaming Engines & High-Performance APIs',
    shortDesc: 'BitTorrent-to-HTTP gateways, Multi-Debrid cloud resolution, FFmpeg transcoding, and real-time WebSockets.',
    fullDesc:
      'Specialized backend and on-device streaming pipelines. From zero-buffer BitTorrent gateways running natively on mobile to Multi-Debrid cloud resolvers (Real-Debrid, AllDebrid, Premiumize) and hardware-accelerated VLC player integrations with soft subtitle extraction and smart TV casting.',
    icon: 'Layers',
    tags: ['Node.js Mobile', 'VLC Core', 'BitTorrent Protocol', 'Multi-Debrid APIs', 'FFmpeg Transcoding', 'WebSockets'],
    deliverables: [
      'Zero-buffer local streaming gateway converting torrent streams into standard HTTP video',
      'Multi-Debrid API resolvers bypassing ISP throttling for instant 4K scrubbing',
      'Stremio addon protocol compliance for dynamic community scrapers and catalogs',
      'High-frequency WebSocket telemetry pipelines with 60 FPS dead-reckoning smoothing',
      'REST & GraphQL backend services optimized for minimal memory and millisecond response times'
    ],
    highlightMetric: '< 1.8s Time to First Frame',
    accentColor: '#6366f1'
  },
  {
    id: 'ai-agents-tools',
    title: 'Autonomous AI Agents & Custom Developer Tools',
    shortDesc: 'Multi-turn autonomous coding loops, local Ollama integrations, cloud LLM bridges, and Electron desktop IDEs.',
    fullDesc:
      'Empowering engineering teams with agentic software systems. We build autonomous developer tools featuring state-machine execution loops (searching, planning, editing, verifying), dual local/cloud LLM switching, unified diff review staging, and semantic RAG vector memory indexing.',
    icon: 'Cpu',
    tags: ['Electron 40', 'React 19 & TypeScript', 'Ollama (Local Models)', 'Claude 3.5 Sonnet', 'GPT-4o API', 'SQLite RAG'],
    deliverables: [
      'Autonomous multi-turn agent loops with loop guards, auto-continuation, and VRAM management',
      'Ripgrep-powered contextual codebase indexing and line-by-line diff staging interfaces',
      'Sandboxed terminal runners with live streaming output and auto-healing JSON parsers',
      'Custom cross-platform desktop shells (Windows, macOS, Linux) with 60 FPS dark neon UI',
      'Persistent SQLite context memory preserving project memory across reboots'
    ],
    highlightMetric: '5-Stage Autonomous Loop',
    accentColor: '#a855f7'
  }
];
