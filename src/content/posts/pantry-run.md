---
title: 'I built a shopping list app for my household. Now 25 of them use it.'
description: 'Pantry Run is a real-time, offline-first shopping list PWA I built solo over evenings and weekends. The story of the very ordinary household problem behind it, what it took to ship something finished, and the one thing still standing between it and real adoption.'
publishDate: 2026-06-02
tags: ['pwa', 'nextjs', 'supabase', 'offline', 'side-project', 'react']
draft: false
---

Back home in Nepal, a forgotten grocery item was a five-minute problem.

We never really planned shopping. There was always a small shop or a mart somewhere down the lane,
so you just walked over and bought whatever you'd missed. I still remember starting to make Chatpate
one evening, getting halfway through, and realising we had no Wai-Wai. It was a non-event. I walked
out, grabbed a packet, and was back before my wife had finished prepping everything else.

Australia broke that habit completely.

## A problem that mostly exists here

Coles, Woolworths and Aldi are everywhere, but "everywhere" is spread across a lot of ground. The
nearest one to us is a ten minute drive, and that's before you've found parking. Going to the shops
for two items isn't a five minute walk anymore. It's a small outing, and once you add fuel to it, a
trip for a couple of things you forgot is just money quietly leaking out.

There's a second thing that's very Australian about this. Flybuys and the supermarket rewards
programs reward planning. Hit a weekly spend, or a single transaction over a threshold, and the
points actually add up to something. Wandering in and grabbing a few random things doesn't just cost
fuel, it leaves value on the table. Shopping here rewards the people who think a week ahead, and
punishes the people who don't.

So, like most couples, my wife and I started keeping lists.

## The notes app that ate itself

The lists lived in our phone notes. Sometimes on mine, sometimes on hers. That was the whole
problem in one sentence.

My notes app started to bloat. Old shopping lists I never deleted, half of them stale, all of them
burying the notes I actually cared about. When my wife told me to "add X" while I was in the middle
of something, I'd nod, not write it down, and only remember at the checkout that we'd forgotten it
again. Other times we'd both buy the same thing, or buy something we already had three of at home,
because neither of us could see what the other one knew.

Two people, two private lists, zero shared truth. It's a small, dumb, daily kind of friction, and it
wore on us enough that I started sketching an app in my head.

## Why a PWA, and not the App Store

I knew roughly what I wanted: one shared list, live for both of us, no ceremony to get started. The
question was how to ship it.

I deliberately did not want to walk into the whole Apple Developer and Google Play dance: the
accounts, the fees, the review queues, the verification, the waiting. For a problem this size, that
overhead felt absurd. So I built it as a Progressive Web App. Open a URL, and you're in. One person
creates a household, shares a six character invite code, and everyone else is on the same live list
within seconds. No account required to even start. You can be using it before you've decided whether
you trust it.

Under the hood it's Next.js 16 and React on the front, Supabase for Postgres, auth and realtime on
the back, with Zustand holding the client state. Every one of the fourteen database tables has row
level security on it, because "it's just a shopping list" is exactly the kind of thinking that leaks
one household's data into another's. The whole thing is static-fast and installs to a home screen
like a normal app. It just skipped the gatekeepers to get there.

## The unglamorous part I'm proudest of

Real-time sync is the headline feature, but it isn't the part I'm most proud of. Offline is.

This came straight out of using my own app. I'm usually the one standing in the aisle doing the
actual shopping, and I kept hitting the same wall: supermarket internet is terrible. Thick walls,
dead spots, a phone that swears it has signal and then does nothing. The first few times I tried to
check off items or look something up mid-shop, the app just sat there, and that's the exact moment a
shopping app is supposed to earn its keep.

So offline isn't a checkbox feature in Pantry Run, it's load-bearing. Every change you make hits a
local store instantly, so the UI never waits on the network. If you're offline, the write goes into
an IndexedDB queue instead of failing. When the connection comes back, the queue drains in order and
reconciles with the server, last write wins. Checking off bread while standing in a concrete-walled
aisle with one bar of reception just works, and then quietly syncs the moment you step back outside.
The unglamorous plumbing is the feature.

There's more in there now than the first version had: smart categories that auto-sort items as you
type (with a small language model filling the gaps the keyword dictionary misses), shopping history,
and recurring staples. But all of it sits on that same spine. Optimistic first, network second, never
block the person standing in the shop.

## Shipped in the cracks of the week

I built this in evenings and weekends, around a full time job. There was no dedicated runway, just
the time that was left over.

It went out in stages. V1 was the bare list, and the first household to use it in anger was my own.
That alone was enough to start fixing the things that annoyed us in real use. A few relatives picked
it up. Then I shipped V1.1, and somewhere in there it crossed over from "thing I made for us" to
something other people were genuinely relying on. It's now around twenty-five households: family,
friends, and a few steps removed from there.

Twenty-five isn't a launch metric. Nobody's going to write about it. But every one of those is a
real kitchen with a real shared list in it, and I find that more satisfying than a vanity number,
because I never marketed this. There's been no Show HN, no LinkedIn post, no announcement anywhere.
This piece you're reading is genuinely the first time I've written about it publicly.

## From a list to a household, coordinated

Somewhere along the way, Pantry Run stopped being only about groceries. That wasn't the plan, it was
another household problem walking in through the same door.

Here's the thing I noticed. When something is mine, the tools already exist. If I have a seminar next
month or I need to be somewhere early tomorrow, I set a phone alarm or a reminder, and it nudges me.
Solved. But a lot of running a household isn't mine. Putting the bin out on the kerb on Thursday
morning isn't my job, it's the household's job, and everyone living there should be in on it. My
phone's reminder is useless for that, because it only ever pokes me. There's no version of a personal
alarm that taps everyone on the shoulder at once.

So that became a feature. Reminders in Pantry Run are shared by design. "Bin night, Thursday
morning", "rent on the first", the recurring drumbeat of a household, set once and surfaced to
whoever needs them. You can aim a reminder at one specific person or at the whole household.

Tasks came from the same realisation, just without the clock. "Mow the lawn." "Clean the living
room." Things that need doing but aren't pinned to a time, and aren't any single person's burden by
default. So tasks work the same way: assign one to a person, or leave it open for the household to
pick up. A list of what needs doing, shared, instead of living in one person's head and quietly
becoming one person's resentment.

None of this was possible without notifications, which is why I built the push infrastructure first,
before reminders or tasks existed. It looked like building the boring plumbing ahead of the visible
feature, but it was the other way around. A shared reminder that can't actually reach the other people
in your household is just a note to yourself with extra steps. The notification was the whole point,
so the delivery had to come first.

That's how a grocery list quietly turned into a small household coordination app. Same household, same
shared-truth problem, just pointed at the bin and the lawn instead of the milk.

## The moment it stopped being mine

Last week I went to my sister's place, and she was using the app. Not because I was watching, not
because she'd installed it to be kind to me, just using it the way you use a thing that's part of
your routine now.

I can't really overstate how good that felt. There's a particular happiness in watching someone find
real value in something you made, when they have no reason to perform that for you. It's the
difference between people telling you your project is nice and people actually folding it into their
lives. That visit did more for my motivation than any amount of positive feedback could have.

## What I'm deliberately not building

The hardest engineering decisions on this project have mostly been about restraint.

I have a list of features I could add. The one piece of feedback I keep hearing, and it's always
delivered with great enthusiasm, is price tracking across Coles, Woolworths and Aldi for whatever's
on your list. It's a genuinely good idea. It's also a much bigger, messier piece of work than it
sounds, and I'm wary of it for a simpler reason: the thing people seem to like most about Pantry Run
is that it's minimal and it just works. Every feature I bolt on is a chance to make it heavier,
slower, more confusing, and less of the calm little tool it currently is.

I already killed one planned feature, an activity feed, because when I went looking for demand for it
there wasn't any. The loudest signal from actual users has been "keep it simple", and I'd rather
honour that than build features to impress myself. Saying no is a feature too. It's just one that
never shows up in a changelog.

## The honest problem I haven't solved

If I'm being straight about it, the PWA bet has a real cost, and it's adoption.

For technical people, "open this URL and tap add to home screen" is nothing. For everyone else, it's
genuinely confusing. The install flow for a PWA is not intuitive, the prompts differ between iOS and
Android, and I've watched non-technical users get stuck at exactly that step. The very decision that
let me ship fast, skipping the app stores, is now the thing most likely to cap how far this can
spread.

There's a deeper limitation too, and it bites hardest on the feature I just described. A PWA can send
notifications, but it can't send the kind that command your attention the way a phone alarm does. It
has no native access to behave like the clock app, no full-screen, ringing, hard-to-ignore alert. For
a casual "don't forget the milk" nudge that's fine. For "the bin truck comes in ten minutes", a quiet
notification that's easy to swipe past isn't really doing the job. The household coordination side of
the app is exactly where the web platform's ceiling shows.

So I might bite the bullet and build a proper native app. But I'm not going to do it on principle or
because it's the "real" way to ship. I'll do it if and when usage and feedback tell me it's worth it.
The same discipline that keeps me from cluttering the feature set applies to the platform: build for
the reality you're actually in, not the one you're imagining.

## Where this leaves me

Pantry Run started as a fix for a small, specific annoyance in my own kitchen, the one Australia
handed me that Nepal never did. It's now a finished, working thing that real households quietly
depend on, built in the spare hours of an ordinary week.

It's live at [pantry-run.vercel.app](https://pantry-run.vercel.app) if you want to try it. Create a
household, share the code with whoever you shop with, and see if it removes a little friction from
your week the way it did from mine. And if you do, I'd genuinely like to hear what's missing, because
so far almost everything I know about this app I learned by watching the people I love actually use
it.
