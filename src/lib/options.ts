const colorOutputOptions = [
  {
    label: "HEX",
    value: "hex",
  },
  {
    label: "RGB",
    value: "rgb",
  },
  {
    label: "RGBA",
    value: "rgba",
  },
  {
    label: "HSL",
    value: "hsl",
  },
  {
    label: "HSLA",
    value: "hsla",
  },
  {
    label: "OKLCH",
    value: "oklch",
  },
];

const schemeVariantOptions = [
  {
    label: "Tonal Spot",
    value: "tonalSpot",
  },
  {
    label: "Content",
    value: "content",
  },
  {
    label: "Expressive",
    value: "expressive",
  },
  {
    label: "Neutral",
    value: "neutral",
  },
  {
    label: "Vibrant",
    value: "vibrant",
  },
  {
    label: "Fruit Salad",
    value: "fruitSalad",
  },
  {
    label: "Rainbow",
    value: "rainbow",
  },
];

const contrastLevelOptions = [
  {
    label: "Low",
    value: 0,
  },
  {
    label: "Medium",
    value: 0.5,
  },
  {
    label: "High",
    value: 1,
  },
];

const extractionModeOptions = [
  {
    label: "Dominant",
    value: "dominant",
  },
  {
    label: "Swatch",
    value: "swatch",
  },
  {
    label: "Palette",
    value: "palette",
  },
];

const selectOptions = {
  colorOutput: colorOutputOptions,
  schemeVariant: schemeVariantOptions,
  contrastLevel: contrastLevelOptions,
  extractionMode: extractionModeOptions,
};

export default selectOptions;
