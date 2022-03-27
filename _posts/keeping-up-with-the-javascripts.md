---
title: "🍿 Keeping Up With the JavaScripts"
date: "2020-11-23"
tags: ["work"]
coverImage: "/assets/blog/default6.jpeg"
---

In July 2020 I found myself as part of the many people affected by COVID-19 related layoffs. Before that, I was writing anything from Elm to Ruby to Elixir at NoRedInk. And before _that_ I was working with JavaScript and React for three years at AppNexus.

It was fun to get the chance to write Elm professionally! But when I found myself looking for a new job, I decided I was ready to get back into the mainstream. After not writing any JavaScript for a year and a half, I was hired at Elastic under the posting of "JavaScript Engineer".

So how did I brush up on JavaScript?

## Hooks

Through my JavaScript gap year (and a half), I still followed JavaScript community members on Twitter, which gave me a rough idea of what was happening. At least, I was aware of functional components and React hooks (but not enough to know they were related concepts).

I checked in with some friends in a former-coworkers slack and they said, "Yes, learning hooks IS worth your time!" and also, "Yes, actually read [React's documentation](https://reactjs.org/docs/hooks-intro.html) because it is actually good" (mildly paraphrased). They haven't lied to me about JavaScript yet so I went with it and used that as my jumping-off point.

I did actually read all of React's documentation on hooks and I'm here to tell you: Yes, it is actually good documentation! When I felt good with my hooks knowledge, I looked into Elastic's component library ([EUI](https://elastic.github.io/eui/)) for some real-life examples.

A particular question I had in mind was around setState: is it more common to see one call to setState with an object representing state? Or more common to see multiple calls to setState, each with their own variable that would normally make up the state object?

I figured looking up a form would easily tell me that since forms usually have multiple variables tracked in the state. I found [a form example](https://elastic.github.io/eui/#/forms/form-layouts#form-and-form-rows) and the answer to my question: multiple calls to setState!

## Muscle memory

Alongside learning about what had _changed_ about React (not as much as I thought would have changed), I also wanted to get my muscle memory for JavaScript back. Brush off the dust, so to speak.

I wasn't sure how to go about this at first. I tried [Codecademy](https://www.codecademy.com/) but remember, I've written JavaScript professionally for three years so while Codecademy was great when I was learning, I wasn't starting from square one. Turns out the best way to re-acclimate is... just to write JavaScript. I had a few different paths for this.

### Tarot side project

Before really diving in deep, I tried to give myself about a week off from stressing (guess what: stress still happened). During this time I at least found the space to be creative and came up with a fun project! In typical side project fashion, it is not finished at the time of writing this post but will hopefully be good fodder for a future post.

I wanted to build a tarot deck companion web app: you pull a card, the computer tells you what it means. The trick with future telling type stuff is to keep things as vague as possible so that was the route I took.

I got to play with a natural language processing library, [Natural](https://github.com/NaturalNode/natural), and a sentence templating library, [Sentencer](http://kylestetz.github.io/Sentencer/). I'll keep the longer description for another blog post but all in all: having something I was excited to work on, and doing that in JavaScript, really helped me get my JavaScript muscle memory back.

### InterviewCake

When I was interviewing, [InterviewCake](https://www.interviewcake.com/) had an amazing deal to support folks who had been laid off due to the coronavirus pandemic. It felt like a far more enjoyable read than some nameless interview books out there and it had interactive examples!

Every weekday I gave myself a goal of InterviewCake problems to get through and this really helped me brush up on my JavaScript.

### This blog

I had been wanting to move away from Medium for a while but didn't want to over-engineer a personal blog. When I was interviewing for my current job, they mentioned that the project I'd be joining was currently written in Gatsby. Given those two facts and my free time, I figured it was time to play with Gatsby.

Building up my blog was really one of the first times during my interview prep where I felt like I was in a real React codebase--not just some toy interview question. It felt really nice to be back.

I did over-engineer one thing: at the bottom of the page where there is usually a "Made with ❤️" statement, I added functionality to randomize the emoji from some of my favorites. I _then_ decided that I should take seasons into account and added in some date checking to bring in Halloween and birthday emojis (September, October) or Christmas and winter emojis (November, December). Being excited about a little piece of functionality made JavaScript practice feel like play instead of work.

## On the collective mind

For more conversational interviews, I wanted to figure out what the JavaScript collective was thinking about. I skimmed through titles of talks from React Conf 2019 and that was helpful.

One talk that I watched was [The State of React State in 2019](https://www.youtube.com/watch?v=wUMMUyQtMSg) by [Becca Bailey](https://twitter.com/beccaliz). This helped me see how thoughts on state had changed since hooks came out. It was a great broad overview for me to get up to date.

I also watched [Accessibility Is a Marathon, not a Sprint](https://www.youtube.com/watch?v=ONSD-t4gBb8) by [Brittany Feenstra](https://twitter.com/BrittanyIRL). When I was writing Elm, there was a strong push for accessibility to be a default. I was really interested to see how the React community was thinking about it. I was glad to see the push for not breaking semantic HTML since when I left, it was totally fine to leave divs all over the place.

## Practice interviews

In addition to all of this prep, practice interviews with friends who work in JavaScript day-to-day also really helped. I got the practice of pretending I'm in an interview but at the end, I also got to ask, "Okay, what is out of date in the JavaScript I wrote? Can you help me modernize this with hooks?"

When I last was writing JavaScript, I was working with the best practice that if you're using [lodash](https://lodash.com/docs), just use it for everything even if [`Array.prototype`](https://developer.mozilla.org/tr/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype) has the given function. During practice interviews, I got to learn that people now lean towards `Array.prototype` functions _first_.

Verifying my assumptions and understandings with someone who works day to day in JavaScript significantly helped me gain my JavaScript confidence back.

## One month in

I am writing JavaScript again! One month in, I have had a few moments where I've gone to write something and it comes out in pseudocode-gibberish (looking at you, [switch/case](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)), but for the most part, I'm back to writing JavaScript fluidly again.

In my first computer science class in high school, we were learning Pascal, something my CS teacher admitted was outdated for 2010. But my teacher told us something that has always stuck with me: focus on the _semantics_ not the syntax. I've been able to hop around to different languages because I know my core concepts, learning the syntax of a language can come second.

I was hired because of how I think as an engineer, not because I can write a given language. And in the end, an employer with that order of priorities is the kind I want to work for.
