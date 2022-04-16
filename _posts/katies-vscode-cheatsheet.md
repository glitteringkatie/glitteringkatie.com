---
title: "Katie's VSCode Cheatsheet"
date: "2022-04-11"
tags: ["work"]
coverImage: "https://glitteringkatie.com/assets/blog/default6.jpeg"
---

## Assumptions!
Let's get on the same page. This guide assumes you already have a prettier config and eslint config set up. This will be useful if you want to figure out how to make prettier and eslint Just Work™ in VS Code on save.

If you're using only prettier and not eslint or eslint and not prettier, this should be easy to follow. If you're using some other formatter/linter combo, this might still be helpful, but I'm not sure how you got here--welcome!

## Extensions!
Alright, this is the easy part; let's install some extensions! In the left sidebar of VS Code, you'll find the Extensions tab. It looks like a square pizza with one slice being removed. Hovering over it, it says `Extensions`. Click that to search for the extensions you're looking for.

## Settings!
The easiest way to get to your settings has been the keyboard shortcut `cmd+,`. This actually works in all mac applications.

The settings for vscode come in a GUI but also as JSON. To access the JSON, while in the settings, find this file icon with an arrow in the upper right-hand corner:

![Screenshot of VSCode's JSON settings icon](/assets/blog/katies-vscode-cheatsheet/settings.png)

The alt text for the icon is "Open Settings (JSON)". Clicking that icon will open your settings.json! Many settings can be set from the GUI, but some of the ones we're dealing with today are only accessible by manually setting them in `settings.json`, so we'll just edit there. (Plus, it makes copying and pasting nicer. But if you DO type it out, you'll see some nice type-ahead added).

## Eslint + Prettier!
First off, you'll need to install these plugins:
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

And then I suggest the following settings:

```json
{
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
}

```

As you can see above, you can set a default formatter per language. If it isn't working out as expected, I'll often set `editor.defaultFormatter` on the top-level object to be `esbenp.prettier-vscode`. Of course, that makes _every_ file use prettier, but hey, I'm usually working just in the JS ecosystem.

The setting `source.fixAll` can also instead be `source.fixAll.eslint` if it starts being too heavy-handed.

## Other Plugins!
These are other plugins I almost always install when I'm using VS Code:
* [Alphabetical Sorter](https://marketplace.visualstudio.com/items?itemName=ue.alphabetical-sorter)
  * I don't use this consistently, but when I need it, it is so handy.
* [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
  * I love seeing the context of when something was last edited and what that commit was while looking at code and trying to investigate an issue.

## Other settings!
These are my favorite basic settings for VS Code:

```json
{
  "editor.scrollBeyondLastLine": false,
  "editor.minimap.renderCharacters": false,
  "editor.renderWhitespace": "boundary",
  "editor.tabSize": 2,
  "editor.rulers": [80]
}
```