import {
  createContext,
  useContext,
  useState,
  useInsertionEffect,
  useMemo,
} from "react";
import { formatColor } from "svaela";
import type {
  MaterialSchemeResult,
  ColorFormatMap,
  MaterialRole,
} from "svaela";
import { useOptions } from "./useOptions";

type ShadcnToMaterial = {
  [key: string]: MaterialRole;
};
type Palette = MaterialSchemeResult<keyof ColorFormatMap>;

interface ThemeContextProps {
  generatedPalettes: Palette[];
  setGeneratedPalettes: (palettes: Palette[]) => void;

  theme: Palette | null;
  setTheme: (theme: Palette | null) => void;
}

const shadcnToMaterialToken: ShadcnToMaterial = {
  background: "background",
  foreground: "on_background",

  card: "surface_container_low",
  "card-foreground": "on_surface",

  popover: "surface_container_high",
  "popover-foreground": "on_surface",

  primary: "primary",
  "primary-foreground": "on_primary",

  secondary: "secondary_container",
  "secondary-foreground": "on_secondary_container",

  muted: "surface_container_highest",
  "muted-foreground": "on_surface_variant",

  accent: "surface_container_highest",
  "accent-foreground": "on_surface",

  destructive: "error",
  "destructive-foreground": "on_error",

  border: "outline",
  input: "outline_variant",
  ring: "primary",

  "chart-1": "primary",
  "chart-2": "secondary",
  "chart-3": "tertiary",
  "chart-4": "primary_container",
  "chart-5": "tertiary_container",

  sidebar: "surface_container_lowest",
  "sidebar-foreground": "on_surface",
  "sidebar-primary": "primary",
  "sidebar-primary-foreground": "on_primary",
  "sidebar-accent": "surface_container_high",
  "sidebar-accent-foreground": "on_surface",
  "sidebar-border": "outline_variant",
  "sidebar-ring": "secondary",
};

const ThemeContext = createContext<ThemeContextProps | null>(null);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { options } = useOptions();

  const [theme, setTheme] = useState<Palette | null>(null);
  const [generatedPalettes, setGeneratedPalettes] = useState<Palette[]>([]);

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      generatedPalettes,
      setGeneratedPalettes,
    }),
    [theme, generatedPalettes],
  );

  useInsertionEffect(() => {
    if (theme) {
      const style = document.createElement("style");

      const tokens = Object.entries(shadcnToMaterialToken);

      style.innerHTML = `
:root {
  ${tokens.map(([key, value]) => `--${key}: ${formatColor(theme.colors[value]?.light, options.colorOutput)};`).join("")}
}
.dark {
  ${tokens.map(([key, value]) => `--${key}: ${formatColor(theme.colors[value]?.dark, options.colorOutput)};`).join("")}
}
      `;

      document.head.appendChild(style);

      return () => style.remove();
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export { ThemeProvider, useTheme };
export type { Palette };
