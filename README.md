<div align="center">

# ✦ Nihit Sunhare

### Developer portfolio, project showcase, and a small corner of the internet.

[![Live Site](https://img.shields.io/badge/Live_Site-nihit.is--a.dev-7c3aed?style=for-the-badge&logo=googlechrome&logoColor=white)](https://nihit.is-a.dev)
[![GitHub Pages](https://img.shields.io/badge/Deployed_on-GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)

[![React](https://img.shields.io/badge/React_19-20232a?style=flat-square&logo=react&logoColor=61dafb)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_8-646cff?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-0f172a?style=flat-square&logo=tailwindcss&logoColor=38bdf8)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-fff312?style=flat-square&logo=framer&logoColor=111111)](https://motion.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.19%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

[![GitHub stars](https://img.shields.io/github/stars/nihitdev/nihitdev.github.io?style=social)](https://github.com/nihitdev/nihitdev.github.io/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/nihitdev/nihitdev.github.io?style=social)](https://github.com/nihitdev/nihitdev.github.io/forks)

</div>

---

## About

A fast, responsive, and animated personal portfolio built to showcase my work, skills, and what I am currently exploring. The site combines a clean visual system with subtle motion, interactive project cards, and reusable React components.

### Highlights

- Responsive design across desktop, tablet, and mobile
- Smooth, purposeful animations powered by Motion
- Data-driven skills, statistics, navigation, and projects
- Accessible semantic structure and keyboard-friendly interactions
- Custom social preview, favicon, and domain
- Optimized production builds through Vite

## Tech stack

| Category | Technology |
| --- | --- |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Animation | Motion |
| Icons | Lucide React |
| Tooling | Vite 8 |
| Hosting | GitHub Pages |

## Run locally

### Prerequisites

- [Node.js](https://nodejs.org/) **20.19 or newer**
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/nihitdev/nihitdev.github.io.git

# Enter the project
cd nihitdev.github.io

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create an optimized production build |
| `npm run preview` | Preview the production build locally |

## Project structure

```text
.
├── public/             # Favicon, social card, and robots.txt
├── src/
│   ├── components/     # Reusable portfolio sections and UI
│   ├── data/           # Navigation, skills, stats, and projects
│   ├── App.jsx         # Main application composition
│   ├── index.css       # Global styles and Tailwind setup
│   └── main.jsx        # React entry point
├── CNAME               # Custom domain configuration
├── index.html          # HTML document and metadata
└── vite.config.js      # Vite configuration
```

## Customization

Most portfolio content lives in [`src/data/portfolio.js`](src/data/portfolio.js). Update that file to change:

- Navigation links
- Portfolio statistics
- Skills and proficiency levels
- Featured projects and their links

Components are organized by page section in [`src/components`](src/components), while global styles live in [`src/index.css`](src/index.css).

## Build for production

```bash
npm run build
npm run preview
```

The optimized output is generated in `dist/` and can be deployed to any static hosting provider.

---

<div align="center">

Built with curiosity, caffeine, and probably too much terminal customization.

**[Visit the portfolio](https://nihit.is-a.dev)** · **[Report an issue](https://github.com/nihitdev/nihitdev.github.io/issues)**

</div>
