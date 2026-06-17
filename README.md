<div align="center">

```zsh
root@vcangel.dev ~ % ./portfolio.sh
```

<img width="800" height="262" alt="banner_showcase" src="https://github.com/user-attachments/assets/91d8daa3-751b-47a5-b2f9-c746ede59487" />


A terminal-styled portfolio... In space! :rocket::frog:

[![Live Demo](https://img.shields.io/badge/live-cli.vcangel.dev-99c1f1?style=for-the-badge&logo=deno&logoColor=white)](https://cli.vcangel.dev/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](./LICENSE)
![TypeScript](https://img.shields.io/badge/TypeScript-94%25-3178c6?style=for-the-badge&logo=typescript&logoColor=white)

</div>

---

## 🛰️ what's this

I wanted to make a simple portfolio and ended up making this thing in the end ⁽˙³˙⁾

Try `help`, poke around, find some stuff. 
All of it sitting on top of a 3D space scene 'cause space is nice. 🌌

## ✨ the good stuff

- **Type your way around** - `help` to kick things off
- **3D space backdrop** - interactive Spline scene chillin' behind the terminal
- **Retro / CRT vibes** - scanlines, glow, monospace, the whole aesthetic
- **Islands architecture** - only the interactive bits hydrate, rest stays static n' snappy
- **Works on mobile** - terminal scales down so your phone ain't left out

## 🕹️ commands

Here's what you can throw at it (run `help` in the site for the full list):

| Command    | what it does               |
| ---------- | -------------------------- |
| `help`     | shows everything you can do |
| `banner`   | display the welcome banner  |
| `projects` | stuff I've built            |
| `contact`  | where to find me            |
| `clear`    | wipes the screen            |
| `whoami`   | Idk, you tell me! m9っ`･ω･´) |

<!-- > psst — there might be an easter egg or two hiding in there 🥚 go dig -->

<blockquote><img width="48px" src="https://media1.tenor.com/m/WNiTLJ7dsfkAAAAC/cirno-fumo.gif"/> <p><b>Subject to change</b> 'cause I like pushing useless features</p></blockquote>

## 🛠️ the stack

- **[Deno](https://deno.com/)** - the runtime
- **[Fresh](https://fresh.deno.dev/)** - web framework, islands gang
- **[Preact](https://preactjs.com/)** + **[Signals](https://preactjs.com/guide/v10/signals/)** - UI + state
- **[Vite](https://vite.dev/)** - build/dev
- **[Tailwind CSS v4](https://tailwindcss.com/)** - styling
- **[Spline](https://spline.design/)** - the 3D backdrop

## 📦 run it yourself

```bash
# clone it
git clone https://github.com/VCAngel/vcangel.dev.git
cd vcangel.dev

# fire up the dev server
deno task dev

# or build + serve for prod
deno task build
deno task start
```

> Need [Deno](https://deno.com/) installed first. `deno task check` runs lint/fmt/typecheck if you wanna keep it clean.

---

<div align="center">

`made with ❤️ + ☕`

</div>
