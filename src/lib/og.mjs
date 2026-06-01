import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const FONT_DIR = 'node_modules/@fontsource';
const read = (p) => fs.readFileSync(path.resolve(p));

// Loaded once per build. Satori supports ttf/otf/woff (not woff2).
const fonts = [
  {
    name: 'Playfair Display',
    data: read(`${FONT_DIR}/playfair-display/files/playfair-display-latin-700-normal.woff`),
    weight: 700,
    style: 'normal',
  },
  {
    name: 'DM Sans',
    data: read(`${FONT_DIR}/dm-sans/files/dm-sans-latin-400-normal.woff`),
    weight: 400,
    style: 'normal',
  },
  {
    name: 'DM Sans',
    data: read(`${FONT_DIR}/dm-sans/files/dm-sans-latin-700-normal.woff`),
    weight: 700,
    style: 'normal',
  },
];

const COLORS = {
  bg: '#F6F4F0',
  coral: '#D85A30',
  text: '#2C2C2A',
  muted: '#888780',
  border: '#E0DDD8',
};

/**
 * Render a 1200×630 social card as PNG.
 * @param {{ title: string, eyebrow?: string, footer?: string }} opts
 * @returns {Promise<Buffer>}
 */
export async function generateOgPng({ title, eyebrow = 'sulav.dev', footer = 'Sulav Raj Bista' }) {
  const tree = {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: COLORS.bg,
        padding: '72px',
        borderTop: `16px solid ${COLORS.coral}`,
        fontFamily: 'DM Sans',
      },
      children: [
        {
          type: 'div',
          props: {
            style: { display: 'flex', fontSize: '28px', color: COLORS.coral, letterSpacing: '1px' },
            children: `// ${eyebrow}`,
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              fontFamily: 'Playfair Display',
              fontSize: '76px',
              fontWeight: 700,
              color: COLORS.text,
              lineHeight: 1.1,
              maxWidth: '1000px',
            },
            children: title,
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '28px',
              color: COLORS.muted,
              borderTop: `2px solid ${COLORS.border}`,
              paddingTop: '24px',
            },
            children: [
              { type: 'div', props: { style: { display: 'flex' }, children: footer } },
              { type: 'div', props: { style: { display: 'flex' }, children: 'Senior Backend Engineer' } },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(tree, { width: 1200, height: 630, fonts });
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  return resvg.render().asPng();
}
