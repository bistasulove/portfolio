---
title: 'I ran a honeypot for 12 days. Almost every attacker wanted the same thing.'
description: 'The first real report from honeydj running on my production SaaS: 503 probes, 45 machines, 12 days, and one file nearly everyone came hunting for. Plus how a company can turn this kind of intel into actual defense.'
publishDate: 2026-07-18
tags: ['security', 'honeypot', 'django', 'threat-intelligence', 'self-hosting', 'devops']
draft: false
---

Twelve days ago I armed a trap on my production server and walked away.

[honeydj](/work/honeydj), the honeypot I built, was live on [EZTax Nepal](/work/eztax-nepal),
quietly answering every scanner that came sniffing at the door. In my [last
post](/writing/adding-a-honeypot-to-my-django-app) I promised I would let it run and come back with
the numbers. The numbers are in now, and the story they tell is not the one I expected to write.

In twelve days, a small tax app that almost nobody has heard of was probed **503 times** by **45
different machines** from all over the world. That is about 42 hits a day, every day, on a server
whose only real users are a handful of staff at one firm in Nepal. Nobody sent an invitation. The
internet just found it, the way it finds everything.

Here is what they wanted.

## Everyone came for the .env file

Of the 503 probes, **430 were hunting for a `.env` file.** That is 85 percent of everything that hit
the trap. Not admin panels. Not clever exploits. Just bots sweeping for the one file developers
sometimes leave exposed by accident, the file that holds database passwords, API keys, and secret
tokens sitting in plain text.

And they did not politely try one path. They tried everything.

| Path probed | Hits |
|---|---|
| `/.env` | 88 |
| `/wp-login.php` | 55 |
| `/api/.env` | 25 |
| `/app/.env` | 19 |
| `/web/.env` | 18 |
| `/backend/.env` | 18 |
| `/public/.env` | 17 |
| `/src/.env` | 17 |
| `/laravel/.env` | 17 |
| `/config/.env` | 17 |
| `/core/.env` | 15 |
| `/admin/.env` | 14 |

Look at that list. Some program is walking through every folder name a developer might have used,
one after another. If your secrets are sitting behind any of those doors, a bot will come knocking,
probably within the hour. On my server every one of those requests hit a fake `.env` stuffed with
convincing but useless credentials, and every single one got logged.

If you take one thing from this post, take this. The most common automated attack on the internet is
not sophisticated. It is a stranger quietly checking whether you left your keys in the lock.

## The surge nobody warned me about

The traffic did not arrive in a steady stream. It came in a wave.

| Day | Probes |
|---|---|
| Jul 6 | 18 |
| Jul 7 | 122 |
| Jul 8 | 156 |
| Jul 9 | 95 |
| Jul 10 | 19 |
| Jul 11 | 8 |
| Jul 12 | 9 |
| Jul 13 | 38 |
| Jul 14 | 9 |
| Jul 15 | 6 |
| Jul 16 | 8 |
| Jul 17 | 16 |

Day one was quiet. Then it jumped. Day two brought 122 probes, day three brought 156. For about
seventy-two hours my little trap was busier than it has been at any point since. Then, almost as
quickly as it climbed, it dropped back to a slow trickle of under twenty a day.

I cannot prove exactly why, but the shape is familiar. A fresh server goes up, gets picked up by the
automated services that constantly map the internet, lands on a few shared target lists, and for a
couple of days every bot subscribed to those lists takes a swing. Once you give them nothing worth
having, most of them lose interest and move on to the next address. The internet has a short
attention span. Honestly, that is a little comforting.

## Where it came from, and why that is misleading

The map lit up across sixteen countries, and every single one of the 45 machines geolocated to a real
place.

| Country | Machines |
|---|---|
| United States | 13 |
| Ukraine | 7 |
| Netherlands | 4 |
| Germany | 4 |
| United Kingdom | 2 |
| Australia | 2 |
| Singapore | 2 |
| Taiwan | 2 |
| Romania | 2 |

The raw geography hides the more interesting story though. By number of machines, the United States
led. But by sheer volume of probes, the Netherlands buried everyone with 206 hits, and almost all of
that came from three or four boxes. One machine in the Netherlands knocked 134 times on its own.

That gap matters. A country near the top of the list is not a country full of hackers. Most of these
machines are cheap cloud servers, rented by the hour, spun up in whatever region was closest or
cheapest. The person driving them could be anywhere on earth. When you see "Netherlands" or
"Singapore" high on the list, you are usually looking at a data center, not a home. Attackers rent
infrastructure the same way the rest of us do.

## Nothing dangerous ever actually knocked

Here is the part that surprised me most, and it is not what I set out to write.

honeydj scores every attacker from 0 to 100 as it learns more about them. After twelve days and 45
machines, not a single one broke 10. No exploit frameworks. No `sqlmap` clawing at my database. No
known scanning tools of any kind. The most alarming label in the entire real dataset was
`credential_access`, which is just the polite name for "tried to grab your `.env`." Everything that
reached me was a blunt, automated bot running the same tired checklist.

And I want to be honest about how I learned that, because the lesson is a good one.

When I first pulled the numbers, one attacker jumped straight out. No location. Flagged as a known
scanner. Carrying the fingerprints of `sqlmap` and a `meterpreter` payload, the kind of thing you run
once you are already inside a machine. It scored higher than anything else in the whole run, and for
about a minute I thought I had caught something real.

Then I checked my shell history. It was me. A test command I had fired at my own trap days earlier
while setting up the alerts, a fake armed probe I sent on purpose to make sure the pipeline worked.
The tool had faithfully flagged exactly what I told it to flag. Of the 504 hits it captured, that one
was mine. I pulled it out, and what remained were 503 probes of pure background noise.

Sit with that for a second, because it is the real finding. Nobody is going to out-hack you. They are
going to wait for you to leave a door open, and then a bot that none of them even wrote is going to
wander through it. The threat here is not skill. It is volume, patience, and your one bad day.

## So what does a company actually do with this?

Collecting attacker data is a fun trick. Using it is the point. Whether you run a honeypot or just
read your logs a little more carefully after this, here is how the same intelligence turns into real
protection.

**Fix the thing everyone is hunting for, first.** Eighty-five percent of my traffic wanted a `.env`
file. So the highest-value hour you can spend is making sure yours can never be served over the web.
Keep it out of the web root. Confirm your server config blocks dotfiles. Never commit it to a repo.
And if there is any chance a secret was ever exposed, rotate it now. The bots have already told you
exactly what they check.

**Separate the noise from the signal.** Most of what hits you is automated and harmless, and treating
every log line as an emergency will burn you out in a week. A threat score does the triage for you.
Watch the small handful of high scorers, the known scanners and the ones carrying real tools, and let
the rest be background weather. Just remember to keep your own test traffic out of the numbers.

**Turn the worst offenders into a blocklist.** The IPs that show up with high scores, real attack
fingerprints, or relentless hammering are good candidates to drop at the firewall or feed into
something like fail2ban. You can also report them to shared reputation feeds, so the next person's
server gets a warning before the bot even arrives.

**Notice what they assume about you.** I do not run WordPress, yet 55 probes marched straight at
`/wp-login.php`. Attackers rarely check what you actually run. They spray the common stuff and see
what sticks. That is a good reminder to harden, or simply delete, any well-known endpoint you are not
using, because someone will try it no matter what.

**Watch your own hosting ranges.** If a pile of abuse is coming from cloud ranges where you have no
real users, blocking those ranges at the edge is often a cheap win. Actual customers almost never
browse your app from a server rack on the other side of the planet.

None of this needs a security team. It needs knowing what is actually being tried against you, which
is the entire reason to set a trap in the first place.

## The map, twelve days in

<!-- Drop the updated live map screenshot at public/honeydj-map-report.png -->
![The honeydj live attack map after twelve days, with markers spread across sixteen countries](/honeydj-map-report.png)

## What is next

Twelve days, 503 probes, and one blunt lesson. The internet is mostly not trying to break into your
app with anything clever. It is running a giant, tireless checklist against every server it can find,
and most of that checklist is just "did you leave your keys out?"

I am leaving the trap open. I want to see what a full month looks like, whether the quiet stretches
stay quiet, and whether anything ever shows up that is genuinely worth the name attacker rather than
just another bot reading from the same list. If something more interesting than an `.env` sweep walks
in, you will hear about it.

The trap is still running. Something is always knocking.
