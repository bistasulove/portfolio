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

export const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
] as const;

export const TECH_TAGS = ['python', 'django', 'aws', 'docker', 'kafka', 'react'] as const;

/**
 * Prefix an internal path with the configured base path so links work both
 * locally and under the GitHub Pages subpath (/portfolio).
 */
export function href(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}
