import { createContext, useContext, useState, useInsertionEffect } from "react";
import type { MaterialSchemeResult, ColorFormatMap} from "svaela";

interface ThemeContextProps {
  theme: MaterialSchemeResult<keyof ColorFormatMap> | null;
  setTheme: (theme: MaterialSchemeResult<keyof ColorFormatMap> | null) => void;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<MaterialSchemeResult<keyof ColorFormatMap> | null>(null);

  useInsertionEffect(() => {
    if (theme) {
      const style = document.createElement("style");

      const colors = Object.entries(theme.colors);

      style.innerHTML = `
        ${colors.map(([key, value]) => `--${key}: ${value.light};`).join("")}
        ${colors.map(([key, value]) => `--${key}: ${value.dark};`).join("")}
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

export {
  ThemeProvider,
  useTheme
}
