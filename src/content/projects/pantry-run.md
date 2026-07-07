---
title: 'Pantry Run'
pitch: 'A real-time, offline-first shopping-list PWA for households — built to solve a problem in my own kitchen, and now used by a handful of families.'
description: 'A collaborative shopping-list PWA for households: instant real-time sync, offline-first writes, timezone-correct recurring reminders, and pragmatic LLM categorization — built solo on the modern Next.js + Supabase stack.'
tech: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'PWA']
order: 2
featured: true
liveUrl: 'https://pantry-run.vercel.app/'
githubUrl: 'https://github.com/bistasulove/pantry-run'
draft: false
---

## Problem

We moved from Nepal to Australia, where the weekly grocery shop is a planned event rather than a
quick walk to the corner store. My wife and I kept tripping over the logistics — one of us would buy
something we already had, or come home without the one thing we actually needed. We tried a few
shopping-list apps and none of them fit: they wanted an account before you could even start, or they
buried a simple list under features we didn't want. We just needed something clean that kept a
shared list in sync between two phones.

So I built it. It was also a deliberate excuse to step away from Python for a while and learn the
modern Next.js + Supabase stack end to end.

## My role

Solo — product, design, frontend, backend, database, and infrastructure.

## What it is

Pantry Run is a real-time collaborative shopping-list PWA. One person creates a household, shares a
six-character invite code, and everyone is instantly on the same live list — **no account required
to start**. It works offline, installs to the home screen like a native app, and has since grown to
cover recurring household reminders ("bin night, every Thursday") and assignable chores.

## Technical decisions

- **Real-time by default.** Every list is a Supabase Realtime channel; inserts, edits, and checks
  from one member appear on everyone else's screen within a moment, over WebSocket subscriptions.
- **Offline-first writes.** Every action updates an optimistic Zustand store immediately, then either
  writes through to Supabase or, when offline, lands in an IndexedDB queue that drains in order on
  reconnect. The UI never waits on the network.
- **Frictionless auth.** New users get an anonymous session instantly and can upgrade to a real
  email account later **without losing any data** — the `user_id` is preserved across the upgrade.
- **A hand-rolled service worker** (no Workbox, no `next-pwa`) so I owned exactly what was cached and
  how push events were handled, rather than fighting a black box.
- **Scheduling that lives in Postgres.** Recurring reminders are driven by `pg_cron` running a
  function every minute against an RRULE-subset stored on each reminder — no external job runner.
- **Pragmatic AI.** Item categorization resolves through three tiers (below) so the common case is
  instant and free, and the LLM is only paid for when it's genuinely needed.
- **Security by default.** All fourteen tables have Row-Level Security enabled; cross-user fan-out
  (push notifications) goes through a service-role path that can't be reached from the client.

## Challenges

**Keeping a shared list correct when two people edit it at once — and one of them is offline.**
This is the heart of the app and the genuinely hard part. A shared, live list means concurrent
edits, and the offline-first promise means a write can be made on the bus and not reach the server
for ten minutes. I leaned on an optimistic store for instant local feedback, an ordered IndexedDB
queue for offline writes, and **last-write-wins reconciliation keyed on the server `updated_at`
timestamp** when the queue drains and the realtime stream catches up. The subtle bugs all live at
the seams — a locally-queued edit racing an incoming realtime event for the same row — so writes go
through one path and reconcile deterministically rather than ad hoc.

**Recurring reminders that survive daylight saving.** "Every Thursday at 7pm" has to stay at 7pm
*local* even across the AEST↔AEDT switch. I anchor the recurrence math to the household's IANA
timezone: `pg_cron` advances each reminder's next fire by doing the calendar arithmetic in the
household's timezone and re-projecting to UTC, while a client-side mirror computes the same instants
for the "next 3 fires" preview — the two implementations have to stay in lockstep, verified against
canonical cases including the DST boundary.

**Smart categorization without a real bill.** Items auto-sort into aisles via a three-tier resolver:
a per-household override, then a ~1,000-keyword dictionary (instant, offline-safe, AU-first with
US/UK synonyms), and only on a miss — and only when online — a fire-and-forget call to a Supabase
Edge Function backed by Gemini. Results are cached globally and rate-limited per household, so the
LLM stays a rare, near-free fallback rather than a cost centre.

## Outcome

In daily use by five or six households — mine, plus friends and family. It's shipped through three
release lines (the live list, then continuity features like accounts and history, then household
coordination with push, reminders, and tasks), is actively maintained, and has a roadmap ahead.
What started as a fix for my own kitchen turned into the project where I learned a whole modern
stack in anger.

## Tech stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Zustand · Supabase (PostgreSQL · Realtime · Auth · Edge Functions) · `pg_cron` · Web Push / VAPID · hand-rolled service worker + IndexedDB · Sentry · Vercel
