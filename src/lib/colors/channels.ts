/** sRGB channels in 0..255 (fractional values are allowed). */
export interface RGB {
  r: number;
  g: number;
  b: number;
}

/** sRGB channels in 0..255, with alpha in 0..1. */
export interface RGBA extends RGB {
  a: number;
}

/** Hue in degrees, saturation and lightness in 0..100 percent. */
export interface HSL {
  h: number;
  s: number;
  l: number;
}

/** HSL degrees/percent, with alpha in 0..1. */
export interface HSLA extends HSL {
  a: number;
}

/** OKLCH lightness in 0..1, raw nonnegative chroma, hue in degrees, alpha in 0..1. */
export interface OKLCH {
  l: number;
  c: number;
  h: number;
  a: number;
}
