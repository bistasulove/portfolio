---
title: 'ImagePal'
pitch: 'A privacy-first image & PDF toolkit that does all its processing in the browser — your files never touch a server.'
description: 'A static Next.js toolkit with nine image and PDF tools, built around an off-main-thread processing pipeline so everything runs locally — no accounts, no uploads, no trackers.'
tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Web Workers', 'pdf-lib', 'Cloudflare Pages']
order: 4
featured: true
liveUrl: 'https://imagepal.app/'
draft: false
---

## Problem

Most "free" online image and PDF tools work by uploading your files to someone else's server.
That's fine for a meme, but not for a passport scan, a signed contract, or a medical document.
People reach for these tools precisely when their files are sensitive — and quietly hand them to
a third party to find out.

I wanted a toolkit that did the obvious thing: process the file on the device it already lives on,
and never send the bytes anywhere.

## My role

Solo — I designed and shipped the whole thing: the tools, the in-browser processing pipeline, the
UI, and the static deployment.

## Technical decisions

- **Everything runs client-side.** Image bytes never reach a server. There are no accounts, no
  cookies, no ads, and no third-party trackers (only Cloudflare's cookieless analytics). After the
  first load the app works offline.
- **An off-main-thread compression pipeline** built on Web Workers and `OffscreenCanvas`, with
  zero-copy `ImageBitmap` transfer between threads. Batch jobs run in parallel so the UI stays
  responsive even while crunching dozens of images.
- **Client-side PDF workflows** using `pdfjs-dist` and `pdf-lib`, handling documents up to ~100 MB
  with no backend infrastructure at all.
- **Deployed as a fully static export on Cloudflare Pages** — there is no server to run, scale, or
  secure, which is also what makes the privacy guarantee credible.

## Challenges

The honest hard part was keeping the UI responsive under load. Naïvely, image compression on the
main thread freezes the tab the moment you drop a batch of large photos in. Moving the work into
Web Workers solved the freeze but introduced a new cost: copying image data across the thread
boundary. The fix was to transfer `ImageBitmap`s with zero-copy semantics rather than serialising
pixels back and forth, and to parallelise batch jobs across workers — so a 30-image batch feels
like background work instead of a hang.

## Outcome

Shipped with nine production tools — image compression, format conversion, resizing, and a set of
PDF workflows — all running locally in the browser. Because there's no backend, it costs nothing to
operate and there's no data to leak.

## Tech stack

Next.js · TypeScript · Tailwind CSS · Zustand · Web Workers · OffscreenCanvas · pdf-lib · pdfjs-dist · Cloudflare Pages
