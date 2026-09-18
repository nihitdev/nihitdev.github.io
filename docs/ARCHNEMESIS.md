# ArchNemesis implementation notes

## Existing architecture and implementation plan

The original site used React 19, Vite 8, Tailwind 4 plus custom CSS, Lucide icons, and same-page hash navigation. No animation library or GitHub API integration was installed. The existing eight repositories, toolbox categories, biography, daily driver, current activities, mail link, Discord copy action, discussion link, canonical URL, and hosting configuration were retained.

Implementation order: shared motion/environment → boot and hero → workspace navigation → project inspectors and technology graph → interactive terminal → responsive/accessibility checks → performance pass.

## Systems

- `src/motion/config.js`: workspace IDs, motion timing, safe preferences, Easter egg event.
- `Primitives.jsx`: terminal typewriter, Arch SVG, window chrome, bounded decorative dragging, magnetic buttons, tilt cards, glitch text, SVG circuitry, optional-effects error boundary.
- `BootSequence.jsx`: variable-speed character printing, progress, logo rings, skip control, session persistence and focus handoff. Deep links and reduced motion bypass boot.
- `Environment.jsx`: one shared RAF loop for particles, cursor interpolation, spotlight, magnetic offsets and card tilt. The normal system pointer remains visible.
- `App.jsx`: lazy enhancements, intersection reveals, off-screen animation states, reduced-motion preference, effect controls, workspace transitions, progress, keyboard shortcuts, timed Easter eggs.
- `InteractiveTerminal.jsx`: simulated commands, bounded output/history, keyboard history, Tab completion, accessible output log, clickable repository URLs.

No runtime dependencies were added. There is no WebGL, arbitrary command execution, generated contribution history, or autoplay audio. Project previews are illustrations, explicitly identified as such in the inspector. GitHub's branch-style view is labeled as a local project index, not live activity.

## Controls

- Alt + 1–6: Home, About, Projects, Stack, GitHub, Contact.
- FX: Low / Medium / Ultra, persisted locally.
- CRT slider: 0–0.7, persisted locally.
- Terminal: `help`, `about`, `projects`, `skills`, `github`, `contact`, `clear`, `neofetch`, `whoami`, `ls`, `cat about.txt`, `uname -a`, `pwd`, `history`, `rice`, `matrix`.
- Easter eggs: Konami code, five clicks on the hero Arch emblem, `sudo pacman -S rice`, `rm -rf /`.
- Drag the decorative config window by its title bar with a desktop pointer. Dragging never gates content.

## Performance decisions

One permanent RAF scheduler owns ambient canvas and pointer effects; scroll work is frame-coalesced. Canvas DPR is capped at 1.5, particles at 58 desktop Ultra / 28 Medium / 17 coarse pointer. The canvas stops while the document is hidden. Low and reduced motion stop it entirely. Off-screen orbit, graph, and contact animations pause. Intersection reveals run once visually; the terminal chunk loads near its viewport. Pointer coordinates and physics are refs/local variables, not per-frame React state. Output is capped at 40 entries and command history at 100. Listeners, observers, timers, and RAF handles clean up.

## Verification

- `npm run lint` and `npm run build`.
- Chromium visual inspection at 1366×768, 1920×1080, 768×1024, 390×844, and 320×740.
- Checked first boot, skip, session refresh, direct hashes, navigation, browser back/forward, menu dismissal, dialog focus/Escape, terminal commands/history/autocomplete/clear, quality controls, Discord copy, and reduced motion.
- Fixed orbit-driven horizontal overflow, active-workspace tracking, dialog labeling/focus, low-contrast metadata, and the technology logo's inherited SVG styling.
- Axe automated audit: zero violations in the final tested state. Gradient contrast still requires visual judgment; this is not a claim of complete WCAG certification.
- Browser emulation supplements visual checks; physical mobile hardware and other browser engines were not tested.
- True touch emulation (five touch points): coarse-pointer media query active, custom cursor hidden, and menu opened through dispatched touch input.
- Ultra desktop RAF sample: 120 frames, median 16.7 ms, p95 50 ms in local Chromium. This is a short local sample, not a cross-device performance guarantee.
- Production build: main JS approximately 73.5 kB gzip; environment 1.7 kB gzip and terminal 2.2 kB gzip are separate chunks.
