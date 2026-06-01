---
title: 'Kafka vs Celery: choosing the right async tool in Python'
description: 'When to reach for a task queue and when you actually need an event log — a practical comparison from production experience.'
publishDate: 2025-05-22
tags: ['python', 'kafka', 'celery', 'architecture']
draft: false
---

> TODO: scaffolded draft — replace with your real take.

"Just use Celery" and "just use Kafka" are both wrong about half the time. They solve
different problems that happen to overlap.

## Celery: a task queue

Celery is for **work you want done soon, once**: send the email, resize the image, charge
the card.

```python
@app.task(bind=True, max_retries=3)
def send_welcome_email(self, user_id):
    ...
```

## Kafka: an event log

Kafka is for **events other systems care about**, replayable and ordered.

## A rule of thumb

TODO: your heuristic for choosing — e.g. "one consumer doing a job → Celery; many consumers
reacting to a fact → Kafka."
