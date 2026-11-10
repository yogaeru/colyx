import { createContext, useContext, useState, useInsertionEffect } from "react";
import type { MaterialScheme } from "svaela";

interface ThemeContextProps {
  theme: MaterialScheme | null;
  setTheme: (theme: MaterialScheme | null) => void;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<MaterialScheme | null>(null);

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
