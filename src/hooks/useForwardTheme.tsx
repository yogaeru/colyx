import { useEffect, useRef, type RefObject } from "react";
import type { M3eThemeElement } from "@m3e/react/theme";

const PREFIXES = ["--md-sys-", "--m3e-"];

export function useForwardTheme(
  ref: RefObject<M3eThemeElement | null>,
  deps: unknown[] = [],
) {
  const sheetRef = useRef<CSSStyleSheet | null>(null);

  // Create and adopt the sheet once.
  useEffect(() => {
    const sheet = new CSSStyleSheet();
    sheetRef.current = sheet;
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

    return () => {
      document.adoptedStyleSheets = document.adoptedStyleSheets.filter(
        (s) => s !== sheet,
      );
      sheetRef.current = null;
    };
  }, []);

  // Update its contents whenever the theme changes.
  useEffect(() => {
    const theme = ref.current;
    if (!theme) return;

    let cancelled = false;

    Promise.resolve(theme.updateComplete).then(() => {
      const sheet = sheetRef.current;
      if (cancelled || !sheet) return;

      sheet.replaceSync(""); // so we don't read back our own old values
      const cs = getComputedStyle(theme);

      let css = "";
      for (const name of Array.from(cs)) {
        if (!PREFIXES.some((p) => name.startsWith(p))) continue;
        const value = cs.getPropertyValue(name).trim();
        if (value) css += `${name}:${value};`;
      }
      sheet.replaceSync(`:root{${css}}`);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
