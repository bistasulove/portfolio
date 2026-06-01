---
title: 'Banshawali'
pitch: 'A multi-tenant genealogy platform with JWT RBAC, solo-maintained at 99.99% uptime.'
description: 'Designing a multi-tenant architecture with role-based access control — and keeping it reliably online single-handedly.'
tech: ['Python', 'Django', 'PostgreSQL', 'JWT', 'Docker', 'AWS']
order: 2
featured: true
githubUrl: 'https://github.com/bistasulove'
draft: false
---

## Problem

<!-- TODO: what need did Banshawali serve? -->
Families wanted a private, structured way to record and explore their lineage — each family
isolated from every other, but on shared infrastructure.

## My role

<!-- TODO: confirm scope -->
Solo architect and maintainer — design, build, and ongoing operations.

## Technical decisions

<!-- TODO: expand the multi-tenant + RBAC story -->
- **Multi-tenant architecture** so each family's data is cleanly isolated.
- **JWT-based RBAC** for granular permissions across roles.
- TODO: how you chose your tenancy model (shared schema vs schema-per-tenant) and why.

## Challenges

<!-- TODO: one honest hard thing -->
TODO: e.g. enforcing tenant isolation everywhere without leaking data across boundaries, and
how you guaranteed it.

## Outcome

<!-- TODO: metrics — tenants, records, the 99.99% uptime story -->
Maintained at 99.99% uptime solo. TODO: add tenant/record counts and how you monitor it.

## Tech stack

Python · Django · PostgreSQL · JWT · Docker · AWS

## Links

- TODO: live URL
- [GitHub](https://github.com/bistasulove)
