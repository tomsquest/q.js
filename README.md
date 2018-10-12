# Q

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![CircleCI](https://circleci.com/gh/tomsquest/q.js.svg?style=svg)](https://circleci.com/gh/tomsquest/q.js)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3f3e1c584e644410a17475779125a671)](https://www.codacy.com/app/tomsquest/q.js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=tomsquest/q.js&amp;utm_campaign=Badge_Grade)

**`q`** is a better way to do print statement debugging.

Type `q` instead of `console.log` and your variables will be printed like this in `$TMPDIR/q`:

![output sample](output_sample.png)

## Why is this better than `console.log`?

* Faster to type
* Pretty-printed vars and expressions
* Easier to see inside objects
* Does not go to noisy-ass stdout. It goes to `$TMPDIR/q`.
* Pretty colors!

## Install

```sh
npm install --global qqd
```

_Hint: `qqd` is for **Q** does **D**irty **D**ebugging._

## Usage

```js
const { q } = require("qqd");
...
q(a, b, c)
```

Then tail the `q` file:

```bash
tail -f $TMPDIR/q

# or, if $TMPDIR is not defined:
tail -f /tmp/q
```

For best results, dedicate a terminal to tailing `$TMPDIR/q` while you work.

## Haven't I seen this somewhere before?

**Python** programmers will recognize this as a Javascript port of the [`q` module by zestyping](https://github.com/zestyping/q).

**Go** programmers will recognize this as a port of the [`q` module by y0ssar1an](https://github.com/y0ssar1an/q).

Ping does a great job of explaining `q` in his awesome lightning talk from PyCon 2013. Watch it! It's funny :)

[![ping's PyCon 2013 lightning talk](https://img.youtube.com/vi/OL3De8BAhME/0.jpg)](https://youtu.be/OL3De8BAhME?t=25m14s)

## FAQ

### Why `q`?

It's quick to type.

### Why `qqd`?

On NPM, the `q`, `dd` and even `qdd` (like 'Quick-and-Dirty Debugging') were already published.   
`qqd` seems to be a good choice, short and meaning **Q** does **D**irty **D**ebugging.

### Is `q` safe for concurrent use?

Yes.

### Haven't I seen this README somewhere before?

Yes, it is largely inspired by the very good README of the [`q` module by y0ssar1an](https://github.com/y0ssar1an/q).
