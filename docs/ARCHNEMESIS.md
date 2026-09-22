# Portfolio design and implementation

The existing React 19 / Vite 8 app, local content data, assets, hash navigation, and GitHub Pages deployment remain in place. The former ArchNemesis desktop simulation has been simplified into a text-led developer portfolio.

## Design

- Warm off-white and charcoal themes, restrained green accent, system fonts, and readable body text.
- Project rows and section dividers instead of a page of cards. Three projects are visible initially, with five more in a native disclosure.
- Biography and daily driver remain intact. The full toolbox is expandable; navigating to `#toolbox` opens it automatically.
- Project dialogs, command search, terminal, current activities, repository links, email links, Discord clipboard fallback, and discussions remain available.
- Boot, particles, cursor effects, CRT, telemetry, animated graphs, glow, and decorative status indicators were removed, along with their unused modules and styles.

## Architecture and performance

- `src/index.css` defines the layout, themes, responsive rules, and reduced-motion behavior. Search styles live beside the component.
- `index.html` applies the saved/system theme before rendering to avoid a theme flash. No remote fonts or new runtime dependencies.
- `App.jsx` retains deep links and Alt+1–6 shortcuts. No continuous requestAnimationFrame loops, scroll handlers, or reveal gating. Native smooth anchor scrolling respects reduced motion; terminal scroll boundaries allow the page to keep scrolling. Open dialogs lock background scrolling without shifting the layout.
- `InteractiveTerminal.jsx` renders with the page inside a local error boundary, avoiding layout shifts beneath a late-loading terminal. Output/history stay bounded to 40/100 entries.
- `src/lib/shell.js` implements a read-only virtual filesystem backed by the actual portfolio content. All commands run locally in memory.

## Controls

- Header: project/about/terminal/contact links, search, theme toggle, mobile menu.
- Ctrl/Cmd+K: search sections and repositories; arrow keys select, Enter opens, Escape closes.
- Alt+1–6: Home, About, Projects, Toolbox, Now, Contact.
- Terminal: `help`, `cd`, `ls`, `pwd`, `cat`, `history`, `clear`, and original portfolio aliases.
- Paths: relative, absolute, `~`, `.`, `..`, and `cd -`. Projects each contain a readable `README.md`.
- Terminal keyboard: up/down history, unambiguous Tab completion, Ctrl+L clear, Ctrl+C discard input. Tab remains usable to exit the input when completion is not available.
- `rice` and `matrix` retain text responses without triggering visual effects.

## Verification

Run `npm run lint` and `npm test` (production build plus Node tests). There is no TypeScript/typecheck script. Browser checks cover desktop/mobile layout, dialogs and focus return, disclosures, search, deep links, terminal navigation and completion, theme persistence, reduced motion, menu behavior, and Discord feedback. Browser emulation does not replace physical-device testing.
