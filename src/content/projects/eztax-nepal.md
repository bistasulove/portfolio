---
title: 'EZTax Nepal'
pitch: 'A production SaaS for municipal advertisement-tax collection — built solo, and later re-platformed off AWS to cut costs.'
description: 'How I designed, built, and shipped a government-adjacent tax-management SaaS for a private collection firm in Nepal — owning everything from the data model to the infrastructure, including a later migration from AWS to a lean self-hosted stack.'
tech: ['Django REST Framework', 'React', 'PostgreSQL', 'AWS', 'Hetzner', 'Cloudflare']
order: 3
featured: true
liveUrl: 'https://eztaxnepal.com/'
draft: false
---

## Problem

A private firm collects advertisement tax on behalf of a municipality in Nepal - every billboard,
hoarding board, and shop sign owes tax, and someone has to track it, bill it, and forecast the
revenue. That work was being done by hand by a person who won the tender bidding from municipality. There was no system of record for which ads existed,
what they owed, or what the municipality could expect to collect.

## My role

Solo, end to end. I independently designed, built, launched, and have operated the platform —
domain modelling, the backend API, the React frontend, the infrastructure, and the CI/CD that keeps
releases consistent. I'm still the one maintaining it.

## Technical decisions

- **Django REST Framework with JWT-based RBAC.** Tax data is sensitive and the firm has distinct
  roles (field staff entering ads, admins billing and reporting), so role-based access control was
  load-bearing rather than an afterthought.
- **Cursor-based pagination** for the high-volume advertisement records, so listing and exporting
  large datasets stays fast and stable as the record count grows.
- **Client-side image compression before a presigned S3 upload.** Field staff photograph each
  advertisement; compressing in the React client before uploading directly to storage cut both cost
  and upload latency, and kept large image traffic off the application servers.
- **Streaming data exports** so users can pull large datasets out of the system without blocking the
  app servers while a report is generated.

## Challenges

**Making it usable for someone who'd never used software like this.** The pilot customer had barely
used a computer before, let alone a SaaS product. The hardest design constraint wasn't technical -
it was making every workflow intuitive enough that a first-time user could enter an advertisement,
generate a bill, and trust the numbers without hand-holding. That shaped the whole UX.

**Keeping costs down.** This is a single firm in a price-sensitive market, so the economics had to
work at a small scale. Every piece of infrastructure had to justify its monthly cost.

**Re-platforming off AWS, 18 months in.** The original launch ran on AWS - EC2 with Docker and
Nginx, PostgreSQL on RDS, the React frontend on Amplify, DNS on Route 53. As the running cost added
up against a small revenue base, I migrated the whole thing to a leaner self-hosted stack: a single
Hetzner server, dropping Docker in favour of running Gunicorn directly under **systemd**;
self-hosted PostgreSQL on the same box instead of RDS; **Cloudflare DNS** in place of Route 53; and
the frontend moved to **Cloudflare Pages** instead of Amplify. Same product, a fraction of the
monthly bill.

## Outcome

Shipped to production and used by a real tax-collection firm to manage advertisement tracking,
billing, and revenue forecasting on behalf of the municipality. It replaced manual record-keeping
with a single system of record, and it's still running — now on infrastructure that costs a
fraction of what it did at launch.

## Tech stack

**Application:** Django REST Framework · React · PostgreSQL · JWT/RBAC · GitHub Actions
<br />**At launch (AWS):** EC2 · Docker · Nginx · RDS · Amplify · S3 · Route 53
<br />**Now (self-hosted):** Hetzner · systemd + Gunicorn · Nginx · self-hosted PostgreSQL · S3 · Cloudflare DNS + Pages
