# ArchNemesis implementation notes

## Existing architecture and implementation plan

The original site used React 19, Vite 8, Tailwind 4 plus custom CSS, Lucide icons, and same-page hash navigation. No animation library or GitHub API integration was installed. The existing eight repositories, toolbox categories, biography, daily driver, current activities, mail link, Discord copy action, discussion link, canonical URL, and hosting configuration were retained.

Implementation order: shared motion/environment → boot and hero → workspace navigation → project inspectors and technology graph → interactive terminal → responsive/accessibility checks → performance pass.

## Systems

- `src/motion/config.js`: workspace IDs, motion timing, safe preferences, Easter egg event.
- `Primitives.jsx`: terminal typewriter, Arch SVG, window chrome, bounded decorative dragging, magnetic buttons, tilt cards, glitch text, SVG circuitry, optional-effects error boundary.
- `BootSequence.jsx`: variable-speed character printing, progress, logo rings, skip control, session persistence and focus handoff. Deep links and reduced motion bypass boot.
- `Environment.jsx`: one shared RAF loop for particles, cursor interpolation, spotlight, magnetic offsets and card tilt. A fine mouse pointer activates a custom dot and orbiting ring, trail, and click sparks; native pointers return for dialogs, selects, Low FX, reduced motion, and touch.
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

One permanent RAF scheduler owns both ambient and cursor canvases and pointer effects; scroll work is frame-coalesced. Canvas DPR is capped at 1.5, particles at 96 desktop Ultra / 40 Medium / 24 coarse pointer. The canvas stops while the document is hidden. Low and reduced motion stop it entirely. Off-screen orbit, graph, and contact animations pause. Intersection reveals run once visually; the terminal chunk loads near its viewport. Pointer coordinates and physics are refs/local variables, not per-frame React state. Output is capped at 40 entries and command history at 100. Listeners, observers, timers, and RAF handles clean up.

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

## Motion expansion and resilience

- `MotionDetails.jsx` adds staggered section contents and short click ripples through the Web Animations API. Effects clean up on quality changes/unmount and pause in hidden tabs.
- `styles/enhancements.css` adds staggered color swatches, window-bar sheen, floating config details, circuit streams, branch pulses, terminal entries, and hover accents. New continuous effects pause off screen and are disabled by Low FX or reduced motion.
- Styles retain their cascade order: base `index.css`, `styles/motion.css`, `styles/responsive.css`, then `styles/enhancements.css`.
- Navigation, command search and Alt-number shortcuts derive from `workspaces` in `data/portfolio.js`.
- Terminal chunk errors show a local reload/project fallback instead of unmounting the portfolio.
- Builds emit an empty React root with an inline dark background. There is no static portfolio replacement, so visitors never see a raw content page before the boot sequence.
- GitHub Pages builds now run lint before building.

### Verification of the motion expansion

- `npm run lint`, `npm test` (production build plus three startup/data regression tests), and `git diff --check` passed.
- Chromium checked at 1280×577 and 390×844: original visual layout retained, no horizontal overflow.
- Command palette shortcut/search navigated to the terminal; `projects` and `help` returned expected output.
- Low FX removed the new swatch animation. Emulated reduced motion reported zero running animations.
- Aborting the terminal chunk request showed the local error fallback while the hero and contact remained mounted. Restoring requests loaded the terminal successfully.
- Direct `#terminal` navigation was corrected after React mounts and verified in the production preview.


## Maximum motion and custom cursor

- The desktop cursor has a precise central dot, trailing ring, orbiting satellite, fading trail, click sparks, and OPEN / INSPECT / TYPE / DRAG labels. The browser cursor is hidden only after a usable fine-pointer event. Dialogs and native selects retain their native pointer.
- The shared animation loop adds sparse particle connections, twinkling, and shooting stars. Trail points, sparks and particle counts are bounded. Canvas updates stop while the page is hidden.
- `Telemetry.jsx` adds a decorative 24-bar equalizer and scrolling packets. `styles/maximum-motion.css` adds falling signal lanes, drifting grid, window border pulses, emblem levitation, sequential window dots, config scans, prompt nudges, contact color movement, and card/icon reactions.
- New effects respect Low FX, reduced motion, coarse pointers, hidden tabs and off-screen section pausing. There are no external animation packages or startup fallback content.

### Maximum-motion checks

- Lint, production build, all three regression tests and whitespace checks passed.
- Desktop Chromium with an emulated fine pointer: custom cursor active, native cursor hidden, OPEN hover label correct. Opening the command dialog restored the native cursor.
- Cursor canvas produced visible pixels after movement/click input and released its pressed state on pointer-up.
- Low FX disabled the equalizer and cursor; reduced motion left zero running animations.
- Desktop (1440×1000) and iPhone-sized viewport screenshots retained the layout without horizontal overflow or browser errors. These are browser emulation checks, not physical-device testing.
