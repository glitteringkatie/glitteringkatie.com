---
title: "🧽 In Memes We Rust"
date: "2018-07-25"
tags: ['work']
coverImage: 'assets/blog/in-memes-we-rust/theydontstop.jpg'
---

![Screenshot of the lyrics of Smash Mouth's All Star ran through spongemock](./theydontstop.jpg)

This may seem like a familiar scenario:

- My friend says a comedically judgmental thing on Slack.

- We all respond with an emoji representing the [Mocking SpongeBob meme](https://knowyourmeme.com/memes/mocking-spongebob).

- I try retyping their message, alternating case.

- It’s a pain.

That was all it took to add a new item to my “learning project ideas” list: spongemock CLI. It’s simple enough to be done in one sitting but is dumb and frivolous enough where I find it fun and interesting.

> Is it unique? [No, of course not](https://github.com/search?p=1&q=spongemock&type=Repositories). Does that mean I shouldn’t do it? No, of course not!

I had been wanting to learn Rust for a while but never made it a priority. It seemed really fun! People I admire were learning it! _I_ should learn it! So I did.

I had a week off and while I was just lounging around a house in the high desert of Oregon, sipping gin and tonics, I decided it was time to learn Rust (and work on that silly spongemock idea I had).

I found [The Rust Programming Language Book](https://doc.rust-lang.org/book/index.html) (apparently called “the book” according to at least [the rust lang documentation page](https://doc.rust-lang.org/)) and immediately enjoyed how well written it was. In college, I majored in computer science and minored in psychology and the quality of textbooks was day and night: psychology books just _got_ how people learned in a way computer science books didn’t.

The way the Rust book was formatted reminded me of those psych textbooks — it was cognizant of how people (specifically, its intended audience of engineers) learn. There’s some basic getting started but it immediately dives into a project and explains things enough as you work on it. Then it goes into details of how things work until it’s time for another project.

I decided that after [the project in chapter 2](https://doc.rust-lang.org/book/second-edition/ch02-00-guessing-game-tutorial.html), I would start working on my spongemock program and just see what I can do.

Chapter 2 gave me a really solid foundation: some input, some output, a little looping — great! I filled in the gaps I needed to complete a basic spongemock by searching for it myself. A lot of those gaps were around string and character manipulation. The way Rust handles strings and characters reminded me of C (what I mostly did in college) more than anything I’ve done in a while.

This strategy of information gathering got me pretty far! I could ask for input and mock it by alternating case for letters only, leaving alone any other character.

I mean honestly that’s the heart of spongemock. But I started dreaming up ideas! For example: making it _more_ of a CLI than cargo run and taking command line input (it does now!) and maybe even having flags and reading from files. That’s when I started having a harder time understanding what I was finding online.

BUT GUESS WHAT: the book is so well formatted and teaches a command line program with file I/O as chapter 12.

I’ve decided that this project will be a work in progress as I go through the book. It was a good learning project because I could do it in one sitting and knock out what I needed for basic functionality. It was also a good learning project because it can grow as I learn:

- As I learn better practices

- As I learn file I/O

- As I learn more about building a CLI

- As I learn more about being a Rust programmer!

I wish my operating systems education had been less judgmental. Rust seems like a good community to relearn systems in a healthier way. I like this project because it is small, bite sized, and not serious at all. I saw a tiny itch and scratched it without worrying about if it had been built (it has) or if I was doing it right (probably not).

> Best practices and unique ideas come in time and practice, they don’t have to be the priority when you start learning.

I loved getting to be a creative investigator where my only goal was a silly program for the sake of learning and I’m excited to continue down that path with the book and spongemock. I certainly will be keeping my eye out for more small joke ideas that get me excited about learning because that’s what really matters.

> Want to check out my project? [https://github.com/glitteringkatie/spongemock](https://github.com/glitteringkatie/spongemock)
