---
title: "⛰ The Sound of Grammars (Reprise)"
date: "2018-04-13"
tags: ["work"]
coverImage: "https://glitteringkatie.com/assets/blog/the-sound-of-grammars-reprise/the-sound-of-music-reprise.jpg"
---

> Welcome to The Sound of Grammars (Reprise), you can catch the first part of the series [here](./the-sound-of-grammars). As a reminder, I’ve been reading _Parsing Techniques: A Practical Guide_ by Ceriel J.H. Jacobs and Dick Grune which is available as a PDF [on Grune’s site](https://dickgrune.com/Books/PTAPG_1st_Edition/BookBody.pdf).

![Sound of Music: Maria sings to the von Trapp children but Noam Chomsky's face is photoshopped to replace Maria's](/assets/blog/the-sound-of-grammars-reprise/the-sound-of-music-reprise.jpg)

## Type 2: Context-Free Grammars

Now that you’ve heard about context-sensitive grammars, let’s throw context out the window! Both left and right contexts are absent for a type 2 grammar, meaning there is only one symbol on the left hand side.

```
FavoriteThing -> Adjectives Noun | Noun PrepositionalPhrase

Adjectives -> Adjective Adjective

Adjective -> bright | copper | warm | woolen

PrepositionalPhrase -> on Noun

Noun -> raindrops | roses | whiskers | kittens | kettles | mittens
```

Because we are lacking context, it is even easier to write sentences that have correct structure but may be weird or not make sense, like `kittens on raindrops` or `bright warm whiskers`. However this makes our grammar more flexible and like we said before — grammar only determines if you are structurally correct, not logically (or lyrically) correct.

For sake of example, let’s say we want unlimited (at least one) adjective. We can alter our `Adjectives` rule to be `Adjectives -> Adjective Adjectives | Adjective`. As soon as you want to end your list of Adjectives you can choose the `Adjective` option from the right hand side and that cuts the recursion off. This is a very common rule structure for duplicates of the same thing, so there’s shorthand for it already!

There is an extended context-free grammar (called Extended Context-Free 😱 or Regular Right Part Grammars) that adds some symbols to Context-Free grammars that allows a bit more flexibility for these common patterns. Let’s say there will always be more than one adjective but maybe more. We could define them as `Adjectives -> Adjective**+**`. Maybe we will have no adjectives or only one adjective: `MaybeAdjective -> Adjective**?**`. And if you combine them and want zero or more adjectives: `MaybeAdjectives -> Adjective**\***`.

If you’re familiar with regular expressions, you may recognize these common modifiers: **+**, **?**, and **\***. We’re just pattern matching! And speaking of…

## Type 3: Regular Grammars

Let’s get regular. For a Type 3 grammar, a right hand side can only have one non-terminal symbol and it _must_ be at the end. As far as Chomsky is concerned, a non-terminal must produce **one** terminal or **one** terminal followed by one non-terminal.The book differs from this definition and replaces the bolded ones with “zero or more”.

Terminal symbols are usually single characters only (think of regular expressions and how each letter/symbol is a match, not the group) and in addition to the symbols in the extended context-free grammar, `[]` is used to denote a possible set of characters (like how we were using `|` before). This grammar makes less sense for the grammar we were using and more sense for a pattern of characters you might want to produce. Instead of thinking about all of our favorite things, let’s focus on that kitten that has whiskers.

Our kitten may say `meow` or `mew` so we could make a grammar that is `S -> meo?w` which would produce an `m`, an `e`, maybe an `o`, and a `w`. But let’s make our cat a little more international. Let’s say our cat can speak the following languages (list from [Care2](https://www.care2.com/greenliving/what-does-a-cat-say-in-japanese-in-french-in-greek.html)):

1. Catalan: Meu

1. Chinese: Mao

1. Dutch: Miauw

1. Finnish: Miau

1. French: Miaou

1. Hebrew: Miau or Miya

1. Hungarian: Miaaau

1. Portuguese & Spanish: Miau

Cats can say other things too (like `nyan`) but I kept our list to languages that follow a pattern: these all start with one m, that m is followed by one or more vowels (counting y), and sometimes the meow ends in one w. Let’s make a regular grammar that can produce cat sounds for cats who are brief and for cats who are chatty:

```
S -> M, S | M

M -> m[aeiouy]+w?
```

When you have the letters to meow, you can meow most anything! If you remember, `[]` denote a set of characters to choose from, the `+` is “one or more” and the `?` just means “maybe ¯\\\_(ツ)\_/¯”. This grammar is also able to make up new words for the cat to say, like meyw and myyyyyyyyyyyy which can be fun but can also be not what you want. If you restrict the grammar to only produce cat sounds from \_real\_ languages, our grammar we just made wouldn’t work out.

> If you’re interested in playing around with the regular expression I used to create this grammar, I have a [regex101 tester set up](https://regex101.com/r/la7eSf/2) that contains some other languages that don’t follow our pattern as well as made up words from the grammar we created.

## [So Long, Farewell](https://www.youtube.com/watch?v=Qy9_lfjQopU)

The book also identifies a type 4 grammar (finite-choice — no non-terminal symbols allowed) and [Van Wijngaarden grammars](https://en.wikipedia.org/wiki/Van_Wijngaarden_grammar). I wanted to stick to just the Chomsky hierarchy as these were the grammars (specifically context sensitive) that were talked about the most. It’s important to note that the hierarchy stacks — a grammar that is Type 3 (regular) still fits the Type 1 (context-sensitive) definition.

**tl;dr — Type 0 is all formal grammars, Type 1 is context-sensitive (`bright Adjective -> bright copper`), Type 2 is context-free (`Adjective -> bright | copper | warm | woolen`), and Type 3 is regular (`M -> m[aeiouy]+w?`).**

> So long, farewell, au revoir, auf wiedersehen
>
> I hope I’ve helped to lessen grammar pain
