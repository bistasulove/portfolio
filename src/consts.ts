// Central site metadata. Anything marked TODO needs real content from Sulav.

export const SITE = {
  name: 'Sulav Raj Bista',
  // TODO: confirm final tagline / role line
  role: 'Senior Backend Engineer',
  location: 'Brisbane, AU',
  status: 'Open to senior roles',
  description:
    'Senior backend engineer (7+ years) building reliable systems. Portfolio, case studies, and writing.',
  // TODO: replace with real contact + profile URLs
  email: 'bistasulavraj@gmail.com',
  github: 'https://github.com/bistasulove',
  linkedin: 'https://www.linkedin.com/in/', // TODO
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

export const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
] as const;

export const TECH_TAGS = ['python', 'django', 'aws', 'docker', 'kafka', 'react'] as const;

// TODO: replace every entry with real roles, companies, dates, and the one key
// thing built there. Order newest-first.
export interface CareerEntry {
  period: string;
  role: string;
  company: string;
  highlight: string;
}

export const CAREER: CareerEntry[] = [
  {
    period: '2022 — Present',
    role: 'Senior Backend Engineer',
    company: 'TODO Company',
    highlight: 'TODO: the single most impressive thing you built here.',
  },
  {
    period: '2019 — 2022',
    role: 'Backend Engineer',
    company: 'TODO Company',
    highlight: 'TODO: key system or feature you owned.',
  },
  {
    period: '2017 — 2019',
    role: 'Software Engineer',
    company: 'TODO Company',
    highlight: 'TODO: where it started.',
  },
];

/**
 * Prefix an internal path with the configured base path so links work both
 * locally and under the GitHub Pages subpath (/portfolio).
 */
export function href(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}
