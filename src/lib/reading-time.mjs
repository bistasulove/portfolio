/**
 * Estimate reading time in minutes from raw text/markdown.
 * Single source of truth — used by the remark plugin and list views alike.
 */
export function readingTimeMinutes(text) {
  const words = (text || '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
