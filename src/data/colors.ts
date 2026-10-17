const ColorFormat = [
  "hex",
  "rgb",
  "hsl",
  "integer"
] as const;

export type ColorFormat = typeof ColorFormat[number];
