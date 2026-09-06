# Inspector of Tea · The Seventh Night (Web)

An interactive fiction piece that runs entirely on the client, adapted from the companion WeChat Mini Program. Step into a fictional relationship, make choices, and find out who is really being examined.

Pure static site: **zero dependencies, zero build, zero network requests**. Can be hosted on GitHub Pages or any static host.

## Tech

- The logic layer (story data + scoring engine) is shared with the Mini Program version; only the `wx.*` storage is replaced by the browser `localStorage`, and `require` becomes a global `window.LS` namespace.
- The view layer is vanilla HTML/CSS/JS (no framework) using hash routing.
- The six-dimension radar chart is hand-drawn with native Canvas 2D.
- All progress and history are stored locally in the browser's `localStorage`; nothing is uploaded.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

You can also just open `index.html` directly in a browser (double-click) — the game loads no external modules or fetch, so `file://` works too.

## Deploy to GitHub Pages

Put the game files at the repository root (`index.html`, `css/`, `js/`, `images/`), then:

1. Repository **Settings → Pages → Build and deployment → Source** → `Deploy from a branch`.
2. **Branch** → your default branch (e.g. `main`), **folder** → `/(root)`.
3. Save and wait for the build, then visit `https://<user>.github.io/<repo>/`.

A `.nojekyll` file at the root ensures GitHub does not run Jekyll on the site.

## Structure

```
index.html          # SPA entry, loads scripts in order
css/style.css       # dark theme and all page styles
js/
  app.js            # router + view rendering + radar drawing
  data/             # story / characters / endings / report templates
  core/             # condition parser / attrs / patterns / FSM / scoring / storage
images/             # character art and scene backgrounds
```

## Disclaimer

This work is an entertainment interactive simulation, **not a psychological assessment**, and draws no psychological conclusions. All characters and events are fictional. See the in-app "About" page for details.
