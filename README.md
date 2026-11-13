# Colyx

A fast, client-side web application for extracting color schemes from images, including **Material You** color palettes.

> **⚡ Client-Side Architecture:** Colyx now runs entirely in the browser using **React + Vite** and **Svaela**—a lightweight wrapper built on top of `colorthief` and `@material/material-color-utilities`. By removing native C ABI bindings and server-side processing, color extraction and palette generation happen instantaneously on the client.

## Features

- Fast, client-side color palette extraction directly in the browser
- Generate **Material You** color schemes
- Preview extracted colors and generated palettes in real time
- Switch between multiple source colors extracted from an image
- View and copy generated color data as structured JSON
- Clean, responsive UI

## Tech Stack

- **[React](https://react.dev/) + [Vite](https://vite.dev/)** — Client-side application framework and build tool
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** — Accessible and customizable UI components
- **[Lucide React](https://lucide.dev/guide/packages/lucide-react)** — Icons
- **[Svaela](https://github.com/yogaeru/svaela)** — Color extraction and palette generation wrapper powered by **[ColorThief](https://lokeshdhakar.com/projects/color-thief/)** and **[Material Color Utilities](https://github.com/material-foundation/material-color-utilities)**
- **[Node.js](https://nodejs.org/)** — Development environment and tooling

## Getting Started

### Prerequisites

Make sure you have **Node.js** installed along with your preferred package manager (`npm`, `pnpm`, `yarn`, or `bun`).

Clone the repository and install the dependencies:

```bash
pnpm install
```

Running the Development Server

```bash
pnpm dev
```

Building for Production

```bash
pnpm build
```

## License
MIT license, do whatever you want.
