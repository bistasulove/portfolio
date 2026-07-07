---
title: 'I added a honeypot to my production Django app, and the first attack came in 30 minutes'
description: 'The real story of deploying honeydj into a live SaaS: the infrastructure I had to add, how I did it without breaking production, and what the first day of attacker traffic looked like.'
publishDate: 2026-07-07
tags: ['django', 'security', 'honeypot', 'celery', 'redis', 'devops', 'self-hosting']
draft: false
---

I built a honeypot package for Django called [honeydj](/work/honeydj), and building it was only half
the job. A honeypot that has never faced a real attacker is just a demo. So I did the obvious thing
and installed it into my own production app, [EZTax Nepal](/work/eztax-nepal), a live system a real
firm uses every working day.

This is the story of that integration. What I had to add, how I kept a live product from breaking
while I did it, and what happened once the trap was armed.

## What the app had, and what honeydj wanted

EZTax Nepal runs a lean stack. Gunicorn serving Django under systemd, nginx in front, PostgreSQL on
the same box, all on a single Hetzner server. It is deliberately simple, and I [wrote before about
why](/writing/leaving-aws-for-hetzner).

honeydj needed more than that. Going through its requirements against what I had, the gaps were
clear:

- **PostgreSQL.** I had this. Good start.
- **Redis.** Not installed anywhere. honeydj uses it for three jobs at once: a cache, a message
  broker, and the backbone of the live dashboard.
- **Celery.** Also missing. honeydj does all its slow work (geolocation, reputation lookups,
  fingerprinting) in the background so the trap responds instantly. No Celery, no enrichment.
- **An ASGI server.** This was the big one. Gunicorn speaks WSGI, which cannot handle the WebSocket
  the live attack map depends on. My whole production app was served over a protocol that could not
  do the one flashy feature I most wanted.

So before honeydj could do anything, I had to add a cache layer, a task queue, a message broker, and
a second web protocol, all to a server that people were actively using during business hours. The
rule for the whole project was simple. Production does not break.

## Doing it in phases

The way you add four pieces of infrastructure to a live system without a scary weekend is to not do
it in one scary weekend. I split the work into stages and tested each one locally first.

The first stage did not touch honeydj at all. I upgraded the app from Django 5.1 to 5.2, added Redis,
wired up Celery with a small worker, and switched the app's ASGI entrypoint over so it was ready for
WebSockets later. None of this changed what users saw. Gunicorn kept serving every request exactly
as before. I was just laying track.

Only once that base was solid and deployed did I install honeydj itself, add its middleware, mount
its URLs, run its database migrations, and seed the decoy routes.

The nice thing about this order is that each stage is boring on its own. A Redis install is boring. A
Celery worker is boring. Adding a package is boring. The scary version is doing all three at once and
not knowing which one broke. Boring, in production, is the goal.

## The ASGI problem, and the side-car

The WebSocket requirement was the most interesting piece to solve. I did not want to rip out
Gunicorn, because it was serving the real application perfectly and had been for over a year. Ripping
out a working web server to add a dashboard feature is a bad trade.

So I ran two servers side by side. Gunicorn keeps serving all the normal HTTP traffic, the API, the
admin, everything. A second server, Daphne, runs alongside it on a local port and handles only the
WebSocket connection for the live map. nginx sits in front and routes based on the path. Anything
starting with `/ws/` goes to Daphne, everything else goes to Gunicorn.

```nginx
location /ws/ {
    proxy_pass http://127.0.0.1:8001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

This felt right. The proven path stays untouched, and the new, less-critical feature runs in its own
lane where it cannot hurt anything. If Daphne fell over, the worst outcome is the live map stops
updating. The actual product keeps running.

## The gotcha that would have locked me out

Here is the one that made me stop and think. honeydj serves a fake admin login at `/admin/`, because
that is one of the most probed paths on the entire internet and it makes a perfect decoy.

But `/admin/` is also where Django puts your real admin by default. And the honeypot middleware runs
before Django's URL routing, so it wins. If I had deployed as-is, honeydj would have cheerfully
served a fake login page at my real admin address, and I would have locked myself out of my own
admin while handing attackers a convincing decoy at exactly the spot they look first.

The fix was to move my real admin to a private, non-obvious URL driven by an environment variable,
and let `/admin/` become the decoy it deserves to be. Obvious in hindsight. Much better to catch it
in testing than in production.

## Arming the trap

The whole prep took a few hours spread across a couple of evenings, most of it spent being careful
rather than being stuck. Then I deployed, seeded the decoys, and started watching the logs.

The first probe hit about thirty minutes later.

Thirty minutes. That is how long a fresh server sits on the internet before something finds it and
starts rattling the doorknobs. I knew scanning was constant in the abstract, but watching the first
real hit land on my own trap, that fast, made it concrete in a way no article had.

## The first day

<!-- Drop your live map screenshot at public/honeydj-attack-map.png -->
![The honeydj live attack map after one day, showing logged probes across several countries](/honeydj-attack-map.png)

Within the first day the map had markers on several continents. A handful of details stood out.

Almost every single probe was hunting for a leaked `.env` file. Not admin logins, not WordPress, not
anything exotic. Just bots sweeping the internet for the one file that would hand them a database
password and a set of API keys. If you have ever wondered whether committing secrets to a repo or
leaving an `.env` exposed is a real risk, this is your answer. There is a permanent, automated crowd
checking for exactly that, all day, every day.

The attacks came mostly from the UAE, Germany, the Netherlands, and the United States. The thing that
surprised me most was what I did not see. I had half-expected the traffic to be dominated by the
usual suspects, and yet there was no Russia in the early list at all. Attacker geography does not
match the stereotype, at least not on day one.

## Was it worth the hassle

Yes, easily. A few hours of careful infrastructure work turned the invisible background noise of
internet scanning into something I can actually see, on a map, in real time, from my own server.

There is also a quieter benefit. Doing this integration against a real production app, rather than a
toy project, shook out real rough edges in honeydj itself. It pushed me to cut an over-heavy
dependency and to write down the setup gotchas I had to discover the hard way, like that `/admin/`
collision. Nothing improves a tool like being forced to actually live with it.

I am letting the trap run now. In a couple of weeks I will share the fuller numbers, how many probes,
from where, hunting for what. If day one is any indication, the total is going to be higher than most
people would guess.
