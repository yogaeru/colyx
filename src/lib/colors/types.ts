import type { HSL, HSLA, OKLCH, RGB, RGBA } from "./channels";
import type { MATERIAL_ROLES, SWATCH_NAMES } from "./data";

export type { HSL, HSLA, OKLCH, RGB, RGBA } from "./channels";
export type { ImageSource } from "colorthief";

export interface ColorFormatMap {
  hex: string;
  argb: number;
  rgb: RGB;
  rgba: RGBA;
  hsl: HSL;
  hsla: HSLA;
  oklch: OKLCH;
}

export type ColorFormat = keyof ColorFormatMap;
export type ColorResult<K extends ColorFormat> = ColorFormatMap[K];
export type SwatchName = (typeof SWATCH_NAMES)[number];
export type SwatchColorMap<K extends ColorFormat> = Record<
  SwatchName,
  ColorResult<K> | undefined
>;
export type MaterialRole = (typeof MATERIAL_ROLES)[number];
export type SchemeColors<K extends ColorFormat> = Record<
  MaterialRole,
  ColorResult<K>
>;
export interface SchemeResponse<K extends ColorFormat = "hex"> {
  dark: SchemeColors<K>;
  light: SchemeColors<K>;
}
export interface MaterialColorResponse<K extends ColorFormat = "hex"> {
  sourceColor: ColorResult<K>;
  color: SchemeResponse<K>;
}

export interface MaterialSchemeResult<
  K extends ColorFormat = "hex",
> extends MaterialColorResponse<K> {
  id: string;
  name: string;
}

export type MaterialColorResponseMap = {
  [K in ColorFormat]: MaterialColorResponse<K>;
};
/** Legacy keyed shape; current scheme helpers return MaterialSchemeResult arrays. */
export type SwatchSchemeMap<K extends ColorFormat = "hex"> = Partial<
  Record<SwatchName, MaterialColorResponse<K>>
>;
export type ColorExtractionType = "dominant" | "palette" | "swatch";

export interface ImageSchemeResultMap<K extends ColorFormat = "hex"> {
  dominant: MaterialSchemeResult<K>[];
  palette: MaterialSchemeResult<K>[];
  swatch: MaterialSchemeResult<K>[];
}
