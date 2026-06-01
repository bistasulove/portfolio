import { toString } from 'mdast-util-to-string';
import { readingTimeMinutes } from '../lib/reading-time.mjs';

/**
 * Inject `minutesRead` into each page's frontmatter at render time.
 * Access on a rendered entry via `remarkPluginFrontmatter.minutesRead`.
 */
export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    data.astro.frontmatter.minutesRead = readingTimeMinutes(textOnPage);
  };
}
