import type { SelectorOption } from "@/components/ui/Selector";

const colorOutputOptions: SelectorOption<string>[] = [
  {
    value: "argb",
    label: "ARGB",
  },
  {
    value: "oklch",
    label: "OKLCH",
  },
  {
    value: "rgba",
    label: "RGBA",
  },
  {
    value: "rgb",
    label: "RGB",
  },
  {
    value: "hsla",
    label: "HSLA",
  },
  {
    value: "hsl",
    label: "HSL",
  },
  {
    value: "hsv",
    label: "HSV",
  },
  {
    value: "hsva",
    label: "HSVA",
  },
];

const themeVariantOptions: SelectorOption<string>[] = [
  {
    value: "tonalSpot",
    label: "Tonal Spot",
  },
  {
    value: "content",
    label: "Content",
  },
  {
    value: "expressive",
    label: "Expressive",
  },
  {
    value: "fidelity",
    label: "Fidelity",
  },
  {
    value: "vibrant",
    label: "Vibrant",
  },
  {
    value: "rainbow",
    label: "Rainbow",
  },
  {
    value: "fruitSalad",
    label: "Fruit Salad",
  },
  {
    value: "monochrome",
    label: "Monochrome",
  },
];

const extractionModeOptions = [
  {
    value: "dominant",
    label: "Dominant",
  },
  {
    value: "palette",
    label: "Palette",
  },
  {
    value: "swatch",
    label: "Swatch",
  },
];

const contrastLevelOptions = [
  {
    value: "standard",
    label: "Standard",
  },
  {
    value: "high",
    label: "High",
  },
  {
    value: "mid",
    label: "Mid",
  },
];

export {
  colorOutputOptions,
  themeVariantOptions,
  extractionModeOptions,
  contrastLevelOptions,
};
