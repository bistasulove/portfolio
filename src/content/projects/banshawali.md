---
title: 'Banshawali'
pitch: 'A family-tree management app — multi-tenant by design, with an interactive tree UI and a genealogy data model that had to handle real family structure.'
description: 'A solo-built family-tree (genealogy) platform: shared-schema multi-tenancy so each family stays isolated, an interactive React Flow tree, and a data model that grapples with how lineage actually works.'
tech: ['Django REST Framework', 'React', 'React Flow', 'PostgreSQL', 'JWT', 'AWS']
order: 5
featured: false
draft: false
---

## What it is

"Banshawali" is the Nepali word for a recorded family lineage. The app lets a family build, browse,
and maintain its family tree — and was designed so many different families and communities could
use it on the same platform, each one private to itself. I built it as a solo project with the
intent of launching it as a SaaS.

## My role

Solo — backend, frontend, data model, and infrastructure.

## Technical decisions

- **Shared-schema multi-tenancy keyed on `family_id`.** Every record belongs to a family, and all
  backend logic filters by family first, so one family's data can never surface inside another's
  tree.
- **JWT-based authentication** over a Django REST Framework API, with PostgreSQL for storage,
  containerised with Docker on AWS.
- **An interactive tree built with React Flow** on the frontend, so people can navigate and explore
  their lineage visually rather than reading a flat list.

## Challenges

**Modelling lineage honestly.** The hard part wasn't the code — it was the data model, and
specifically how to represent women who marry out of the family. Once a daughter marries, she
starts her own household and belongs to a different lineage, so a naïve tree either duplicates
people or grows without bound. I drew a deliberate boundary: record one generation past a daughter
— her husband and her children — and stop there, since the next generation belongs to a different
family's tree. Getting that rule right was the difference between a tree that reflected real family
structure and one that didn't.

**Stretching into the frontend.** This project landed while I was actively expanding my frontend
skills, and building an interactive, navigable family tree with React Flow was a big jump from the
backend-heavy work I was used to. Wiring up the visual tree was the steepest part of the learning
curve — and the most satisfying once it worked.

## Outcome

Built end to end on my own as a potential SaaS for families and communities. I ultimately decided
not to pursue it commercially, so it never took on paying customers — but it remains a genuine
exercise in multi-tenant design, domain modelling, and frontend work. The repository is public.

## Tech stack

Django REST Framework · React · React Flow · PostgreSQL · JWT · Docker · AWS

## Code

It was hosted while I was exploring it as a SaaS; I later let the domain lapse and took the live
site down. The code is public, split across two repositories:

- [Frontend — React + React Flow](https://github.com/bistasulove/banshawali-frontend)
- [Backend — Django REST Framework](https://github.com/bistasulove/banshawali-backend)
