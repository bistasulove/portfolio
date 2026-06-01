import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgPng } from '../../../lib/og.mjs';

export const getStaticPaths = (async () => {
  const posts = await getCollection('posts', (p) => !p.data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await generateOgPng({ title: props.title as string, eyebrow: 'writing' });
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
