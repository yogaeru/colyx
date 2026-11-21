const colorOutputOptions = [
  {
    label: "HEX",
    value: "hex",
    description: "Hexadecimal color representation.",
  },
  {
    label: "RGB",
    value: "rgb",
    description: "Red, green, and blue color channels.",
  },
  {
    label: "RGBA",
    value: "rgba",
    description: "RGB with an alpha channel for transparency.",
  },
  {
    label: "HSL",
    value: "hsl",
    description: "Hue, saturation, and lightness.",
  },
  {
    label: "HSLA",
    value: "hsla",
    description: "HSL with an alpha channel for transparency.",
  },
  {
    label: "OKLCH",
    value: "oklch",
    description: "Perceptual lightness, chroma, and hue.",
  },
];

const schemeVariantOptions = [
  {
    label: "Tonal Spot",
    value: "tonalSpot",
    description: "Balanced colors with moderate chroma.",
  },
  {
    label: "Content",
    value: "content",
    description: "Colors derived closely from source content.",
  },
  {
    label: "Expressive",
    value: "expressive",
    description: "Playful colors with unexpected hue combinations.",
  },
  {
    label: "Fidelity",
    value: "fidelity",
    description: "Preserves the source color's original appearance.",
  },
  {
    label: "Vibrant",
    value: "vibrant",
    description: "Highly saturated and colorful palettes.",
  },
  {
    label: "Fruit Salad",
    value: "fruitSalad",
    description: "Contrasting hues for a lively color scheme.",
  },
  {
    label: "Rainbow",
    value: "rainbow",
    description: "Diverse hues across all color palettes.",
  },
  {
    label: "Neutral",
    value: "neutral",
    description: "Subtle colors with low chroma.",
  },
  {
    label: "Monochrome",
    value: "monochrome",
    description: "Grayscale colors without chromatic hues.",
  },
];

const contrastLevelOptions = [
  {
    label: "Low",
    value: 0,
    description: "Standard tonal contrast.",
  },
  {
    label: "Medium",
    value: 0.5,
    description: "Increased tonal contrast.",
  },
  {
    label: "High",
    value: 1,
    description: "Maximum tonal contrast.",
  },
];

const extractionModeOptions = [
  {
    label: "Dominant",
    value: "dominant",
    description: "Extracts the most prominent color.",
  },
  {
    label: "Swatch",
    value: "swatch",
    description: "Extracts colors by vibrancy and lightness.",
  },
  {
    label: "Palette",
    value: "palette",
    description: "Extracts a palette of prominent colors.",
  },
];

const selectOptions = {
  colorOutput: {
    label: "Color Output",
    options: colorOutputOptions,
  },
  schemeVariant: {
    label: "Scheme Variant",
    options: schemeVariantOptions,
  },
  contrastLevel: {
    label: "Contrast Level",
    options: contrastLevelOptions,
  },
  extractionMode: {
    label: "Extraction Mode",
    options: extractionModeOptions,
  },
};

export { selectOptions };