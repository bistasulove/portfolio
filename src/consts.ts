// Central site metadata.

export const SITE = {
  name: 'Sulav Raj Bista',
  role: 'Senior Software Engineer',
  location: 'Brisbane, AU',
  status: 'Open to senior roles',
  description:
    'Senior software engineer (7+ years) building and scaling high-traffic APIs and cloud platforms. I own critical modules end to end — architecture, reliability, and the tooling around them.',
  email: 'bistasulavraj@gmail.com',
  phone: '+61 415 706 747',
  github: 'https://github.com/bistasulove',
  linkedin: 'https://www.linkedin.com/in/bistasulove',
} as const;

// Giscus comments (GitHub Discussions). Enable Discussions on the repo, then get
// repoId + categoryId from https://giscus.app and paste them here. Until both are
// filled in, the comments section renders nothing.
export const GISCUS = {
  repo: 'bistasulove/portfolio',
  repoId: 'R_kgDOStsiIQ',
  category: 'General',
  categoryId: 'DIC_kwDOStsiIc4C-RMf',
} as const;

// GitHub username, used for the contribution graph + profile links.
export const GITHUB_USERNAME = 'bistasulove';

export interface Repo {
  name: string;
  description: string;
  language: string;
  url: string;
}

// Pinned repositories shown in the "On GitHub" section. Public repos only.
// Edit freely — descriptions/languages are hand-maintained, not fetched.
export const PINNED_REPOS: Repo[] = [
  {
    name: 'pantry-run',
    description: 'Real-time, offline-first shopping-list PWA for households.',
    language: 'TypeScript',
    url: 'https://github.com/bistasulove/pantry-run',
  },
  {
    name: 'banshawali-frontend',
    description: 'Interactive family-tree UI built with React Flow.',
    language: 'TypeScript',
    url: 'https://github.com/bistasulove/banshawali-frontend',
  },
  {
    name: 'banshawali-backend',
    description: 'Multi-tenant genealogy API on Django REST Framework.',
    language: 'Python',
    url: 'https://github.com/bistasulove/banshawali-backend',
  },
  {
    name: 'portfolio',
    description: 'This site — built with Astro and Tailwind CSS.',
    language: 'Astro',
    url: 'https://github.com/bistasulove/portfolio',
  },
];

export const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
] as const;

export const TECH_TAGS = ['python', 'django', 'postgresql', 'aws', 'celery', 'react', 'docker'] as const;

export interface CareerEntry {
  period: string;
  role: string;
  company: string;
  location: string;
  // One-line summary shown on the timeline (home + about).
  highlight: string;
  // Detailed achievement bullets shown on the resume page.
  bullets: string[];
  // Tech line shown on the resume page.
  tech: string;
}

export const CAREER: CareerEntry[] = [
  {
    period: 'Jul 2021 — Mar 2026',
    role: 'Senior Software Engineer',
    company: 'Airbase (acquired by Paylocity)',
    location: 'Remote',
    highlight:
      'Technical owner of the Vendor Management module - auth, onboarding, tax compliance, and payments — held to 99.99% success at p95 < 700ms.',
    bullets: [
      'Served as technical owner of the Vendor Management module — a core domain spanning authentication, onboarding, tax compliance, and payments — and the single point of escalation across engineering, product, support, and fraud teams.',
      'Architected a 2FA authentication framework using Auth0, Twilio, and Google Authenticator that mitigated vendor account fraud and saved an estimated $1M+ annually in fraud losses.',
      'Sustained a 99.99% API success rate and p95 latency under 700ms across the module under peak production load, owning module-wide SLOs end to end.',
      'Designed asynchronous tax-validation microservices for US and international markets via third-party APIs and webhooks, reducing compliance penalties by an estimated $100K+ annually.',
      'Built a self-serve vendor onboarding flow with Django and OneSchema, cutting onboarding time by 86% and eliminating recurring manual toil.',
      'Implemented Redis-backed distributed caching that improved API throughput by 45% and absorbed peak traffic without scaling infrastructure spend.',
      'Built internal tooling adopted across Engineering, Support, and Fraud — vendor impersonation, bulk onboarding, and a 2FA-reset workflow — eliminating dozens of weekly engineering interrupts.',
      'Grew test coverage by 54% through Pytest suites and legacy refactoring, and established observability across Datadog, Metabase, and Sentry that reduced critical-incident MTTR by 40%.',
    ],
    tech: 'Python, Django REST Framework, PostgreSQL, Celery, Redis, Kafka, ElasticSearch, Heroku, React, Auth0, Datadog, Sentry, Pytest',
  },
  {
    period: 'Nov 2020 — Jul 2021',
    role: 'Lead Software Developer',
    company: 'Revv Inc',
    location: 'Lalitpur, Nepal',
    highlight:
      'Built and scaled a high-traffic Flask backend on AWS for dynamic ad-publishing portals serving multiple client portals.',
    bullets: [
      'Built and scaled a high-traffic Flask backend on AWS for dynamic ad-publishing portals, handling peak concurrent request loads across multiple client portals.',
      'Developed real-time analytics dashboards that improved client revenue tracking and supported data-driven decision-making.',
      'Designed a service-oriented architecture with optimised inter-service communication, improving system modularity and fault tolerance.',
    ],
    tech: 'Python, Flask, PostgreSQL, Node.js, React, Prisma ORM, AWS',
  },
  {
    period: 'Feb 2019 — Oct 2020',
    role: 'Software Development Engineer II',
    company: 'Fyle (acquired by Sage)',
    location: 'Bangalore, India',
    highlight:
      'Lifted OCR receipt-classification accuracy from 35% to 95% and shipped a secure ACH payment service with micro-deposit verification.',
    bullets: [
      'Improved OCR receipt-classification accuracy from 35% to 95% through model tuning and pipeline redesign, enhancing UX and reducing manual processing overhead.',
      'Designed and launched a secure ACH payment service integrating third-party APIs and webhooks, with a micro-deposit payee-verification framework.',
      'Engineered automated statement parsers for Visa and Amex transactions delivered over SFTP, processing thousands of financial records reliably.',
      'Scaled high-traffic REST APIs through targeted database indexing and query optimisation, reducing average response times by 40%.',
    ],
    tech: 'Python, Flask, Java Dropwizard, PostgreSQL, AngularJS, Docker, Kubernetes, RabbitMQ, AWS',
  },
  {
    period: 'Jun 2018 — Jan 2019',
    role: 'Software Engineer',
    company: 'Odessa Technologies',
    location: 'Bangalore, India',
    highlight:
      'Delivered client-facing features and resolved production issues on a legacy financial platform within Agile cycles.',
    bullets: [
      'Delivered client-facing features and resolved production issues on a legacy financial platform, collaborating closely with QA and product teams within Agile sprint cycles.',
    ],
    tech: 'C#, ASP.NET Framework, MS SQL Server, LINQ',
  },
];

export interface EducationEntry {
  period: string;
  degree: string;
  institution: string;
  location: string;
  notes: string[];
}

export const EDUCATION: EducationEntry[] = [
  {
    period: '2014 — 2018',
    degree: 'B.E., Information Science and Engineering',
    institution: 'Ramaiah Institute of Technology',
    location: 'Bangalore, India',
    notes: [
      'GPA 8.73/10. Awarded a full Merit Scholarship by the Government of India.',
      'Published research on "Predicting the Priority of Bug Reports Using Classification Algorithms" in the IJCSE journal.',
    ],
  },
];

export interface ResumeProject {
  name: string;
  year: string;
  // Matches the case-study slug under /work/[slug].
  slug: string;
  tagline: string;
  bullets: string[];
  tech: string;
}

// Concise resume-style project entries. Full case studies live in
// src/content/projects/. Keep ordering consistent with the featured work order.
export const PROJECTS: ResumeProject[] = [
  {
    name: 'HoneyDjango',
    year: '2026',
    slug: 'honeydj',
    tagline: 'Open-source honeypot & attacker-intelligence platform for Django',
    bullets: [
      'Built and published an open-source Django honeypot to PyPI (`honeydj`, MIT): middleware runs before URL resolution to answer scanner probes with convincing decoys, keeping the request hot path to a single insert and offloading all GeoIP, threat-feed, and fingerprinting work to Celery.',
      'Streamed enriched events to a live Leaflet attack map over Django Channels/WebSockets, and made the async pipeline concurrency-safe via row-locked, idempotent per-IP profiling so parallel workers never double-count an attacker’s threat score.',
    ],
    tech: 'Django REST Framework, Celery, Redis, Django Channels, Daphne (ASGI), PostgreSQL, PyPI',
  },
  {
    name: 'Pantry Run',
    year: '2026',
    slug: 'pantry-run',
    tagline: 'Real-time, offline-first shopping-list PWA for households',
    bullets: [
      'Built a real-time collaborative PWA (Next.js, React, Supabase) with optimistic updates and an offline IndexedDB write queue that reconciles via last-write-wins on reconnect; in daily use by several households.',
      'Engineered timezone-correct recurring reminders with pg_cron and an RRULE subset in Postgres, plus a three-tier item categoriser (keyword dictionary → rate-limited, cached Gemini LLM fallback).',
    ],
    tech: 'Next.js, React, TypeScript, Supabase (PostgreSQL/Realtime/Auth/Edge Functions), Tailwind, Vercel',
  },
  {
    name: 'EZTax Nepal',
    year: '2025',
    slug: 'eztax-nepal',
    tagline: 'Municipal advertisement-tax management SaaS',
    bullets: [
      'Independently designed, built, and launched a production SaaS for a private tax-collection firm: Django REST Framework with JWT-based RBAC and cursor-based pagination, plus a React frontend with client-side image compression before presigned S3 upload.',
      'Re-platformed from AWS (EC2/Docker/RDS/Amplify) to a lean self-hosted stack (Hetzner + systemd/Gunicorn, self-hosted PostgreSQL, Cloudflare), cutting monthly running cost to a fraction.',
    ],
    tech: 'Django REST Framework, React, PostgreSQL, AWS, Hetzner, Cloudflare',
  },
  {
    name: 'ImagePal',
    year: '2026',
    slug: 'imagepal',
    tagline: 'Privacy-first, in-browser image & PDF toolkit',
    bullets: [
      'Shipped 9 client-side tools with an off-main-thread compression pipeline (Web Workers + OffscreenCanvas, zero-copy ImageBitmap transfer) and in-browser PDF workflows (pdfjs-dist, pdf-lib) for files up to 100 MB — no uploads, no backend.',
    ],
    tech: 'Next.js, TypeScript, Web Workers, pdf-lib, Cloudflare Pages',
  },
];

/**
 * Prefix an internal path with the configured base path so links stay correct
 * regardless of where the site is mounted (root on sulove.dev, or a subpath).
 */
export function href(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}
