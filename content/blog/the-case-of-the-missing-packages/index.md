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
