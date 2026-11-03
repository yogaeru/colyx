import { createContext, useContext, useState, type ReactNode } from "react";
import type {
  ColorScheme,
  ContrastLevel,
  MotionScheme,
  ThemeVariant,
} from "@m3e/react/theme";

export interface ThemeProps {
  color?: string;
  density?: number;
  contrast?: ContrastLevel;
  scheme?: ColorScheme;
  motion?: MotionScheme;
  variant?: ThemeVariant;
  children?: React.ReactNode;
}

const defaultTheme: ThemeProps = {
  color: "#b2a2ff",
  density: 0,
  contrast: "standard",
  scheme: "dark",
  motion: "expressive",
  variant: "expressive",
};

type ThemeContextValue = {
  theme: ThemeProps;
  changeTheme: <K extends keyof ThemeProps>(
    key: K,
    value: ThemeProps[K],
  ) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(defaultTheme);

  function changeTheme<K extends keyof ThemeProps>(
    key: K,
    value: ThemeProps[K],
  ) {
    setTheme((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
