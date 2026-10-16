---
title: "I applied for a Rails job hoping they wouldn't call. A month later I've closed 30 PRs."
description: 'How a Python and Django engineer ended up at Tanda, a Rails shop: an interview with no LeetCode, a first day back in an office after six years remote, and the fastest first month of my career.'
publishDate: 2026-10-16
tags: ['career', 'tanda', 'interviews', 'rails', 'ai', 'brisbane']
draft: false
---

Today marks one month since I started at Tanda. I want to write this down while it still feels new,
partly for anyone curious about what it's like here, and partly for future me.

## The job I applied to so I'd get rejected

I was looking for senior roles, mostly in the Python and Django world, because that's where I've
spent most of my career. Then a post from Tanda came up on LinkedIn. They were hiring a Senior Dev,
in Rails.

I had never touched Rails. But the job description was good, and the post gave me a good working
culture vibe, the kind you can't really fake. So I applied anyway, half hoping the stack mismatch
would mean they wouldn't call me. Low stakes. Nothing to prepare for.

A couple of days later, they called.

## "What do you expect from your manager?"

I picked up thinking it was HR, so I just talked the way I'd talk to anyone. Somewhere in that call
I got asked a question I'd never been asked in an interview before: *What do you expect from your
manager?*

Usually it's "what do you want in your next role" or "where do you see yourself in 10 years". This
one actually made me think. So I said what I really believe: in software, your manager should be an
engineer first. (Sorry MBAs, but it's true.)

After the call I looked the person up on LinkedIn. It was the engineering manager. I was honestly
too scared to check his background for a second, because I'd just told him managers should be
engineers. Thankfully, he was one. What a relief. He's my manager now.

## Booking the interview before reading the repo

There were only two stages. The phone call was the first. The second was an in-person interview at
the Brisbane office.

Before it, they sent me a project to set up on my laptop. It would be used for building a feature
or fixing a bug live during the interview, and there was a doc saying there'd also be some feature
or system design around a new addition to that repo.

I was heading off on a cruise soon and wanted the interviews done before I left, so I booked the
earliest slot available. Then I opened the repo. Rails. Of course it was Rails. I remember thinking,
well, there goes my chance at joining a good team.

So I started learning Ruby and Rails as fast as I could. A lot of it felt familiar coming from
Django. Models, migrations, routes, the general shape of things. But Rails does a lot of magic, and
that magic wasn't clicking for me. I couldn't trace the code in my head, couldn't follow where a
method came from or why something just worked. That was really annoying for someone who likes to
know exactly what's happening.

Claude helped a lot here. I got the project running and actually understood how it was put together
much faster than I would have on my own.

## The interview I didn't know I wanted

The interview day was amazing.

I walked into a room with three people. There was a question on the table about a feature we were
going to add to the interview project, and my job was to design the solution. It was properly
interactive. All three of them were in it with me, asking questions, pushing back, and showing me
how Rails would usually handle the parts I was thinking about in Django terms. We went back and
forth and landed on a design together.

Then came the building part, and I didn't write the code by hand. Once the design was settled, I
took it to Claude, gave it my decisions, and worked through the implementation with it, right there
in the interview.

Yes, really. No LeetCode. No inverting binary trees. No BFS, no dynamic programming, no backtracking.

For me this felt right. AI is changing how we write code and how we build software, and the
interview actually reflected that. I know I'm good at solving problems. I also know I won't always
write the cleanest code on the first go, and I might not remember how to invert a binary tree on a
whiteboard. This interview let me lean on what I'm actually good at: understanding the problem,
making the calls, and owning the result, while the AI did the typing.

I walked out feeling good about it, whatever happened next.

Less than a week later I got the offer call. A couple of weeks after that, I started.

## Day one, back in an office

I was nervous. More than six years of working remotely, and this was my first time going into an
office again. My manager was there to help, gave me a quick office tour, and introduced me to the
whole team.

(Side note: meeting everyone on day one is a lot. You will not remember the names. Then a week later
it's awkward to go back and ask. I'm still working through a few.)

I got my laptop, some goodies, and an onboarding buddy who walked me through how everything works.

![My desk on day one at Tanda: a MacBook Pro hooked up to a curved Dell monitor, the laptop box beside it, and a Tanda box with some merch on top](/tanda-first-day.jpg)

The office itself is pretty cool. I felt a bit self-conscious being around people all day after so
long at home, but the vibe was great. There's fruit, snacks, coffee, tea, cold drinks, and, the part
that genuinely blew my mind, beer and spirits too. I'd read about companies doing that on Reddit but
I'd never worked at one. It was a really good first day.

## Ramping up on a big Rails monolith

Tanda leans heavily into AI-assisted development. Everyone gets their choice of tools: Claude,
Cursor, Grok, whatever works for you.

That mattered a lot, because I was nervous. I'd never worked in Rails professionally, and this is a
big, complex monolith covering the serious stuff, like payments and making sure people get paid
properly. Getting that wrong isn't an option.

The first half of the week was brutal, to be honest. Too much information, too many prompts, too
many new names for things. But it got better quickly. What would usually take me months, both the
codebase and the domain knowledge, I had most of within about a week. I was already using Claude
Code a lot before joining, so the AI-heavy workflow felt natural pretty fast.

## The fastest first month I've had

For context: in my first month at my last job, I solved a couple of things and fixed a couple of
bugs. That was a normal first month.

Here, I've closed more than 30 PRs. They touch lots of different parts of the product, and some of
them are proper features, not just bug fixes.

I want to be clear about one thing, though. This isn't AI writing code while I click merge. I own
what I ship, and that's the culture here. If my name is on it, I understand it, and I can explain
why it works. The AI makes me faster. It doesn't make me less responsible.

The pace is high and somehow the work-life balance still feels good. Rails doesn't slow me down
anymore either. I've actually come around to it, and I'll probably try it on my next side project.

## What I like about it here

- **People use the product.** It isn't just something we build, it's something we live in.
- **Ownership is real.** You own your area. Nobody's holding the reins tight. As long as you're
  being reasonable, you're trusted to make decisions.
- **The work culture.** This is my first job in Australia, and so far I like how it works here a
  lot.

A month in, I'm really glad I sent that application I expected to go nowhere. It's a good time
to be solving problems, and I'm looking forward to a lot more of it at Tanda.

## We might be hiring

Tanda might be hiring in Sales and Engineering. If any of this sounds like a place you'd like to
work, hit me up and I'm happy to tell you more. Same goes if you're just curious about Tanda or
job hunting and want to talk any of this through. My [email and LinkedIn are on the about
page](/about).
