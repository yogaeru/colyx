import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ColorGrid } from "./ColorGrid";
import {
  formatColor,
  MATERIAL_ROLES,
  MaterialYouColors,
  schemeFromDominantColor,
  schemeFromPaletteColors,
  type ColorFormat,
} from "@/lib/colors";

const seed = 0xff6750a4;
const formats: ColorFormat[] = ["hex", "argb", "rgb", "rgba", "hsl", "hsla", "oklch"];

function roleMarkup(markup: string, role: string): string {
  const start = markup.indexOf(`data-color-role="${role}"`);
  expect(start).toBeGreaterThan(-1);
  const nextRole = markup.indexOf("data-color-role=", start + 1);
  return markup.slice(start, nextRole === -1 ? undefined : nextRole);
}

describe("ColorGrid", () => {
  test("shows an empty state without appearance controls for an empty result", () => {
    const markup = renderToStaticMarkup(<ColorGrid schemes={[]} format="hex" />);
    expect(markup).toContain('role="status"');
    expect(markup).toContain("No colors could be extracted");
    expect(markup).not.toContain("Scheme appearance");
  });

  test.each(formats)("renders light and dark values in %s", (format) => {
    const schemes = schemeFromDominantColor(seed, { format });
    for (const mode of ["light", "dark"] as const) {
      const markup = renderToStaticMarkup(
        <ColorGrid schemes={schemes} format={format} initialMode={mode} />,
      );
      const primary = formatColor(schemes[0].color[mode].primary, format);
      expect(roleMarkup(markup, "primary")).toContain(`background-color:${primary}`);
      expect(markup).not.toContain("[object Object]");

      const buttons = [...markup.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)];
      for (const appearance of ["light", "dark"]) {
        const toggle = buttons.find(([, , body]) => body.replace(/<[^>]*>/g, "").trim() === appearance);
        expect(toggle).toBeDefined();
        expect(toggle?.[1]).toContain(`aria-pressed="${appearance === mode}"`);
        expect(toggle?.[1]).toContain('type="button"');
      }
    }
  });

  test("uses metadata keys for ordered group titles and includes every described role", () => {
    const schemes = schemeFromDominantColor(seed);
    const markup = renderToStaticMarkup(<ColorGrid schemes={schemes} format="hex" />);
    const titles = [...markup.matchAll(/<h4\b[^>]*>(.*?)<\/h4>/g)].map(([, title]) => title);
    expect(titles).toEqual(Object.keys(MaterialYouColors));

    const expectedRoles = Object.values(MaterialYouColors).flatMap((group) => Object.keys(group));
    const renderedRoles = [...markup.matchAll(/data-color-role="([^"]+)"/g)].map(([, role]) => role);
    expect(renderedRoles).toEqual(expectedRoles);
    expect(new Set(renderedRoles).size).toBe(renderedRoles.length);
    for (const role of expectedRoles) {
      expect(MATERIAL_ROLES.some((materialRole) => materialRole === role)).toBe(true);
      expect(roleMarkup(markup, role)).toContain(`>${role}</span>`);
    }
    expect(markup).toContain("Main brand color");
  });

  test("renders keyboard-accessible source selection and defaults to the first result", () => {
    const schemes = schemeFromPaletteColors([seed, 0xff336699]);
    const markup = renderToStaticMarkup(<ColorGrid schemes={schemes} format="hex" />);
    const buttons = [...markup.matchAll(/<button\b([^>]*)>/g)];
    for (const [index, scheme] of schemes.entries()) {
      const button = buttons.find(([, attributes]) => attributes.includes(`aria-label="Show ${scheme.name} scheme"`));
      expect(button?.[1]).toContain(`aria-pressed="${index === 0}"`);
      expect(button?.[1]).toContain('type="button"');
    }
    expect(markup).toContain("Palette-1 scheme</h3>");
    expect(roleMarkup(markup, "primary")).toContain(schemes[0].color.light.primary);
  });
});
