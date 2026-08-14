import type {
  ColorOutputFormat,
  SchemeType,
  SelectionPreference,
} from "@/lib/matugen/types";

export interface RequestColorsForm {
  schemeType: SchemeType;
  colorFormat: ColorOutputFormat;
}

export const selectionScheme: Array<{ label: string; value: SchemeType }> = [
  { label: "M3 Content", value: "scheme-content" },
  { label: "M3 Tonal Spot", value: "scheme-tonal-spot" },
  { label: "M3 Rainbow", value: "scheme-rainbow" },
  { label: "M3 Fruit Salad", value: "scheme-fruit-salad" },
  { label: "M3 Monochrome", value: "scheme-monochrome" },
  { label: "Smart", value: "scheme-smart" },
  { label: "Neutral", value: "scheme-neutral" },
  { label: "Vibrant", value: "scheme-vibrant" },
  { label: "Fidelity", value: "scheme-fidelity" },
  { label: "Expressive", value: "scheme-expressive" },
] as const;

export const selectionColorFormat: Array<{
  label: string;
  value: ColorOutputFormat;
}> = [
  { label: "Hex", value: "hex" },
  { label: "RGB", value: "rgb" },
  { label: "RGBA", value: "rgba" },
  { label: "HSL", value: "hsl" },
  { label: "HSLA", value: "hsla" },
];

export const selectionPreference: Array<{
  label: string;
  value: SelectionPreference;
}> = [
  { label: "Darkness", value: "darkness" },
  { label: "Less Saturation", value: "less-saturation" },
  { label: "Lightness", value: "lightness" },
  { label: "Value", value: "value" },
  { label: "Saturation", value: "saturation" },
];

export const materialYouColors = {
  background: "The absolute background of the app/screen",
  on_background: "Text on the main background",

  primary: "Main brand color",
  on_primary: "Text/Icons on top of primary",
  primary_container: "Subtle background for primary elements",
  on_primary_container: "Text on top of primary container",
  primary_fixed: "Fixed primary color across light and dark themes",
  primary_fixed_dim: "Stronger fixed primary color",
  on_primary_fixed: "Text/icons on primary fixed color",
  on_primary_fixed_variant: "Lower emphasis text on primary fixed",

  inverse_primary: "Primary color for opposite theme",

  secondary: "Less prominent accent color",
  on_secondary: "Text/Icons on top of secondary",
  secondary_container: "Subtle background for secondary elements",
  on_secondary_container: "Text on top of secondary container",
  secondary_fixed: "Fixed secondary color across themes",
  secondary_fixed_dim: "Stronger fixed secondary color",
  on_secondary_fixed: "Text/icons on secondary fixed color",
  on_secondary_fixed_variant: "Lower emphasis text on secondary fixed",

  tertiary: "Contrasting accent color for balance",
  on_tertiary: "Text/Icons on top of tertiary",
  tertiary_container: "Subtle background for tertiary elements",
  on_tertiary_container: "Text on top of tertiary container",
  tertiary_fixed: "Fixed tertiary color across themes",
  tertiary_fixed_dim: "Stronger fixed tertiary color",
  on_tertiary_fixed: "Text/icons on tertiary fixed color",
  on_tertiary_fixed_variant: "Lower emphasis text on tertiary fixed",

  error: "Color used for errors/warnings",
  on_error: "Text/Icons on top of error color",
  error_container: "Background for error messages and alerts",
  on_error_container: "Text/icons on error container",

  surface: "Main background for components (cards, sheets)",
  on_surface: "Primary text color on surfaces",
  surface_dim: "Dimmest surface color",
  surface_bright: "Brightest surface color",
  surface_container_lowest: "Lowest emphasis surface container",
  surface_container_low: "Low emphasis surface container",
  surface_container: "Default surface container",
  surface_container_high: "High emphasis surface container",
  surface_container_highest: "Highest emphasis surface container",
  surface_variant: "Secondary background for components",
  on_surface_variant: "Secondary text color on surfaces",
  surface_tint: "Tint applied to elevated surfaces",

  inverse_surface: "Surface color used in the opposite theme",
  inverse_on_surface: "Text/icons on inverse surface",

  outline: "Color for borders and dividers",
  outline_variant: "Subtle divider/border color",

  shadow: "Color used for elevation shadows",
  scrim: "Overlay color for modal backdrops",

  source_color: "Seed color used to generate the Material You palette",
} as const;

export const base16Colors = {
  base00: "Default Background",
  base01: "Lighter Background (Status bars)",
  base02: "Selection Background",
  base03: "Comments, Invisibles",
  base04: "Dark Foreground (Used for status bars)",
  base05: "Default Foreground, Caret, Delimiters",
  base06: "Light Foreground",
  base07: "Light Background",
  base08: "Variables, XML Tags, Red",
  base09: "Integers, Boolean, Constants, Orange",
  base0a: "Classes, Strings, Functions, Yellow",
  base0b: "Strings, Inherited Class, Green",
  base0c: "Support, Regex, Escape Characters, Cyan",
  base0d: "Functions, Methods, Attribute IDs, Blue",
  base0e: "Keywords, Storage, Selector, Magenta",
  base0f: "Deprecated, Opening/Closing Embedded Tags, Brown",
} as const;
