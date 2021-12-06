---
title: "🌳 Learn You a Hask/Elm for Great JavaScript"
date: "2018-03-07"
tags: ['work']
---

A class I took in college called Programming Language Fundamentals introduced me to [Haskell](https://www.haskell.org/) and it didn’t take long until I was utterly charmed by this language. It was my first taste of the functional programming paradigm and everything I did felt like solving a riddle. Haskell made me feel clever and while programming shouldn’t be _all_ solving riddles, it is sure fun to feel clever. Before class one day, a friend who shared my enthusiasm (and who knew I liked frontend development) told me I should check out [Elm](http://elm-lang.org/). I searched for “Elm” and once google figured out I wanted the language and not “West Elm”, I found my way to their website and to the web browser wysiwyg. For once I had a hard time paying attention to my Haskell class because I was so interested in figuring out (and comparing) Elm.

Eventually I graduated and started working at [AppNexus](https://www.appnexus.com) and for my goals at work I focused on Elm for a quarter and read [Learn You a Haskell for Great Good](http://learnyouahaskell.com/) for a quarter — both to better learn functional programming. But let’s be honest it was to scratch this itch I had for these languages. Or at least that’s how it started. Unbeknownst to me I was learning Haskell and Elm for great JavaScript.

At my job we use [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/) — when I first started learning Redux I had a really hard time primarily because of the language around it. What the hell were reducers and dispatchers and why were actions not taking action? The names didn’t make sense to me and didn’t hold meaning to me so I had a rough time trying to keep it all straight in my head. Learning Elm was really valuable to me for this reason because Redux’s architecture was inspired by Elm’s architecture. Redux has `actions` that get sent to `reducers` that change your app’s `state`; Elm has `messages` that get sent to `updates` that change your app’s `model`. Learning this pattern with the word choice that Elm used, as opposed to Redux, helped me immensely. I could understand what a `message` was and wasn’t confused why it wasn’t taking action. `Update` is a word I use in my personal lexicon far more than `reduce`. To be fair, `state` and `model` were pretty 50/50 for me.

Going through Learn you a Haskell actually helped me get to know [lodash](https://lodash.com/) better. As I learned more about the core Haskell library functions I would check out lodash and try to figure out its equivalent. Sometimes I would even write the Haskell lesson in pseudo-javascript just to try on different hats while learning. Haskell helped lodash’s `reduce` really click. I had a hard time remembering that function and why to use it but then when I was doing a lesson involving folding, I realized “Hey, this is what reduce is!” This is another example where word choice affected my understanding — “folding” makes me think of when you lightly mix things in cooking so I had that visual cue to remember what it was called whereas `reduce` doesn’t really give me that memory cue.

At a broader scale, working through Elm and Haskell helped me be more conscious in JavaScript. Since both languages are pretty minimal on parentheses, I started focusing more on readability and noting what I liked, what I didn’t like, and what seemed the most clear. I was more conscious about side effects and how we could keep functions as pure as possible. Type systems became even more my jam than they were before. And finally I just learned how to think functionally and how to keep those functional tools within reach so they could be part of muscle memory.

Part way through this I did stop and start wondering what I’m even doing and why. It’s not like I’m writing Haskell day to day. I wrote a scrabblizer that takes a message and translates it to the scrabble emoji code for slack but that’s about it. But then I just reminded myself that 1) I’m doing it because I just genuinely think these languages are fun and 2) they are teaching me lessons I can take elsewhere.

Now I’m not saying YOU should go out and learn Haskell and Elm for great Javascript. Learn the languages you want to learn — pay attention to the lessons that are agnostic of language and be aware that certain word choices will click better for some people over others. If you’re studying some weird language, think about the patterns you are using and how their word choice could be better or how it aides your mental model. Languages have certain attributes baked in and that will change how you approach and understand problems.