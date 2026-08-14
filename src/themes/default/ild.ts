import { defineTheme, defineSyntaxTheme } from "@astryxdesign/core";
import { neutralIconRegistry } from "./icons";

export const defaultTheme = (colors: any) => {
  const neutralSyntax = defineSyntaxTheme({
    name: "neutral-mex",
    tokens: {
      keyword: ["#700084", "#efa8ff"], // purple T30/T80
      string: ["#005600", "#a6d2a2"], // green (sat T30 / pastel T80)
      comment: ["#737373", "#a3a3a3"], // neutral
      number: ["#6e3500", "#ffb37f"], // orange
      function: ["#00458c", "#a0caff"], // blue T30/T80 H=255
      type: ["#700084", "#efa8ff"], // purple
      variable: ["#171717", "#e5e5e5"], // near-black / near-white
      operator: ["#737373", "#a3a3a3"], // neutral
      constant: ["#6e3500", "#ffb37f"], // orange
      tag: ["#89001a", "#ffaeaa"], // red
      attribute: ["#584400", "#eec12f"], // yellow
      property: ["#005348", "#83dac9"], // teal
      punctuation: ["#a3a3a3", "#525252"], // neutral
      background: ["#fafafa", "#0a0a0a"],
    },
  });

  return defineTheme({
    name: "mex",

    typography: {
      scale: { base: 14, ratio: 1.2 },
      body: {
        family: "Figtree",
        fallbacks:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      },
      heading: {
        family: "Figtree",
        fallbacks:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        weights: { 3: "bold", 4: "bold" },
      },
      code: {
        family: "ui-monospace",
        fallbacks:
          '"SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      },
    },

    motion: { fast: 125, medium: 300, slow: 700, ratio: 0.75 },

    syntax: neutralSyntax,

    tokens: {
      // =========================================================================
      // Background — mapped directly from Material You colors[light|dark]
      // =========================================================================
      "--color-background-surface": [colors.light.surface, colors.dark.surface],
      "--color-background-body": [
        colors.light.background,
        colors.dark.background,
      ],
      "--color-background-card": [
        colors.light.surface_container,
        colors.dark.surface_container,
      ],
      "--color-background-popover": [
        colors.light.surface_container,
        colors.dark.surface_container,
      ],
      "--color-background-muted": [
        colors.light.surface_container,
        colors.dark.surface_container,
      ],
      "--color-background-inverted": [
        colors.light.inverse_surface,
        colors.dark.inverse_surface,
      ],

      // material: primary / primary_container
      "--color-accent": [colors.light.primary, colors.dark.primary],
      "--color-accent-muted": [
        colors.light.primary_container,
        colors.dark.primary_container,
      ],
      // not in Material tokens, kept from base theme
      "--color-neutral": ["#0000000F", "#FFFFFF1A"],

      // material: scrim
      "--color-overlay": [colors.light.scrim, colors.dark.scrim],
      // not in Material tokens, kept from base theme
      "--color-overlay-hover": ["#0000000D", "#FFFFFF0D"],
      "--color-overlay-pressed": ["#0000001A", "#FFFFFF1A"],

      // material: on_surface / on_surface_variant / outline / primary
      "--color-text-primary": [colors.light.on_surface, colors.dark.on_surface],
      "--color-text-secondary": [
        colors.light.on_surface_variant,
        colors.dark.on_surface_variant,
      ],
      "--color-text-disabled": [colors.light.outline, colors.dark.outline],
      "--color-text-accent": [colors.light.primary, colors.dark.primary],
      // not in Material tokens, kept from base theme
      "--color-on-dark": "#ffffff",
      "--color-on-light": "#171717",
      "--color-on-accent": [colors.light.on_primary, colors.dark.on_primary],
      // not in Material tokens (no "success" role), kept from base theme
      "--color-on-success": ["#ffffff", "#171717"],
      "--color-on-error": [colors.light.on_error, colors.dark.on_error],
      "--color-on-warning": [colors.light.on_tertiary, colors.dark.on_tertiary],

      // material: on_surface / on_surface_variant / outline / primary
      "--color-icon-accent": [colors.light.primary, colors.dark.primary],
      "--color-icon-primary": [colors.light.on_surface, colors.dark.on_surface],
      "--color-icon-secondary": [
        colors.light.on_surface_variant,
        colors.dark.on_surface_variant,
      ],
      "--color-icon-disabled": [colors.light.outline, colors.dark.outline],

      // not in Material tokens (no "success" role), kept from base theme
      "--color-success": ["#007004", "#9fe59b"],
      "--color-success-muted": ["#c5e5c0", "#84c9803D"],
      // material: error / error_container
      "--color-error": [colors.light.error, colors.dark.error],
      "--color-error-muted": [
        colors.light.error_container,
        colors.dark.error_container,
      ],
      // material: tertiary / tertiary_container (repurposed as warning — closest warm/gold role)
      "--color-warning": [colors.light.tertiary, colors.dark.tertiary],
      "--color-warning-muted": [
        colors.light.tertiary_container,
        colors.dark.tertiary_container,
      ],

      // material: outline_variant / outline
      "--color-border": [
        colors.light.outline_variant,
        colors.dark.outline_variant,
      ],
      "--color-border-emphasized": [colors.light.outline, colors.dark.outline],

      // Effects
      // not in Material tokens, kept from base theme
      "--color-skeleton": ["#ebebeb", "#525252"],
      "--color-shadow": [colors.light.shadow, colors.dark.shadow], // material: shadow
      "--color-tint-hover": ["black", "white"],

      // =========================================================================
      // Categorical hues — no Material You role equivalent, kept as-is
      // =========================================================================
      // Red  H=22 — source #eb183a
      "--color-background-red": ["#facecb", "#ff9e973D"],
      "--color-border-red": ["#e6bab8", "#ff6f6c"],
      "--color-icon-red": ["#89001a", "#ff9e97"],
      "--color-text-red": ["#89001a", "#ffc6c1"],

      // Orange  H=55 — source #d57113
      "--color-background-orange": ["#fad0b5", "#ffa2583D"],
      "--color-border-orange": ["#e6bda2", "#e2883e"],
      "--color-icon-orange": ["#6e3500", "#ffa258"],
      "--color-text-orange": ["#6e3500", "#ffc9a2"],

      "--color-background-yellow": ["#f8da9d", "#deb4333D"],
      "--color-border-yellow": ["#e4c279", "#c0990e"],
      "--color-icon-yellow": ["#584400", "#deb433"],
      "--color-text-yellow": ["#584400", "#fdcf4f"],

      // Green  H=144 — source #358a3a
      "--color-background-green": ["#c5e5c0", "#84c9803D"],
      "--color-border-green": ["#b2d1ac", "#69ad67"],
      "--color-icon-green": ["#0c5700", "#84c980"],
      "--color-text-green": ["#0c5700", "#9fe59b"],

      // Teal  H=180 — source #0c7365
      "--color-background-teal": ["#a5e3d6", "#7ec6b83D"],
      "--color-border-teal": ["#94d6c8", "#63ab9d"],
      "--color-icon-teal": ["#005348", "#7ec6b8"],
      "--color-text-teal": ["#005348", "#99e2d3"],

      // Cyan  H=215 — source #0c6f82
      // Same L=0.87 C=0.065 pastel as teal (luminance overshoot compensation).
      "--color-background-cyan": ["#a3e0ef", "#83c2d43D"],
      "--color-border-cyan": ["#91d3e3", "#67a7b8"],
      "--color-icon-cyan": ["#00505f", "#83c2d4"],
      "--color-text-cyan": ["#00505f", "#9edef0"],

      // Blue  H=255 — source #0074e2
      //   T50 #0074e2 reserved for filled Info badge / progressbar / inset hover.
      "--color-background-blue": ["#c4ddfb", "#9eb7ff3D"],
      "--color-border-blue": ["#b1c9e7", "#6d9cfe"],
      "--color-icon-blue": ["#00458c", "#9eb7ff"],
      "--color-text-blue": ["#00458c", "#c7d3ff"],

      // Purple  H=320 — source #980fb2
      "--color-background-purple": ["#eccef3", "#f297ff3D"],
      "--color-border-purple": ["#d8bbdf", "#dd74f0"],
      "--color-icon-purple": ["#700084", "#f297ff"],
      "--color-text-purple": ["#700084", "#fac1ff"],

      // Pink  H=355 — source #b10e69
      "--color-background-pink": ["#fccadc", "#ff99c33D"],
      "--color-border-pink": ["#e7b7c8", "#f273aa"],
      "--color-icon-pink": ["#83004b", "#ff99c3"],
      "--color-text-pink": ["#83004b", "#ffc3da"],

      // Gray (categorical neutral, chroma 0)
      //   Light: #e5e5e5 (Neutral 200) so it's visibly distinct from the
      //          lighter body / muted surface (both #f5f5f5).
      //   Dark : var(--color-neutral) — semi-transparent white wash
      //          (#FFFFFF1A, 10%). Matches the same treatment the gray
      //          badge uses; clearly distinct from the body T10 #1b1b1b
      //          while staying chroma-0 neutral. Solid T15 #1c1c1c was
      //          indistinguishable from --color-background-muted.
      "--color-background-gray": ["#e5e5e5", "var(--color-neutral)"],
      "--color-border-gray": ["#d4d4d4", "#262626"],
      "--color-icon-gray": ["#525252", "#a3a3a3"],
      "--color-text-gray": ["#262626", "#e5e5e5"],

      "--radius-none": "0.25rem",
      "--radius-inner": "0.375rem",
      "--radius-element": "0.625rem",
      "--radius-container": "0.75rem",
      "--radius-page": "1.75rem",
      "--radius-full": "9999px",

      // =========================================================================
      // Shadows
      // =========================================================================
      "--shadow-low":
        "0 2px 4px light-dark(oklch(0 0 0 / 5%), oklch(0 0 0 / 25%)), " +
        "0 4px 8px light-dark(oklch(0 0 0 / 10%), oklch(0 0 0 / 40%)), " +
        "inset 0 0 0 1px light-dark(transparent, oklch(1 0 0 / 8%))",
      "--shadow-med":
        "0 2px 4px light-dark(oklch(0 0 0 / 5%), oklch(0 0 0 / 35%)), " +
        "0 4px 12px light-dark(oklch(0 0 0 / 10%), oklch(0 0 0 / 50%)), " +
        "inset 0 0 0 1px light-dark(transparent, oklch(1 0 0 / 12%))",
      "--shadow-high":
        "0 4px 6px light-dark(oklch(0 0 0 / 10%), oklch(0 0 0 / 50%)), " +
        "0 12px 24px light-dark(oklch(0 0 0 / 15%), oklch(0 0 0 / 70%)), " +
        "inset 0 0 0 1px light-dark(transparent, oklch(1 0 0 / 15%))",
      "--shadow-inset-hover": "inset 0px 0px 0px 2px #0074e24D",
      "--shadow-inset-selected": "inset 0px 0px 0px 2px #0074e280",
      "--shadow-inset-success": "inset 0px 0px 0px 2px #1981004D",
      "--shadow-inset-warning": "inset 0px 0px 0px 2px #ffce2f4D",
      "--shadow-inset-error": "inset 0px 0px 0px 2px #e33f4a4D",
    },

    components: {
      // =========================================================================
      // Button — primary gets white text, secondary gets a border, destructive
      // uses the OKLCH red filled treatment.
      // =========================================================================
      button: {
        "variant:destructive": {
          backgroundColor: "var(--color-error-muted)", // locked pastel red bg
          color: "var(--color-error)", // locked T30 red — matches banner/input error text
        },
      },

      badge: {
        "variant:info": {
          backgroundColor: "light-dark(#0074e2, #6d9cfe)",
          color: "light-dark(#ffffff, #171717)",
        },
        "variant:neutral": {
          backgroundColor: "var(--color-background-gray)",
          color: "var(--color-text-gray)",
        },
        "variant:success": {
          backgroundColor: "light-dark(#198100, #64af4c)",
          color: "light-dark(#ffffff, #171717)",
        },
        "variant:warning": {
          backgroundColor: "#ffce2f",
          color: "#171717",
        },
        "variant:error": {
          backgroundColor: "light-dark(#e33f4a, #ff705d)",
          color: "light-dark(#ffffff, #171717)",
        },

        "variant:red": {
          backgroundColor: "var(--color-background-red)",
          color: "var(--color-text-red)",
        },
        "variant:orange": {
          backgroundColor: "var(--color-background-orange)",
          color: "var(--color-text-orange)",
        },
        "variant:yellow": {
          backgroundColor: "var(--color-background-yellow)",
          color: "var(--color-text-yellow)",
        },
        "variant:green": {
          backgroundColor: "var(--color-background-green)",
          color: "var(--color-text-green)",
        },
        "variant:teal": {
          backgroundColor: "var(--color-background-teal)",
          color: "var(--color-text-teal)",
        },
        "variant:cyan": {
          backgroundColor: "var(--color-background-cyan)",
          color: "var(--color-text-cyan)",
        },
        "variant:blue": {
          backgroundColor: "var(--color-background-blue)",
          color: "var(--color-text-blue)",
        },
        "variant:purple": {
          backgroundColor: "var(--color-background-purple)",
          color: "var(--color-text-purple)",
        },
        "variant:pink": {
          backgroundColor: "var(--color-background-pink)",
          color: "var(--color-text-pink)",
        },
        "variant:gray": {
          backgroundColor: "var(--color-background-gray)",
          color: "var(--color-text-gray)",
        },
      },

      statusdot: {
        "variant:success": { backgroundColor: "light-dark(#198100, #64af4c)" },
        "variant:warning": { backgroundColor: "#ffce2f" },
        "variant:error": { backgroundColor: "light-dark(#e33f4a, #ff705d)" },
        "variant:accent": { backgroundColor: "light-dark(#0074e2, #6d9cfe)" },
      },

      banner: {
        "status:info": {
          backgroundColor: "var(--color-background-blue)",
          "--color-accent-muted": "transparent",
          "--color-text-primary": "var(--color-text-blue)",
          "--color-text-secondary": "var(--color-text-blue)",
          "--color-accent": "var(--color-text-blue)",
        },
        // success/warning/error banner bgs come from --color-{X}-muted, which
        // already carries the correct light/dark tinted values. We only need
        // to redirect the text/icon to the palette colored stop.
        "status:success": {
          "--color-text-primary": "var(--color-text-green)",
          "--color-text-secondary": "var(--color-text-green)",
          "--color-success": "var(--color-text-green)",
        },
        "status:warning": {
          "--color-text-primary": "var(--color-text-yellow)",
          "--color-text-secondary": "var(--color-text-yellow)",
          "--color-warning": "var(--color-text-yellow)",
        },
        "status:error": {
          "--color-text-primary": "var(--color-text-red)",
          "--color-text-secondary": "var(--color-text-red)",
          "--color-error": "var(--color-text-red)",
        },
      },

      switch: {
        base: {
          "--color-background-gray": "var(--color-border-emphasized)",
        },
      },

      progressbar: {
        base: {
          "--color-background-muted": "var(--color-border-emphasized)",
        },
        "variant:accent": {
          // Blue T50 saturated stop (= variant:info badge bg)
          "--color-accent": "#0074e2",
        },
        "variant:success": {
          // Green T45 saturated stop (= variant:success badge bg)
          "--color-success": "#198100",
        },
        "variant:warning": {
          // Yellow T85 saturated stop (= variant:warning badge bg)
          "--color-warning": "#ffce2f",
        },
        "variant:error": {
          // Red T55 saturated stop (= variant:error badge bg)
          "--color-error": "#e33f4a",
        },
      },

      card: {
        base: {
          padding: "var(--spacing-3)",
        },
      },
      section: {
        base: {
          padding: "var(--spacing-3)",
        },
      },
    },

    icons: neutralIconRegistry,
  });
};
