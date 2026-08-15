# Colyx

A web application for extracting color schemes from images, including **Material You** and **Base16** color palettes.

> **⚠️ Important:** This project uses a modified version of Matugen. The modified Matugen implementation exposes its C ABI and is compiled into a shared library. The resulting native library is loaded from Node.js using Koffi, allowing the application to call Matugen's native functionality directly without spawning the Matugen CLI as a separate process.

## Features

- Extract color palettes from images
- Generate **Material You** color schemes
- Generate **Base16** color schemes
- Preview extracted colors and generated palettes
- Switch between multiple source colors extracted from an image
- View generated color data as structured JSON
- Responsive UI

## Tech Stack

- **[TanStack Start](https://tanstack.com/start)** — Full-stack React framework
- **[TanStack Router](https://tanstack.com/router)** — File-based routing
- **[Tailwind CSS](https://tailwindcss.com/)** — Styling
- **Astryx Components** — UI component library
- **[Lucide React](https://lucide.dev/guide/packages/lucide-react)** — Icons
- **Zod** — Runtime validation
- **Matugen** — Color scheme generation
- **Nub** — Package manager and Node.js runtime/tooling

## Package Manager

This project uses **Nub** as its package manager.

Nub is Node.js-based, so the project is not restricted to Nub. Other Node.js package managers such as `npm`, `pnpm`, or `yarn` can also be used if needed.

For example, using Nub:

```bash
nub install
nub run dev
```

Or using another Node.js package manager:

```bash
pnpm install
pnpm dev
```

## Getting Started

### Prerequisites

Make sure you have a Node.js-compatible environment and Nub installed.

Clone the repository and install the dependencies:

```bash
nub install
```

Start the development server:

```bash
nub run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Building for Production

Build the application:

```bash
nub run build
```

Then run the production server:

```bash
nub run start
```

The exact production commands may vary depending on the scripts defined in `package.json`.

## Docker

The project includes separate Docker configurations for development and production.

### Development

The development container is designed to support live source-code changes through a bind mount.

```bash
docker compose up --build dev
```

The development server is exposed on:

```text
http://localhost:3000
```

### Production

Build and start the production container:

```bash
docker compose up --build prod
```

The production service is exposed on the configured production port.

## Styling

The project uses **Tailwind CSS** together with the **Astryx Components** component library.

Global styles are defined in the project's stylesheet and include the Astryx reset/styles as well as the application's custom styles.

## License

This project is licensed under the **GNU General Public License v2.0 (GPL-2.0)**.

The license follows the original **Matugen** project because this project depends on a modified Matugen implementation.

See the `LICENSE` file for the full license text.

## Acknowledgements

- **Matugen** — Color scheme generation
- **TanStack** — Application framework and routing
- **Tailwind CSS** — Utility-first CSS framework
- **Astryx Components** — UI components
- **Lucide** — Icon library

## Learn More

- [TanStack Start](https://tanstack.com/start)
- [TanStack Router](https://tanstack.com/router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide](https://lucide.dev/)
