import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./hooks/useTheme.tsx";
import { OptionsProvider } from "./hooks/useOptions.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <OptionsProvider>
        <App />
      </OptionsProvider>
    </ThemeProvider>
  </StrictMode>,
);
