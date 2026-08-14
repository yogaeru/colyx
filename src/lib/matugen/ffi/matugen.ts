/**
 * High-level typed wrapper around `libmatugen`'s C-ABI surface.
 *
 * Every `char*` returned by the native library is read and freed
 * (`matugen_free_string`) before the corresponding method returns, so
 * callers never have to manage native memory themselves.
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
} from "../types";

import { loadLib, callFfi, type Lib } from "./utils";

export class Matugen {
  #lib: Lib;

  constructor(libPath?: string) {
    this.#lib = loadLib(libPath);
  }

  async extractColors(request: ExtractColorsRequest): Promise<ExtractColorsResponse> {
    return await callFfi(
      this.#lib.matugen_extract_colors,
      request,
    );
  }

  /** Returns the ranked list of candidate source colors extracted from an
   * image (or image bytes), without picking one. */
  async getSourceColors(request: SourceColorsRequest): Promise<SourceColorsResponse> {
    return await callFfi(
      this.#lib.matugen_get_source_colors,
      request,
    );
  }

  async renderTemplate(request: RenderTemplateRequest): Promise<RenderTemplateResponse> {
    return await callFfi(
      this.#lib.matugen_render_template,
      request,
    );
  }

  /**
   * Extract colors from an image and render a template in a single call.
   * The color format is automatically inferred by the template engine.
   */
  async renderFromImage(request: RenderFromImageRequest): Promise<RenderFromImageResponse> {
    return await callFfi(
      this.#lib.matugen_render_from_image,
      request,
    );
  }

  async writeOutput(request: WriteOutputRequest): Promise<WriteOutputResponse> {
    return await callFfi(this.#lib.matugen_write_output, request);
  }

  /** Releases the dynamic library handle. Safe to skip; not calling it just
   * keeps the library mapped for the lifetime of the process. */
  close(): void {
    this.#lib.unload();
  }
}

export const matugen = new Matugen();
