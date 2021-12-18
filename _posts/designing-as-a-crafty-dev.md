---
title: "Designing as a crafty dev"
date: "2021-12-17"
tags: ['work']
coverImage: '../assets/blog/designing-as-a-crafty-dev/layouts.png'
coverPosition: "top"
---

If you've been here before, you know I'm a frontend developer! If not, welcome to my blog! Like any dev, it's hard to resist that well-known itch to re-do my personal website. So here we are. I've given my website a facelift for 2 reasons:

1. I want to support more blog post topics than just tech.
2. I want to use [Next.js](https://nextjs.org/) because that's what I've been using at work.

I've always been a crafty person with an eye for design. I designed all previous iterations of this website! But I'm by no means a graphic/web/frontend designer, so it is *super* easy to get overwhelmed when planning out a new design.

Why is it so hard to get started? Well, frontend design is honestly blank canvas/page syndrome to the max. When painting, you at least have a limited color palette; or when decorating a room, you have a budget.

When designing a website, it is easy to be overwhelmed because you have virtually every color and font and every way of configuring that content that you can imagine.

## Get some inspo

Taking inspiration from how I approach planning a room, my first step was [creating a Pinterest board](https://www.pinterest.com/glitteringkatie/blog-mood-board/) and pinning anything I liked. Fonts, layouts, colors, etc. This helped me see everything I was drawn to all in one space, identifying the patterns that emerged.

Looking in my closet and around my apartment, I obviously love greens and creams together. So obvious, in fact, that one day in a 1-1, I realized I was on a dark teal couch with a dark green sweatshirt with my pale complexion holding a mug with a dark teal/green dipped bottom and creamy top. When you start paying attention, you'll see patterns pop out.

Mood board resources:

- [Pinterest](https://www.pinterest.com/) (benefit of having content in it already)
- [Milanote](https://milanote.com/product/moodboarding)
- [Make an Unsplash collection](https://unsplash.com/collections/a36sckpBj1U/blog-photos)
- Your photo editor of choice
- Old fashioned magazine + glue

## Narrow it down

We've gone from staring at a blank screen to staring at pictures and colors and fonts that we like. So let's key into our patterns!

### Colors

We just made mood boards with colors, so start with the color combos that pop out to you there, whether you saved actual color palettes or just images. We're going to aim for 5 starter colors:

- Background color (Usually white or off white)
- Text color (Usually black or off black)
- Main color (Pick your favorite color!)
- 2 Accent colors (You can choose more if you want, but 2 is very doable. These should make your main color look its best!)

And then, let me introduce you to your new best friend: [Coolors.co](http://coolors.co/)!

### [Coolors.co](http://coolors.co/)

First, go to [coolors.co/generate](http://coolors.co/generate). If you have any colors for which you know the *exact hex*, go ahead and input those and lock them in. Then have at it with the space bar to auto-generate color palettes! It looks like coolors does a good job of giving you a mix of complementary, contrasting, and triadic color schemes. If you're not set on the *exact* hex code, play around with the colors you started with. You never know what you'll find!

When playing around with the hues and tones, I suggest using HSL. This is a color code based on Hue, Saturation, and Luminance. HSL is much closer to how we think of color mixing, thanks to elementary school, than something like RGB.

### Quick accessibility note

Now that you've found some colors you like, let's refine them while thinking about accessibility. Here are your steps

1. Go to [https://webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/)
2. Test 1: your text color on your background color, make either darker or lighter as needed
3. Test 2: your main color on your background color, again adjusting & checking test 1 if you change your background color
4. Test 3: either your dark-ish or black-ish color on your main color as a background, think CTA buttons needing text

### Fonts

First, look at your mood board and notice what fonts you saved have in common. Are they serifed (have feet)? Are the sans-serif (no feet!)? Are they more blocky? Handwritten? We're going to choose 3 fonts here:

- Logo font
- Header font
- Base (paragraph) font

I didn't use the same font in my logo as I did in my header because I read a blog post saying that you need to keep your logo distinct. But that's up to you!

In a book, paragraph fonts are usually serifed. The feet of the serif drag your eyes across. They provide movement. Sans-serif fonts tend to be a little crisper on a screen because a consistent stroke is easier to render than a tapering edge. Do you want people to stop and take notice? Or sit and read?

You can find fonts anywhere, but I'd recommend skimming through [Google Fonts](https://fonts.google.com/). Their fonts are free and open source and are super easy to include in your website. They are also pretty widely available in other systems, like [Figma](https://www.figma.com/)! If you want help narrowing down options, [Typewolf has a great guide on Google Fonts](https://www.typewolf.com/google-fonts).

### Logo

My "brand name" lends itself easily to an emoji. I actually had the emoji in mind when brainstorming a consistent handle across platforms. So I've always used ✨ as part of my branding.

I used [Canva's logo templates](https://www.canva.com/logos/) to play around easily and see what I liked. I keyed in on a design, but with Canva, you don't own your logo. So I keyed into the design I liked the most and used it as inspiration in [Figma](https://www.figma.com/).

In Figma, I developed a logo icon and a logo with my name in it. The icon lends itself to favicon use, and the full logo lends itself to the header. I then made heavy use of Figma allowing you to right-click and copy as SVG to save my designs!

### Swatch it all together

Using Figma still, I put my logo icon, my full logo, and a swatch of my colors and fonts together. I want to pause here and say I never really used Figma before this project, so I don't know all of the ins and outs, just kind of futzed with it until I had something that looked reasonable.

![unorganized screenshot of my logos & font/color swatch](../assets/blog/designing-as-a-crafty-dev/swatch.png)

## Layout

Alright! We have colors! Fonts! A LOGO! We're ready to go now, right? I really want to plead with you, developer, that you should spend the time actually laying out your pages in Figma or on a sheet of paper or whatever. Creating a layout isn't as easy as it seems when you have no plan. Again, we're dealing with the ultimate blank canvas syndrome.

Did you save any layouts on your mood board? If you didn't, surf around the 'net now and find similar websites to yours. Go on some website template services and see how they layout content. Don't copy directly but take inspiration.

### Real content

You know how when you were a kid, and you drew a speech balloon and tried to fit text inside of it only to find out you didn't leave enough room? That's going to be you now if you don't take the time to think through your real copy.

Real talk? Step all the way away from your design editor. Just do this in a document using bullet points to represent different sections, side-by-side sections, or links to other pages.

### All together now

Once we have realistic content and have decided on colors, fonts, and logos, it's time to put this puzzle together! Make a layout for every page you intend on having, no matter how simple that page will be. I promise taking the time to do all of this planning *will* lead to a better thought-out website, and it *will* make your coding process more straightforward.

![screenshot of all of my layouts planned in figma](../assets/blog/designing-as-a-crafty-dev/layouts.png)

## You got this

This whole thing takes time. But once you have a solid design plan, it will be worth executing it and making it live. For me, it took around 25 days to go from nothing to deploying on [glitteringkatie.com](http://glitteringkatie.com/).

When I decided to redesign, I was ready to immediately get coding. But I made myself take the time to really think through my design. Honestly, once I had a design, I didn't even want to code at that point. Ultimately the motivating factor for me wasn't, "Wow, I'll have an even nicer tech blog!" Instead, it was, "Wow, when I'm done, I'll have better functionality to support posts about furniture flipping and random crafts!" If you’re putting in this hard work, know *why* you are doing all of this work!

I hope something in this blog post helped you! And stay tuned for some non-tech content in the future!