/**
 * Module-level API backed by a singleton `Matugen` instance.
 *
 * This is the primary entry point for most consumers — import functions
 * directly without instantiating a class.
 */
import type {
  ExtractColorsRequest,
  ExtractColorsResponse,
  SourceColorsRequest,
  SourceColorsResponse,
  RenderTemplateRequest,
  RenderTemplateResponse,
  RenderFromImageRequest,
  RenderFromImageResponse,
  WriteOutputRequest,
  WriteOutputResponse,
} from "./types";

import { matugen } from "./ffi/matugen";

/**
 * Extract a Material You + base16 palette from an image (path or buffer)
 * or an explicit color.
 *
 * @example
 * ```ts
 * import { extractColors, unwrap } from "@matugen/ffi";
 *
 * const colors = unwrap(
 *   extractColors({ source: { type: "color", format: "hex", value: "#4287f5" } })
 * );
 * console.log(colors.colors?.dark.primary);
 * ```
 */
export async function extractColors(
  request: ExtractColorsRequest,
): Promise<ExtractColorsResponse> {
  return await matugen.extractColors(request);
}

/**
 * Return the ranked list of candidate source colors extracted from an image
 * (path or buffer), without picking one.
 */
export async function getSourceColors(
  request: SourceColorsRequest,
): Promise<SourceColorsResponse> {
  return await matugen.getSourceColors(request);
}

/**
 * Render a template to a string using a palette (no disk I/O).
 */
export async function renderTemplate(
  request: RenderTemplateRequest,
): Promise<RenderTemplateResponse> {
  return await matugen.renderTemplate(request);
}

/**
 * Extract colors from an image and render a template in a single call.
 * The color format is automatically inferred by the template engine,
 * so callers don't need to worry about matching extraction format
 * to template needs.
 */
export async function renderFromImage(
  request: RenderFromImageRequest,
): Promise<RenderFromImageResponse> {
  return await matugen.renderFromImage(request);
}

/**
 * Write rendered content to disk, optionally running `pre_hook`/`post_hook`.
 */
export async function writeOutput(request: WriteOutputRequest): Promise<WriteOutputResponse> {
  return await matugen.writeOutput(request);
}

/**
 * Release the dynamic library handle. Safe to skip; not calling it just
 * keeps the library mapped for the lifetime of the process.
 */
export function close(): void {
  matugen.close();
}
