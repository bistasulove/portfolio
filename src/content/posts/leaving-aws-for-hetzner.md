---
title: 'I moved my SaaS off AWS onto a single Hetzner box'
description: 'My cloud bill grew bigger than my revenue. Here is how I left RDS, Amplify, and Route 53 for one self-hosted server — the costs, the migration, the backups, and when you should not do this.'
publishDate: 2026-06-02
tags: ['aws', 'hetzner', 'self-hosting', 'postgres', 'devops', 'saas']
draft: false
---

There is a special kind of dread in watching your cloud bill cross your revenue line.

[EZTax Nepal](/work/eztax-nepal) is a small SaaS I built and run solo — a system that a private firm
uses to track, bill, and forecast municipal advertisement tax on behalf of a municipality in Nepal. One customer.
One monthly invoice. And, for a while, an AWS bill that quietly climbed until it was costing me
**roughly two and a half times what the customer paid me to use the thing.**

This is the story of how I fixed that by moving the whole product onto a single Hetzner server — and
why, at this scale, that wasn't a hack or a downgrade but simply the correct decision.

## The economics that broke

When I launched on AWS, the numbers were fine. The first bills came in at **around half my monthly
invoice from the customer** — comfortable margin, nothing to think about. EC2 for the API, RDS for
Postgres, Amplify for the React frontend, Route 53 for DNS, S3 for ad images. The textbook
small-SaaS stack.

Then it started creeping. A few months in, the bill had grown to eat **nearly the entire
subscription**. Around that point AWS handed me a $300 credit, which papered over the problem for
another five or six months — but credits are an anaesthetic, not a cure. By the time the credit ran
dry I was also out of the twelve-month free tier, and the two cliffs arrived together.

The bill **edged past what the customer paid me**, then kept going, climbing to roughly **two and a
half times my monthly invoice** over the next couple of months. I was now paying for the privilege
of running someone else's software for them.

## The decision: shut it down, or right-size it

I had three options, and only one of them was real.

I could **shut the project down** — but the customer genuinely depends on it. They run their entire
working day on it, 9-to-5, every weekday. Walking away wasn't something I wanted to do.

I could **charge more** — and I tried. The customer was reluctant, and in a price-sensitive market
with a single buyer, I wasn't going to win that negotiation.

Or I could **make the economics work.** Taking a loss to keep someone else's lights on indefinitely
isn't a business; it's a hobby with extra steps. So that was the path.

Here's the important part, and the bit I'd push back on if a reviewer called it "under-engineering":
**the application was never the problem.** The code was scalable before the migration and it's
scalable after it. What was wrong was the *hosting model* — I was paying managed-service prices,
provisioned for an imaginary future, to serve a very real and very small present. Matching infra to
actual load isn't cutting corners. Over-provisioning for traffic you don't have is its own kind of
engineering failure; it just hides behind best-practice branding.

## What I moved to

The destination was almost embarrassingly simple: **one small Hetzner CPX instance.** Modest by
cloud standards — but already roomier than the `t2.micro` it was replacing — and, crucially, located
in **Singapore**, the closest region to my users in Nepal, which actually *improved* latency over
where I'd been.

The before-and-after looked like this:

| Concern | Before (AWS) | After (Hetzner) |
|---|---|---|
| Compute | EC2 + Docker | Gunicorn under `systemd` |
| Web server | Nginx | Nginx (kept) |
| Database | RDS Postgres | Self-hosted Postgres, same box |
| Frontend | Amplify | Cloudflare Pages |
| DNS | Route 53 | Cloudflare DNS |
| Image storage | S3 | S3 (kept) |
| DB backups | RDS automated | Cron → Backblaze B2 |

I want to be clear that this wasn't ideology. I didn't rage-quit the cloud. I still use **S3** for
advertisement images, because it's good and it's cheap for what it does. I left the parts of AWS
whose pricing no longer made sense for me, and kept the one that did. The flat Hetzner cost now sits
at **under a third of my monthly invoice** — call it a **~90% cut** to the infrastructure bill,
fixed, with no surprise line items.

## Why I dropped Docker

A lot of people will flinch at "Gunicorn under systemd" instead of containers. For me the reasoning
wasn't RAM overhead or image size — both of those are solvable with lightweight base images. It was
simpler than that: **I'm the only developer on this project, and Docker wasn't buying me anything.**

Containers earn their keep when you have a team, multiple environments, or orchestration to worry
about. Here it was one box, one app, one person. A `systemd` unit running Gunicorn is something I can
read, restart, and reason about at a glance, with one less moving layer between me and the process.
Solo, that simplicity is worth more than the conformity of "everything in a container."

## The migration weekend

The actual cutover took a **single weekend**, and it was uneventful — which is exactly what you want
from a migration, and is almost entirely a function of preparation rather than heroics.

Ahead of time I'd written **migration notes** and done a full **dry run against a test database**, so
on the day I wasn't improvising. The database move itself was a plain `pg_dump` and restore. I ran it
during a quiet window, told the customer in advance, and there was **no downtime** that touched them.
Standing up the server, wiring DNS over to Cloudflare, pointing the frontend at Cloudflare Pages, and
moving the data — planning to done — fit comfortably into two days.

The boring lesson here is the real one: a migration feels risky in proportion to how little you've
rehearsed it. Rehearse it on throwaway data first and the "scary" cutover becomes a checklist.

## Backups: the part you are not allowed to skip

When you leave RDS, you give up managed, automated backups — and on a single self-hosted box, this
is the one thing you cannot be casual about. The data here is genuinely critical: it's tax records
people rely on. So this got more care than anything else in the move.

A **daily cron job** dumps the database and ships it to a **Backblaze B2** bucket (B2 because it's
cheaper than S3 for this, and backups are write-often, read-rarely). I keep a **rolling 30 days** of
backups and overwrite beyond that.

Three principles I'd carve into stone:

1. **Backups live off the server.** If I ever lose the box — a compromise, an attack, a fat-fingered
   command — I can spin up a fresh server and restore from B2. A backup sitting on the same machine
   as the database is not a backup; it's a copy waiting to die with its original.
2. **Backups must be restorable.** A backup you've never restored is a guess, not a safety net. I
   periodically restore from B2 to confirm the file is actually good. Untested backups have a way of
   revealing themselves as useless at the worst possible moment.
3. **Automate it so you can forget it.** A backup that depends on you remembering to run it will be
   forgotten on exactly the week you needed it.

## The one thing that bit me

It wasn't the database, the server, or the app. After I cut DNS over, the customer reported the site
was unreachable — except it loaded perfectly on my laptop. The culprit was their **local ISP caching
old DNS**, holding onto stale records well after the change had propagated everywhere else. It sorted
itself out after a couple of hours, and there's been **no incident since** — the system has just
quietly done its job.

The lesson: the last mile of DNS is outside your control. Even with everything correct on your side,
some resolver between you and your user can serve yesterday's answer for a while. Worth knowing before
you panic.

## While I was in there: fixing a year-old embarrassment

Coming back to a codebase you haven't touched in a while is its own little reunion. The login page had
been quietly broken the whole time — not functionally, but visually. I'd left placeholder silhouettes
on it with a vague intention to "add something interesting later," and, predictably, later never came.

Since I had the project open anyway, I finally finished it — a real, polished login screen, done
quickly with a bit of help from Claude Code. A small thing, but it had nagged at me for over a year.
Migrations are a good excuse to pay off the little debts you've been stepping over.

## Would I do it again?

Without hesitation. The migration cut my costs by nearly 90%, the app is every bit as scalable as it
was on AWS, and I sleep fine on a single box because the backups are solid. For a product at this
scale — roughly 15,000 advertisement records, around 500 taxpayers, a couple thousand payments, one
firm using it during business hours — a managed-everything cloud stack was solving problems I didn't
have, and charging me for the privilege.

But I'd hand you the same caveats I'd give myself:

- **This is right *because* the scale is small.** If I had spiky traffic, a team, or uptime
  guarantees to honour, the calculus flips and managed services start earning their premium again.
  Don't cargo-cult my decision; do the math for *your* load.
- **Get the backups right before anything else.** Off the server, automated, and *tested by actually
  restoring them.* Everything else in this post is reversible. Losing the data is not.

The broader point, and the one I keep relearning: there's no virtue in over-engineering. Build
something scalable, yes — but then host it for the reality you're actually in, not the hockey-stick
graph you're imagining. Sometimes the senior move is a cheap little server and a cron job that works.
