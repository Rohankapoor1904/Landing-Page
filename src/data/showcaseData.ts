export type ShowcaseVisual = 'phone' | 'console' | 'player';

export interface ShowcaseStep {
  kicker: string;
  title: string;
  body: string;
  bullets: string[];
}

export interface ShowcaseAct {
  id: 'cherrygram' | 'bot-suite' | 'streamer';
  index: string;
  product: string;
  category: string;
  tagline: string;
  summary: string;
  status: string;
  version: string;
  platform: string;
  accent: string;
  accentSoft: string;
  visual: ShowcaseVisual;
  steps: [ShowcaseStep, ShowcaseStep, ShowcaseStep];
  chips: string[];
  metrics: { label: string; value: string }[];
  stack: string[];
  githubUrl: string;
  releaseUrl?: string;
  liveUrl?: string;
}

export const SHOWCASE_ACTS: ShowcaseAct[] = [
  {
    id: 'cherrygram',
    index: '01',
    product: 'Cherrygram Plus',
    category: 'Android client',
    tagline: 'A Telegram client rebuilt for people who live in it.',
    summary:
      'A hardened, high-performance Telegram Android client built with Kotlin, Java and C++/JNI — ghost mode, anti-delete retention, GPU shaders and 16 parallel transfer streams.',
    status: 'Production active',
    version: 'v10.19.18',
    platform: 'Android · upstream 13.0.3',
    accent: '#fb7185',
    accentSoft: 'rgba(251, 113, 133, 0.14)',
    visual: 'phone',
    chips: ['Ghost Mode 2.0', 'Anti-delete engine', 'AGSL · 120Hz', '10 accounts'],
    steps: [
      {
        kicker: 'The product',
        title: 'A client for the people who never close Telegram.',
        body: 'Cherrygram Plus is a deeply modified Android client built on top of upstream Telegram. The native MTProto engine, JNI bindings and Kotlin UI are rebuilt for speed, privacy and control — not just a theme.',
        bullets: ['Native C++ MTProto engine over JNI', '120Hz frame pacing and AGSL shaders', '10 isolated accounts in one app'],
      },
      {
        kicker: 'What is inside',
        title: 'Ghost mode, anti-delete, and media that stays.',
        body: 'Stealth listening with zero read receipts, full retention of deleted messages and albums, LaTeX and table rendering, and a smart wake-lock that keeps transfers alive with the screen off.',
        bullets: ['Ghost Mode 2.0 with read-on-reply', 'Deleted bubbles, captions and albums retained', 'Screen-off WakeLock for background transfers'],
      },
      {
        kicker: 'Get it',
        title: 'Signed builds for arm64, v7a and universal.',
        body: 'Production releases are versioned, signed and published continuously. The source is public, and every release ships as installable APKs for the three common Android targets.',
        bullets: ['arm64-v8a / armeabi-v7a / universal', 'Upstream synced with Telegram 13.0.3', 'Source and release binaries on GitHub'],
      },
    ],
    metrics: [
      { label: 'Download streams', value: '16 parallel' },
      { label: 'Display refresh', value: '120Hz native' },
      { label: 'Active accounts', value: '10 sessions' },
      { label: 'Build targets', value: '3 ABIs' },
    ],
    stack: ['Android SDK', 'Kotlin', 'Java', 'C++ / JNI', 'AGSL', 'SQLite', 'MTProto'],
    githubUrl: 'https://github.com/Rohankapoor1904/cherrygram-plus',
    releaseUrl: 'https://github.com/Rohankapoor1904/cherrygram-plus-releases',
  },
  {
    id: 'bot-suite',
    index: '02',
    product: 'Official Bot Suite',
    category: 'Bot platform',
    tagline: 'Moderation, media and analytics in one bot platform.',
    summary:
      'An async Telegram bot ecosystem with smart group locks, anti-spam, TeraBox streaming and a FastAPI control room — built to keep state under real traffic.',
    status: 'Production active',
    version: 'v4.2.0',
    platform: 'Python 3.12 · PTB v21 · Pyrogram v2',
    accent: '#22d3ee',
    accentSoft: 'rgba(34, 211, 238, 0.13)',
    visual: 'console',
    chips: ['/lock on', '1,200 msg/s', 'Redis < 2ms', 'TeraBox gateway'],
    steps: [
      {
        kicker: 'The product',
        title: 'One bot platform instead of six fragile scripts.',
        body: 'Official Bot Suite handles moderation, group security, broadcast cycles, cloud stream extraction and premium verification behind a single async architecture — with a FastAPI dashboard next to the bot loop.',
        bullets: ['Async python-telegram-bot + Pyrogram v2 core', 'FastAPI telemetry and administration console', 'One-command Docker deployment'],
      },
      {
        kicker: 'Under load',
        title: '1,200 messages a second without dropping state.',
        body: 'Redis queues absorb spikes, session state stays distributed, and moderation commands run instantly. Invite-link neutralisation, bot kicking and regex filters are applied before spam reaches the group.',
        bullets: ['Redis queue and session store', 'Smart locks: ban, mute, kick, /dwarn', 'Zero message drops during traffic spikes'],
      },
      {
        kicker: 'Operate it',
        title: 'A control room, not a scrollback of console logs.',
        body: 'The dashboard exposes uptime, memory, queue depth and task health in real time. TeraBox links resolve through an FFmpeg worker pool, and Cherrygram clients verify premium tokens through a dedicated bridge.',
        bullets: ['99.98% monitored uptime', 'TeraBox + FFmpeg streaming workers', 'Cherrygram premium verification bridge'],
      },
    ],
    metrics: [
      { label: 'Monitored uptime', value: '99.98%' },
      { label: 'Throughput', value: '1,200 msg/s' },
      { label: 'Cache latency', value: '< 2ms' },
      { label: 'Gateway', value: 'TeraBox + FFmpeg' },
    ],
    stack: ['Python 3.12', 'python-telegram-bot', 'Pyrogram', 'FastAPI', 'Redis', 'FFmpeg', 'Docker'],
    githubUrl: 'https://github.com/Rohankapoor1904/Official-Bot',
  },
  {
    id: 'streamer',
    index: '03',
    product: 'ADM Streamer',
    category: 'Streaming engine',
    tagline: 'Torrents and cloud debrid, streamed like any video.',
    summary:
      'A mobile streaming app that runs a Node.js BitTorrent gateway on-device, resolves Multi-Debrid links and pipes everything into hardware-accelerated VLC playback.',
    status: 'Verified release',
    version: 'v2.4.0',
    platform: 'React Native · Expo SDK 54',
    accent: '#818cf8',
    accentSoft: 'rgba(129, 140, 248, 0.14)',
    visual: 'player',
    chips: ['< 1.8s first frame', '4K scrub', 'Real-Debrid', 'VegaCast'],
    steps: [
      {
        kicker: 'The product',
        title: 'A streaming app that never shows you a buffering spinner.',
        body: 'ADM Streamer merges peer-to-peer BitTorrent streaming with Multi-Debrid cloud resolution. An embedded Node.js gateway turns torrent pieces into a local HTTP stream that VLC plays immediately.',
        bullets: ['Node.js Mobile torrent-to-HTTP gateway', 'Real-Debrid, AllDebrid and Premiumize', 'Hardware-accelerated VLC playback'],
      },
      {
        kicker: 'The engine',
        title: 'Pieces in, frames out — first frame under 1.8 seconds.',
        body: 'Sequential piece prioritisation keeps playback ahead of the download, so high-bitrate 4K files scrub without waiting for the full file. Patched 16KB page alignment keeps it compliant on Android 15.',
        bullets: ['< 1.8s to first frame', 'Zero-buffer sequential prioritisation', 'Android 15 · 16KB memory alignment'],
      },
      {
        kicker: 'Everywhere',
        title: 'Scrub on the phone, finish on the TV, keep downloading.',
        body: 'Stremio addon protocol support unlocks dynamic catalogues, VegaCast mirrors playback to a smart TV over LAN, and a foreground service keeps downloads and seeding alive in the background.',
        bullets: ['Embedded Torrentio addon server', 'VegaCast WebSocket TV mirroring', 'Background download manager'],
      },
    ],
    metrics: [
      { label: 'First frame', value: '< 1.8s' },
      { label: 'Android target', value: '15 · 16KB' },
      { label: 'Debrid providers', value: '3' },
      { label: 'Casting', value: 'VegaCast' },
    ],
    stack: ['React Native', 'Expo SDK 54', 'Node.js Mobile', 'TypeScript', 'VLC', 'WebSockets', 'Stremio'],
    githubUrl: 'https://github.com/Rohankapoor1904/streamer',
    releaseUrl: 'https://github.com/Rohankapoor1904/streamer-releases',
  },
];
