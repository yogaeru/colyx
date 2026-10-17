/** Public API for color conversion, image extraction, and Material schemes. */
export {
  argbToHex,
  argbToRgb,
  argbToRgba,
  argbToHsl,
  argbToHsla,
  argbToOklch,
  hexToArgb,
  rgbToArgb,
  hslToRgb,
  hslToArgb,
  oklchToRgb,
  oklchToArgb,
  convertColorFromArgb,
  convertColorToArgb,
  formatColor,
  ARGB_CONVERTERS,
} from "./convert";
export {
  getColorFormat,
  getSwatchTypeColor,
  getDominantColorFromImage,
  getPaletteColorFromImage,
  getSwatchColorFromImage,
} from "./extract";
export {
  SCHEMES,
  schemeFromSourceColor,
  schemeFromDominantColor,
  schemeFromSwatchColors,
  schemeFromPaletteColors,
  schemeFromImageToColor,
} from "./material";
export type {
  SchemeName, SchemeOptions, ImageSchemeOptions, SchemeFormatOptions,
} from "./material";
export { SWATCH_NAMES, MATERIAL_ROLES, MaterialYouColors } from "./data";
export { render as renderTemplate } from "./template";
export type { TemplateData } from "./template";
export type {
  RGB,
  RGBA,
  HSL,
  HSLA,
  OKLCH,
  ImageSource,
  ColorFormat,
  ColorFormatMap,
  ColorResult,
  SwatchName,
  SwatchColorMap,
  MaterialRole,
  SchemeColors,
  SchemeResponse,
  MaterialColorResponse,
  MaterialSchemeResult,
  MaterialColorResponseMap,
  SwatchSchemeMap,
  ColorExtractionType,
  ImageSchemeResultMap,
} from "./types";
