---
title: "🕵🏼‍♀️ The Case of the Missing Packages"
date: "2019-03-08"
canonical: "https://medium.com/@glitteringkatie/the-case-of-the-missing-packages-98a3884af648"
---

Onboarding: follow the instructions and most developers will get set up. But me? I’m not most developers. I’m Katie Hughes and I’m the private eye whose setup always goes awry. That is, until my bad luck met its match: a package manager by the name of [Nix](https://nixos.org/nix/).

## Friday

It’s the end of my first week and I need to do my third developer environment set up — this time on a loaner machine. Aware there will be a fourth round once my computer is back from repair, I sit with my fresh user and consider what I know:

- There’s a group of people at my company who use Nix.
- Nix is a package manager.
- Our main app is mostly set up to use it and could use more developers testing the workflow.
- I have nothing to lose in terms of my dev set up since I will have to do it all over again with my repaired computer.

The last point was the most important. Whatever I do on this machine _will not matter_. My luck is rotten when it comes to setting things up but with another try around the corner, it’s time to tempt fate.

I started by asking around — my connections only had brief run-ins with Nix. “[The DSL](https://nixos.org/nix/manual/#chap-writing-nix-expressions) was what kept me from diving in.” Interesting. I had to ask myself, _Have I ever been impeded by a DSL when using a package manager_.

What makes Nix so special? What makes its DSL so special? Why haven’t I had issues with DSLs and package managers before? What package managers have I used? _What even is a package manager_?

Wait. I’m spiraling. I know what a package manager is. I ask the follow up, “_Why_ has the DSL been a blocker?”

The answer becomes a theme for my Nix experience: “When I tried it out, a lot of packages were missing.”

This answer checks out — the DSL is a blocker if one were to add missing packages. I decide to go for it and start the Nix set up. I [install the package manager](https://nixos.org/nix/download.html) and run `make bootstrap` to set up our application’s Nix environment and… an error. I try a different order of things. Same result. I then realize I have one very important skill I wasn’t using: I could try reading the error message. It’s failing around some Python script due to not finding Python.

My understanding of Nix falters — didn’t it install everything you need and just work perfectly? Am I really already having issues? _Debug, debug, debug_.

No. The setup is wrong. It’s assuming I have Python 3 installed, which people install at some point but I have yet to. A missing package on my system. I work with my partner to make Nix call the Python script within the nix-shell so it would have a more self reliant setup.

In order to run the script within Nix, we preface it with `nix-shell` and give it a shell config. I make a mental note and my first incorrect assumption: I’ll need to call nix-shell whenever I want to use nix.

Friday comes to an end and I’m feeling pretty good about my first day with Nix. I debugged my heart out and got a pull request into our setup. I contributed. I’m told second hand to install MySQL and Redis through [Brew](https://brew.sh/) since we want to run those with [brew-services](https://github.com/Homebrew/homebrew-services). I take the note, stick a pin in it, and leave for the weekend.

## Saturday

Like chewed gum on the sole of a shoe, Nix was stuck on my brain. Why doesn’t Nix have something like brew-services? Surely that’s a common use case, isn’t it?

I consult a third party. It’s described to me that Brew only worries about macOS so it knows how to edit the startup scripts to include Redis and MySQL. Nix is agnostic but currently sides with [systemd](https://en.wikipedia.org/wiki/Systemd) over [launchd](https://en.wikipedia.org/wiki/Launchd). This sticky situation can be solved though, but will require further research. Another time, another place. I let this investigation rest for the weekend — I move on.

## Monday

Monday comes and I’m pairing… but not finished with set up. I realize there are a few update scripts listed as a footnote on the Nix page that I need to run. While updating, we find that gnutime is an uninstalled dependency. The missing packages increase; I need to install using Brew. I scribble a note to myself to mention that lead in our Nix channel.

My incorrect assumption from before is corrected. It’s clear to me now that the Python scripted needed nix-shell because the Nix environment wasn’t set up yet. But once `make bootstrap` was complete, I was able to call commands and Nix knew to use whatever was local to the project first. Just like my old pal, npm.

## Tuesday

My new machine comes and it’s time for my fourth and hopefully final set up. I’m confronted with the question: do I really trust this Nix character? Or am I just drawn in by the enticing green light of that which is functional programming?

I pull out my notebook and draw up an good ol’ fashioned pros and cons list:

### Pros

- I’ll get the same packages as _everyone else_.
- Within my company, the Nix users are growing.
- I can’t mess up because Nix doesn’t destructively uninstall anything so it is always safe to uninstall and reinstall.

### Cons

- Some packages remain missing and will remain missing until me or another Nix Detective steps in.

The choice is right in front of me and I take it; I choose Nix. In fact, I take it even farther: I decide to go Nix-First. If there is a package I need, I look it up in Nix. I take note of what isn’t there, use Brew, and move on.

## Today

I am not investing too much into what is or isn’t “the Nix way” but I _am_ using Nix. I see its usefulness on a project where many different developers are working on different machines and all want the same set up.

Have I made the switch at home though? No dice. To me, a singular person who sometimes does side projects but mostly doesn’t, I have yet to see the argument that pulls me. So at work I will use Nix and while at home I will stick with my Brew… for now.
