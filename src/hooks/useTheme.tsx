import { createContext, useContext, useState, useInsertionEffect } from "react";
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

const shadcnToMaterialToken: ShadcnToMaterial = {
  background: "background",
  foreground: "on_background",

  card: "surface_container_low",
  "card-foreground": "on_surface",

  popover: "surface_container",
  "popover-foreground": "on_surface",

  primary: "primary",
  "primary-foreground": "on_primary",

  secondary: "secondary_container",
  "secondary-foreground": "on_secondary_container",

  muted: "surface_container_low",
  "muted-foreground": "on_surface_variant",

  accent: "tertiary_container",
  "accent-foreground": "on_tertiary_container",

  destructive: "error",
  "destructive-foreground": "on_error",

  border: "outline_variant",
  input: "outline",
  ring: "secondary",

  "chart-1": "primary",
  "chart-2": "secondary",
  "chart-3": "tertiary",
  "chart-4": "primary_container",
  "chart-5": "tertiary_container",

  sidebar: "surface_container_low",
  "sidebar-foreground": "on_surface",
  "sidebar-primary": "primary",
  "sidebar-primary-foreground": "on_primary",
  "sidebar-accent": "secondary_container",
  "sidebar-accent-foreground": "on_secondary_container",
  "sidebar-border": "outline_variant",
  "sidebar-ring": "secondary",
};

interface ThemeContextProps {
  theme: MaterialSchemeResult<keyof ColorFormatMap> | null;
  setTheme: (theme: MaterialSchemeResult<keyof ColorFormatMap> | null) => void;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { options } = useOptions();
  const [theme, setTheme] = useState<MaterialSchemeResult<
    keyof ColorFormatMap
  > | null>(null);

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
    <ThemeContext.Provider value={{ theme, setTheme }}>
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
