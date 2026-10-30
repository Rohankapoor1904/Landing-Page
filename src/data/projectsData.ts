import type { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'cherrygram-plus',
    title: 'Cherrygram Plus',
    tagline: 'Hardened, Privacy-Centric Telegram Client for Android',
    category: 'Android Client',
    version: '10.19.18',
    baseVersion: 'Upstream Telegram 13.0.3 (Code 7200)',
    status: 'Production Active',
    description:
      'A deeply modified, high-performance Telegram Android client built with C++ (NDK/JNI), Java, and Kotlin. Designed for extreme power users requiring stealth messaging, dynamic AGSL GPU shaders, lossless media transfers, anti-delete message retention, and 16-channel concurrent network acceleration.',
    architectureHighlights: [
      'Native MTProto C++ protocol engine with custom JNI bindings and RLottie dynamic vector rendering',
      'AGSL GPU-accelerated motion wallpapers, dynamic shader blurs, and 120Hz frame pacing sync',
      'Speed Boost 2.0 multi-threaded socket engine with up to 16 parallel Wi-Fi transfer streams',
      'Persistent SQLite reaction tag indexing in messages_v2 database with zero-leak lifecycle clamping'
    ],
    keyFeatures: [
      'Ghost Mode 2.0: Stealth voice/video message listening with zero read-receipts + Read-on-Reply',
      'Anti-Delete Media Engine: Retains full bubble layouts, captions, and media albums from deleted messages',
      'Rich Tools Suite: LaTeX formula rendering (LatexInliner), table grids, and H1–H6 Markdown typography',
      'Screen-Off Smart WakeLock: Guaranteed background uploads/downloads without OS battery sleep interruption',
      'Custom Emoji Preservation: Full entity pass-through for Telegram Premium custom emojis & Star Gifts 3D shaders',
      'Multi-Account Fleet: Up to 10 isolated active Telegram sessions running concurrently'
    ],
    techStack: ['Android SDK', 'Kotlin', 'Java', 'C++ (JNI / NDK)', 'AGSL Shaders', 'Gradle', 'SQLite', 'MTProto'],
    metrics: [
      { label: 'Download Streams', value: '16 Parallel' },
      { label: 'Display Refresh', value: '120Hz Native' },
      { label: 'Max Active Accounts', value: '10 Sessions' },
      { label: 'Binary Targets', value: 'arm64-v8a / v7a / Universal' }
    ],
    githubUrl: 'https://github.com/Rohankapoor1904/cherrygram-plus',
    releaseUrl: 'https://github.com/Rohankapoor1904/cherrygram-plus-releases',
    accentColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    iconName: 'Smartphone'
  },
  {
    id: 'adm-streamer',
    title: 'ADM Streamer',
    tagline: 'Zero-Buffer BitTorrent & Multi-Debrid Streaming Architecture',
    category: 'Media & Streaming',
    version: '2.4.0',
    baseVersion: 'React Native 0.81.5 + Expo SDK 54',
    status: 'Verified Release',
    description:
      'A full-featured mobile streaming powerhouse that merges BitTorrent peer-to-peer streaming with Multi-Debrid cloud resolution. Runs an embedded Node.js Mobile gateway directly on Android to pipe torrent pieces into live HTTP video streams playable in hardware-accelerated VLC.',
    architectureHighlights: [
      'Embedded Node.js Mobile BitTorrent-to-HTTP gateway running an in-process local streaming server',
      'Custom patched 16KB memory page alignment compliant with the Android 15 NDK standard',
      'Direct API integrations with Real-Debrid, AllDebrid, and Premiumize for ultra-fast cloud file resolution',
      'Programmatic VLC media player patching with native dual audio, soft subtitle extraction, and VegaCast'
    ],
    keyFeatures: [
      'Local Stremio Addon Protocol: Runs embedded Torrentio addon server for infinite catalog indexing',
      'Zero-Buffer Video Playback: Sequential piece prioritization ensures instant scrubbing on high-bitrate 4K files',
      'VegaCast TV Mirroring: WebSocket remote control and low-latency LAN video casting to smart TVs',
      'Background Download Manager: Continues torrent seeding/downloading through Android Foreground Services'
    ],
    techStack: ['React Native', 'Expo SDK 54', 'Node.js Mobile', 'TypeScript', 'VLC Core', 'WebSockets', 'Torrentio'],
    metrics: [
      { label: 'Streaming Latency', value: '< 1.8s to First Frame' },
      { label: 'Android Target', value: 'Android 15 (16KB Align)' },
      { label: 'Debrid Providers', value: 'Real-Debrid / AllDebrid / Premiumize' },
      { label: 'Catalog Indexing', value: 'Stremio Protocol' }
    ],
    githubUrl: 'https://github.com/Rohankapoor1904/streamer',
    releaseUrl: 'https://github.com/Rohankapoor1904/streamer-releases',
    accentColor: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    iconName: 'PlayCircle'
  },
  {
    id: 'official-bot-suite',
    title: 'Official Bot Suite',
    tagline: 'Asynchronous Telegram Bot Platform & FastAPI Web Dashboard',
    category: 'Bot Suite & Backend',
    version: '4.2.0',
    baseVersion: 'Python 3.12+ • python-telegram-bot v21 • Pyrogram v2',
    status: 'Production Active',
    description:
      'An asynchronous, enterprise-grade Telegram automation ecosystem and REST management dashboard. Features smart group protection, automated link neutralization, cloud stream extraction, Redis queue pipelines, and an integrated FastAPI Web Administration console.',
    architectureHighlights: [
      'Non-blocking async/await event architecture handling high-throughput message streams without throttling',
      'FastAPI REST Web Dashboard running alongside the bot loop for real-time telemetry, memory, and task monitoring',
      'Cherrygram App Verification Bridge (/api/cherrygram/premium/verify) syncing mobile client tokens automatically',
      'TeraBox Cloud Gateway: Resolves and transcodes direct video streams via FFmpeg background worker pools'
    ],
    keyFeatures: [
      'Smart Moderation Locks: Automated bot kicking, anti-channel spam, invite link neutralization, and regex filtering',
      'Cyclical Repeat Engine: Queues multi-part messages or media albums with automated cleanup of prior cycles',
      'Granular Moderation Commands: Instant execution of /dwarn (delete and warn), /ban, /mute, /kick, and lock aliases',
      'Redis Task Queue & Session Store: Distributed state management ensuring zero message drops during traffic spikes'
    ],
    techStack: ['Python 3.12', 'python-telegram-bot', 'Pyrogram v2', 'FastAPI', 'Redis', 'FFmpeg', 'Docker', 'SQLite'],
    metrics: [
      { label: 'Uptime Reliability', value: '99.98%' },
      { label: 'Message Throughput', value: '1,200+ msg/sec' },
      { label: 'Gateway Engine', value: 'TeraBox + FFmpeg' },
      { label: 'Cache Latency', value: '< 2ms (Redis)' }
    ],
    githubUrl: 'https://github.com/Rohankapoor1904/Official-Bot',
    accentColor: '#00f2fe',
    glowColor: 'rgba(0, 242, 254, 0.4)',
    iconName: 'Bot'
  },
  {
    id: 'homies-tools',
    title: 'Homies Tools (Agentic IDE)',
    tagline: 'Autonomous Multi-Agent Desktop IDE & AI Development Workspace',
    category: 'AI & Multi-Agent IDE',
    version: '1.2.0',
    baseVersion: 'Electron 40 + React 19 + TypeScript + Vite',
    status: 'Production Active',
    description:
      'An AI-assisted desktop IDE and autonomous multi-agent workspace built for modern software engineers. Combines local privacy-first Ollama models with cloud LLMs (Claude 3.5 Sonnet, GPT-4o) in an autonomous state-machine loop that plans, searches, patches, and verifies codebases.',
    architectureHighlights: [
      'Multi-turn autonomous reasoning loop executing searching, reading, planning, editing, and terminal testing',
      'Dual AI Model Engine with dynamic fallbacks, loop guards, auto-continuation, and stale VRAM cache eviction',
      'Unified Diff Staging: Generates structured line-by-line diff patches staged for one-click developer review',
      'SQLite Persistent Memory (memory.db) and semantic RAG indexing preserving codebase context across sessions'
    ],
    keyFeatures: [
      'Ripgrep-powered contextual regex search across multi-gigabyte codebases with glob filtering',
      'Sandboxed Terminal Execution: Safe command runner streaming live stdout/stderr back into the IDE interface',
      'Auto-Healing Parser: Automatically repairs malformed JSON tool calls and handles token truncation gracefully',
      'Glassmorphic Desktop UI: Ultra-responsive 60 FPS token streaming with dark neon theme and syntax highlighting'
    ],
    techStack: ['Electron 40', 'React 19', 'TypeScript', 'Vite', 'Node.js', 'Express', 'SQLite', 'Ollama', 'Claude API'],
    metrics: [
      { label: 'Token Stream Rate', value: '60 FPS Smooth' },
      { label: 'Agent Loop Steps', value: 'Autonomous 5-Stage' },
      { label: 'Supported Models', value: 'Ollama / Claude / GPT-4o' },
      { label: 'File Search', value: 'Ripgrep Multi-Thread' }
    ],
    githubUrl: 'https://github.com/Rohankapoor1904/Homies-Tool-',
    accentColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    iconName: 'Cpu'
  },
  {
    id: 'mmu-fleetradar',
    title: 'MMU FleetRadar 3D',
    tagline: 'Real-Time 3D Geospatial Transit Tracking & Campus Telemetry',
    category: 'Geospatial & Web',
    version: '1.5.0',
    baseVersion: 'MapLibre GL JS + PostGIS + WebSockets',
    status: 'Verified Release',
    description:
      'A high-frequency 3D geospatial tracking system mapping transit fleets across university campuses with volumetric 3D building extrusions, 1-2 Hz WebSocket position telemetry, and 60 FPS lerp/slerp trajectory interpolation.',
    architectureHighlights: [
      'MapLibre GL JS 3D volumetric extrusion of multi-campus physical buildings with dynamic sun lighting',
      'Real-time WebSocket ingestion pipeline with dead-reckoning extrapolation and spherical linear interpolation',
      'Multi-persona operational matrix: student geofencing alerts, driver offline queue console, admin safety monitor',
      'Companion native Android APK for field transit drivers with automatic reconnect and battery-saving GPS'
    ],
    keyFeatures: [
      'Sub-Second Telemetry: Live bus coordinates rendered with smooth heading rotation and speed tracking',
      'Geofenced Notification Hub: Triggers push notifications when buses cross campus perimeter milestones',
      'Offline Dispatch Buffer: Stores driver telemetry locally during cellular dropouts and flushes on reconnect'
    ],
    techStack: ['MapLibre GL JS', 'TypeScript', 'WebSockets', 'Node.js', 'PostGIS', 'Android Java', 'TailwindCSS'],
    metrics: [
      { label: 'Telemetry Frequency', value: '1 - 2 Hz Ingestion' },
      { label: 'Render Smoothing', value: '60 FPS Lerp/Slerp' },
      { label: 'Spatial Engine', value: '3D Volumetric Extrusions' },
      { label: 'Connectivity', value: 'Auto-Reconnect WebSockets' }
    ],
    githubUrl: 'https://github.com/Rohankapoor1904/bus-Tracking-',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    iconName: 'Navigation'
  },
  {
    id: 'terabox-web-suite',
    title: 'TeraBox Cloud Suite & Harvester',
    tagline: 'Direct Stream Video Extractor & Manifest V3 Harvester',
    category: 'Media & Streaming',
    version: '2.0.0',
    baseVersion: 'Chrome Manifest V3 + Vanilla TS + GitHub Pages',
    status: 'Verified Release',
    description:
      'A specialized suite of web scrapers and media extractors. Includes a browser-based TeraBox video player that bypasses client restrictions and Manifest V3 Chrome extensions for automated network cookie extraction and community link harvesting.',
    architectureHighlights: [
      'Direct video stream resolving engine running on GitHub Pages with HTML5 video player integration',
      'Manifest V3 Chrome extensions inspecting encrypted network payloads and extracting auth tokens safely',
      'Regex-powered community link harvester automating Telegram and Discord invite extraction from web indexes'
    ],
    keyFeatures: [
      'Instant Video Streaming: Bypasses download speed caps for smooth browser-based playback',
      'Automated Link Extraction: Recursively discovers public community channels with zero manual effort',
      'Zero-Dependency Static Host: Blazing fast load times with client-side token parsing'
    ],
    techStack: ['TypeScript', 'Chrome Extension MV3', 'HTML5 Video', 'Web APIs', 'GitHub Pages'],
    metrics: [
      { label: 'Extension Spec', value: 'Manifest V3' },
      { label: 'Deployment', value: 'GitHub Pages CI/CD' },
      { label: 'Link Extraction', value: 'Regex Multi-Pattern' },
      { label: 'Video Engine', value: 'HTML5 Direct Stream' }
    ],
    liveUrl: 'https://rohankapoor1904.github.io/terabox/',
    githubUrl: 'https://github.com/Rohankapoor1904/terabox',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    iconName: 'Globe'
  },
  {
    id: 'weatherflow-android',
    title: 'WeatherFlow Android',
    tagline: 'Location-Aware Real-Time Meteorology & 15-Day Predictive Engine',
    category: 'Android Client',
    version: '1.1.0',
    baseVersion: 'Android 14 (API 34) • Kotlin 1.9 • Coroutines',
    status: 'Verified Release',
    description:
      'A native Android meteorological application engineered with Java and Kotlin. Delivers real-time atmospheric updates, sub-meter GPS location detection, and deep 15-day forward forecasting with instant search indexing for any global coordinates.',
    architectureHighlights: [
      'Modern MVVM architecture with Kotlin Coroutines and StateFlow for unidirectional data flow',
      'FusedLocationProviderClient integration providing high-accuracy GPS with minimal battery overhead',
      'Offline SQLite Room database caching forecast snapshots for immediate rendering during connectivity loss',
      'Asynchronous OkHttp3/Retrofit2 network pipeline with payload compression and cache headers'
    ],
    keyFeatures: [
      'Automatic Location Detection: Seamless GPS coordinate resolution with reverse geocoding to local municipality',
      '15-Day Extended Weather Horizon: Day-by-day and hour-by-hour temperature curves and precipitation indices',
      'Dynamic Meteorological Metrics: Live tracking of UV index, atmospheric barometric pressure, dew point, and wind gusts',
      'Global Search Autocomplete: Debounced instant search query resolving international cities in under 50ms'
    ],
    techStack: ['Kotlin', 'Java', 'Android SDK', 'MVVM', 'Room SQLite', 'Retrofit2', 'Coroutines', 'Material 3'],
    metrics: [
      { label: 'Forecast Horizon', value: '15 Days Forward' },
      { label: 'Query Latency', value: '< 50ms (Cached)' },
      { label: 'Location Detection', value: 'Instant Fused GPS' },
      { label: 'Offline Support', value: 'Room SQLite Cache' }
    ],
    githubUrl: 'https://github.com/Rohankapoor1904',
    accentColor: '#0ea5e9',
    glowColor: 'rgba(14, 165, 233, 0.4)',
    iconName: 'CloudSun'
  },
  {
    id: 'cinestream-web',
    title: 'CineStream Web Platform',
    tagline: 'Dynamic Responsive Movie Catalog & Media Discovery Interface',
    category: 'Media & Streaming',
    version: '1.0.0',
    baseVersion: 'HTML5 • CSS3 Modern Tokens • Vanilla ES6+',
    status: 'Verified Release',
    description:
      'A responsive, high-performance web movie discovery platform. Features user-friendly navigation, instant category filtering, trailer modals, IMDb/TMDB rating badges, and comprehensive movie synopsis breakdowns optimized for all viewport sizes.',
    architectureHighlights: [
      'Semantic HTML5 and modular CSS3 architecture with zero bloated framework overhead for sub-second page loads',
      'Asynchronous REST API pipeline indexing movie metadata, cast hierarchies, and high-resolution posters',
      'Adaptive CSS Grid and Flexbox responsive layouts fluidly transitioning from mobile screens to 4K displays',
      'Native WebP poster compression and lazy image decoding ensuring rapid First Contentful Paint'
    ],
    keyFeatures: [
      'Interactive Media Catalog: Browse trending movies, upcoming premieres, and top-rated critical masterpieces',
      'Embedded Trailer Player: Modal video overlays with instant YouTube trailer streaming without page reloads',
      'Deep Movie Metadata: Real-time ratings, genre tags, director/cast filmographies, and audience reviews',
      'Touch-Optimized Mobile Navigation: Fluid gestures and ergonomic controls across smartphone viewports'
    ],
    techStack: ['HTML5', 'CSS3 Modern', 'JavaScript ES6+', 'REST APIs', 'Responsive Design', 'Vite'],
    metrics: [
      { label: 'Layout Responsiveness', value: '100% Fluid' },
      { label: 'First Contentful Paint', value: '< 1.0s' },
      { label: 'Media Indexing', value: '10,000+ Titles' },
      { label: 'Bundle Overhead', value: 'Zero Framework Bloat' }
    ],
    githubUrl: 'https://github.com/Rohankapoor1904',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    iconName: 'Film'
  }
];
