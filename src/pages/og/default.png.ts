import type { APIRoute } from 'astro';
import { generateOgPng } from '../../lib/og.mjs';

export const GET: APIRoute = async () => {
  const png = await generateOgPng({ title: "I build backends that don't break." });
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
