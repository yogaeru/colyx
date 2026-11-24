import { formatColor, MATERIAL_ROLES } from "svaela";
import type {
  ColorFormat,
  ColorFormatMap,
  ColorValue,
  MaterialRole,
  MaterialSchemeResult,
  SchemeMode,
  TemplateData,
} from "svaela";

export interface TemplatePreset {
  label: string;
  value: string;
  description: string;
  template: string;
}

export const templatePresets: readonly TemplatePreset[] = [
  {
    label: "CSS Variables (Light & Dark)",
    value: "css-both",
    description: "Exports all Material You roles for :root and .dark.",
    template: `/* Scheme: {{name}} | Variant: {{scheme}} | Format: {{format}} */
:root {
  --source-color: {{sourceColor}};
{{#each colors as role}}  --{{role}}: {{colors.(role).light}};
{{/each}}}

.dark {
{{#each colors as role}}  --{{role}}: {{colors.(role).dark}};
{{/each}}}`,
  },
  {
    label: "CSS Variables (Active Mode)",
    value: "css-mode",
    description: "Uses dynamic property lookup {{colors.(role).(mode)}}.",
    template: `/* Scheme: {{name}} | Active Mode: {{mode}} */
:root {
  --source-color: {{sourceColor}};
{{#each colors as role}}  --{{role}}: {{colors.(role).(mode)}};
{{/each}}}`,
  },
  {
    label: "JSON Theme Tokens",
    value: "json-tokens",
    description: "Serializes core Material 3 tokens for the active mode.",
    template: `{
  "id": "{{id}}",
  "name": "{{name}}",
  "mode": "{{mode}}",
  "scheme": "{{scheme}}",
  "format": "{{format}}",
  "sourceColor": "{{sourceColor}}",
  "tokens": {
    "background": "{{colors.background.(mode)}}",
    "onBackground": "{{colors.on_background.(mode)}}",
    "surface": "{{colors.surface.(mode)}}",
    "onSurface": "{{colors.on_surface.(mode)}}",
    "primary": "{{colors.primary.(mode)}}",
    "onPrimary": "{{colors.on_primary.(mode)}}",
    "primaryContainer": "{{colors.primary_container.(mode)}}",
    "onPrimaryContainer": "{{colors.on_primary_container.(mode)}}",
    "secondary": "{{colors.secondary.(mode)}}",
    "onSecondary": "{{colors.on_secondary.(mode)}}",
    "tertiary": "{{colors.tertiary.(mode)}}",
    "onTertiary": "{{colors.on_tertiary.(mode)}}",
    "error": "{{colors.error.(mode)}}",
    "onError": "{{colors.on_error.(mode)}}",
    "outline": "{{colors.outline.(mode)}}"
  }
}`,
  },
  {
    label: "All Extracted Schemes",
    value: "all-schemes",
    description: "Iterates across all extracted schemes with #each.",
    template: `{{#each schemes as item}}/* [{{index}}] {{this.name}} (id: {{this.id}}) */
--scheme-{{this.id}}-source: {{this.sourceColor}};
--scheme-{{this.id}}-primary-light: {{this.colors.primary.light}};
--scheme-{{this.id}}-primary-dark: {{this.colors.primary.dark}};

{{/each}}`,
  },
] as const;

function attachFormattedString<Format extends ColorFormat>(
  colorValue: ColorValue<Format>,
  format: Format,
): unknown {
  let formatted = "";
  try {
    formatted = formatColor(colorValue, format);
  } catch {
    formatted = String(colorValue ?? "");
  }

  if (typeof colorValue === "object" && colorValue !== null) {
    const clone = { ...colorValue };
    Object.defineProperty(clone, "toString", {
      value: () => formatted,
      enumerable: false,
    });
    return clone;
  }

  return formatted;
}

function serializeSchemeForTemplate(
  scheme: MaterialSchemeResult<keyof ColorFormatMap>,
  format: ColorFormat,
) {
  const colors: Record<string, Record<SchemeMode, unknown>> = {};

  for (const role of MATERIAL_ROLES) {
    const roleColors = scheme.colors[role as MaterialRole];
    if (!roleColors) continue;

    colors[role] = {
      light: attachFormattedString(roleColors.light as never, format),
      dark: attachFormattedString(roleColors.dark as never, format),
    };
  }

  return {
    id: scheme.id,
    name: scheme.name,
    sourceColor: attachFormattedString(scheme.sourceColor as never, format),
    colors,
  };
}

export function buildTemplateData(
  schemes: MaterialSchemeResult<keyof ColorFormatMap>[],
  activeIndex: number,
  options: {
    colorOutput: ColorFormat;
    theme: SchemeMode;
    schemeVariant: string;
    contrastLevel: number;
    extractionMode: string;
  },
): TemplateData {
  const serializedSchemes = schemes.map((scheme) =>
    serializeSchemeForTemplate(scheme, options.colorOutput),
  );
  const activeScheme = serializedSchemes[activeIndex] ?? serializedSchemes[0];

  if (!activeScheme) {
    return {
      mode: options.theme,
      theme: options.theme,
      format: options.colorOutput,
      scheme: options.schemeVariant,
      contrastLevel: options.contrastLevel,
      extractionMode: options.extractionMode,
      colors: {},
      schemes: [],
    };
  }

  return {
    id: activeScheme.id,
    name: activeScheme.name,
    sourceColor: activeScheme.sourceColor,
    colors: activeScheme.colors,
    mode: options.theme,
    theme: options.theme,
    format: options.colorOutput,
    scheme: options.schemeVariant,
    contrastLevel: options.contrastLevel,
    extractionMode: options.extractionMode,
    schemes: serializedSchemes,
  };
}
