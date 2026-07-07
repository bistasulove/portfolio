---
title: 'HoneyDjango'
pitch: 'An open-source honeypot you drop into a Django project. It serves fake decoy endpoints, then fingerprints and maps everyone who takes the bait.'
description: 'A self-hosted honeypot and attacker-intelligence platform for Django, published on PyPI as honeydj. It serves convincing decoy endpoints, captures every probe, enriches each hit asynchronously with GeoIP and threat-feed data, and streams it all to a live attack map.'
tech: ['Django', 'Celery', 'Redis', 'Channels', 'PostgreSQL', 'WebSockets']
order: 1
featured: true
githubUrl: 'https://github.com/bistasulove/honeydj'
draft: false
---

## Problem

Every public server gets scanned. Within minutes of going live, bots start probing for leaked
secrets and forgotten admin panels: `/.env`, `/wp-admin/`, `/phpMyAdmin/`, `/.git/config`. Most of
us just let our server return 404s and never think about it again.

A honeypot flips that around. Instead of a 404, you answer those probes with a convincing fake, and
you record everything about whoever knocked. Nobody legitimate has a reason to request `/.env`, so
every single hit is, by definition, someone up to no good. It is intrusion detection with almost no
false positives.

I wanted one for Django. I looked, and there wasn't a package that did this. There are big
standalone honeypot appliances you run as separate infrastructure, but nothing you could add to an
existing Django app in an afternoon. So I built it.

## My role

Solo, end to end. I studied how existing honeypots work, decided which features actually mattered
for a small self-hosted deployment, designed the architecture, built it, wrote the documentation,
and published it to PyPI. I used Claude Code heavily to move faster, and I reviewed every line it
produced.

## Technical decisions

- **A middleware that runs before URL resolution.** `HoneyMiddleware` sits directly after Django's
  `SecurityMiddleware` and matches incoming paths against decoy routes stored in the database. A
  trapped request never reaches your real app, and the routes are editable live in the admin with no
  redeploy.
- **The request hot path does almost nothing.** On a match, the only synchronous work is one
  database insert, then the fake response goes back. Everything slow (GeoIP, reputation lookups, tool
  fingerprinting, payload classification) is handed off to Celery so a scanner hammering the server
  can never slow it down.
- **Every hit becomes a per-IP dossier.** The enrichment task folds each event into an attacker
  profile with a cumulative threat score, technique tags, and tool identification, so you build a
  picture of who an attacker is across all their probes, not just one.
- **A live dashboard over WebSockets.** Enriched events stream to a Django Channels consumer and land
  on a Leaflet world map in real time. When a probe comes in and geolocates, a marker pulses on the
  map as it happens.
- **Graceful degradation everywhere.** Threat-feed adapters switch themselves off when no API key is
  set. GeoIP becomes a no-op when the database file is missing. A honeypot that breaks the host app
  it is protecting would be worse than no honeypot, so nothing in the pipeline is allowed to fail
  loudly.

## Challenges

**Keeping it lightweight enough to actually adopt.** The whole selling point is that this drops into
an existing project, so I could not require a heavy footprint. An early version pulled in a full
admin-theme dependency that reskinned the host app's entire admin. That was too invasive, so I cut
it in v0.2.0 and moved to the stock Django admin. The package should feel like a guest in your
project, not a squatter.

**Designing an async pipeline that never double-counts.** Two Celery workers can pick up two events
from the same attacker at the same moment. Without care, they would both read the profile, both add
their score, and both write, losing one update. The enrichment task does all its slow work first,
then takes a row lock on the profile inside a single transaction to fold results in, so concurrent
workers serialise instead of clobbering each other. It is also idempotent, so a retried task is
harmless.

**Making the setup honest.** This is the one thing I could not fully solve, only document. The live
map needs PostgreSQL, Redis, Celery, and an ASGI server, which is real infrastructure. Rather than
hide that, I leaned into it: a `simulate_scanner` management command replays a full fake attack wave
through the entire pipeline so a new user can confirm everything works in about a minute, before a
single real attacker shows up.

## Outcome

Published to PyPI as `honeydj` (v0.2.0), MIT licensed. To prove it end to end I deployed it into my
own production app, [EZTax Nepal](/work/eztax-nepal), running behind nginx and gunicorn on a single
server. The first real probe arrived about thirty minutes after it went live. Within a day it had
logged attacks from several countries, almost all of them hunting for a leaked `.env` file. I wrote
up that whole integration [here](/writing/adding-a-honeypot-to-my-django-app).

It is early and there is plenty left to build, but it does the core job today: it turns the constant
background noise of internet scanning into a readable, mapped, self-hosted intelligence feed.

## Tech stack

Django · Django REST Framework · Celery · Redis · Django Channels · Daphne (ASGI) · PostgreSQL ·
Leaflet · MaxMind GeoLite2 · AbuseIPDB + VirusTotal feeds · packaged and published on PyPI
