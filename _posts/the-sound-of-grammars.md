---
title: "⛰ The Sound of Grammars"
date: "2018-04-06"
tags: ["work"]
coverImage: "../assets/blog/the-sound-of-grammars/the-sound-of-music.jpg"
coverPosition: "top"
---

> I am currently working my way through _Parsing Techniques: A Practical Guide_ by Ceriel J.H. Jacobs and Dick Grune which is available as a [PDF on Grune’s site](https://dickgrune.com/Books/PTAPG_1st_Edition/BookBody.pdf). As I continued in the book I found myself having a hard time following classifications and grammar levels when they were used interchangeably. I am using this blog post to hash it all out for myself so I can practice keeping the order and meaning straight by explaining these concepts to my good friend, the internet.

![Sound of Music hills with Maria twirling around, but with Noam Chomsky's face photoshoped in](../assets/blog/the-sound-of-grammars/the-sound-of-music.jpg)

Let’s start at the very beginning ([a very good place to start](https://open.spotify.com/track/1BQh9oqKFvcRqgR4rmB536?si=XnWXs8LsTuCKgebEkWBgkw)): what is the Chomsky Hierarchy? Well it’s a hierarchy of formal grammars described by [Noam Chomsky](https://en.wikipedia.org/wiki/Noam_Chomsky). Hm, that wasn’t exactly the _very beginning_, was it?

What most people think of as a “normal language” (something you use to communicate with other humans, like English) is called a natural language, whereas a programming language (something you use to communicate with computers) is a formal language.

A formal grammar describes a formal language. Just like in natural language, a grammar isn’t going to tell you what a sentence means but it will tell you how to form that sentence. In our formal world, a sentence is more like a formula or a statement. In a language where we can have any amount of a and any amount of b , but every a has to always be before every b, aaaabbb would be a valid sentence.

Now that we’re back at the very beginning: what is the Chomsky Hierarchy? This is a classification of how strict a grammar is, with 0 being the least strict (but hardest to parse) and 3 being the most strict (but easiest to parse!). Before diving in I want to get some definitions out of the way for the terms that we’ll be using.

- **Rule:** A rule takes the form of `A -> a` where A and a are both _something_ (each step of the hierarchy has its own definition). But this is basically a production step — given this input, provide this output.

- **Symbol:** This can be anything! They are values used in some sort of sequence of values. We’ll get into two types of symbols soon but for now think of them as a placeholder value and a content value. In our rule, both `A` and `a` are symbols.

- **Sentence:** A sentence contains one or more symbol. A “valid” sentence is a sentence that can be produced by the given grammar and a fully produced/final sentence has used the rules provided to replace all placeholder values with real content.

- **Left-hand side:** The left-hand side (you’ll see LHS sometimes but I want to try to avoid acronyms) is the `A` in my above example — it is the left-hand side of the rule.

- **Right-hand side:** Bet you can guess what this one is. Yep, the right-hand side of the rule! You did great. That would be `a` in our example.

- **Non-Terminal Symbol:** A non-terminal, or non-terminal symbol, is a symbol that will not be allowed in a final sentence —this is our placeholder value from before! You can also think of it as a variable. _Hopefully_ you will be able to turn it into a terminal eventually using the rules in the grammar, otherwise it is a sentence that doesn’t exist in the language. `A` is our non-terminal in our rule.

- **Terminal Symbol:** A terminal, or terminal symbol, is a legal symbol in the language — this is our content symbol. Like the non-terminal is our variable, the terminal symbol is the value. This symbol will no longer be processed further since it is in its final form. A terminal is usually lower case, so in our example it is `a`.

## Type 0: Unrestricted Grammars

A grammar rule consists of a left hand side and a right hand side. Something like `A -> a`. An unrestricted grammar means _anything_ can be on the left hand side and _anything_ can be on the right hand side. Go nuts (well, [as nuts as a Turing machine will let you go](https://en.wikipedia.org/wiki/Unrestricted_grammar#Unrestricted_grammars_and_Turing_machines)).

## Type 1

Type 1 grammars are where things get more restrictive (and more fun!). These grammars may have rules that transform a non-zero number of symbols to possibly zero number of symbols. These come in two flavors: original and flavortown.

### Monotonic

Monotonic grammars contain no rules where the left-hand side has more symbols than the right-hand side. For an example, [I just try to think of nice things](https://www.youtube.com/watch?v=0IagRZBvLtw): `FavoriteThing and FavoriteThing -> raindrops on roses and whiskers on kittens`. Our left-hand side has 3 symbols and our right-hand side has 7 symbols. This grammar is Monotonic! A rule that has [16 symbols on the left hand side going on 17 symbols](https://www.youtube.com/watch?v=hwK_WOXjfc0) on the right hand side would also be monotonic.

### Context-Sensitive

Context-sensitive seems like the prominent definition of Type 1 grammars. A context-sensitive grammar only consists of rules where only one symbol on the left-hand side is replaced by another symbol on the right-hand side. The note here is that the left-hand side can still be any number of symbols but the grammar must remain monotonic (i.e. number of symbols on the left-hand side is less than the number of symbols on the right-hand side.

Below we’ve added two possible outcomes for the rule `FavoriteThing` as well as how to parse after you have selected a `FavoriteThing` structure.

> You’ll see `|` used in the upcoming grammar examples, it just means that for the given left hand side, you have options!

```
FavoriteThing -> Adjective Adjective Noun | Noun on Noun

Noun on -> raindrops on | whiskers on

Adjective -> bright | copper | warm | woolen

bright Adjective -> bright copper

warm Adjective -> warm woolen

raindrops on Noun -> raindrops on roses

whiskers on Noun -> whiskers on kittens

bright copper Noun -> bright copper kettles

warm woolen Noun -> warm woolen mittens
```

In this grammar we have defined, only one non-terminal (e.g. `Noun`) is replaced by a terminal (e.g. `kittens`) at a time and the left hand side is always equal to or less than the number of symbols on the right. Our example for monotonic grammars above isn’t context-sensitive because it is replacing multiple words at once. I like this example because the term “context sensitive” makes a lot of sense — in the context of `raindrops on` you can only finish that with `roses` and not `kettles`.

## [Intermission](https://www.youtube.com/watch?v=M7pxbCAHyi4)

Keep your eye out for [Sound of Grammars (Reprise)](../the-sound-of-grammars-reprise) where we’ll explore Type 2 and Type 3 grammars!
