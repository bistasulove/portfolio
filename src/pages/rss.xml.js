import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE, href } from '../consts';

export async function GET(context) {
  const posts = (await getCollection('posts', (p) => !p.data.draft)).sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );

  return rss({
    title: `${SITE.name} — Writing`,
    description: 'Technical writing on backend engineering, systems design, and Python.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      categories: post.data.tags,
      // Build the link through href() so the base path is always applied.
      link: href(`/writing/${post.id}/`),
    })),
  });
}
