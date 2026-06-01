---
title: 'How I built a multi-tenant SaaS on Django in 3 weeks'
description: 'A walkthrough of the architecture decisions, mistakes, and tradeoffs behind shipping a multi-tenant Django app fast.'
publishDate: 2025-05-15
tags: ['django', 'saas', 'python', 'aws']
draft: false
---

> TODO: this is a scaffolded draft — replace the prose with your real experience.

Three weeks is not a lot of time to ship a multi-tenant SaaS. Here's how I scoped it, the
tenancy model I picked, and the things I'd do differently.

## Choosing a tenancy model

The first decision is the one that's hardest to change later: how do tenants share the
database?

- **Shared schema, tenant ID column** — simplest, cheapest, but isolation is your code's job.
- **Schema per tenant** — stronger isolation, more migration overhead.
- **Database per tenant** — strongest isolation, heaviest ops.

I went with a shared schema and a `tenant_id` on every row. The key is making isolation
impossible to forget:

```python
class TenantManager(models.Manager):
    def get_queryset(self):
        tenant = get_current_tenant()
        return super().get_queryset().filter(tenant=tenant)
```

<!-- TODO: explain the request-scoped tenant context and middleware -->

## Migrations under time pressure

TODO: how you kept migrations safe while moving fast.

## What I'd do differently

TODO: the honest retrospective — this is the most valuable section for readers.
