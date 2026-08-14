/**
 * Low-level FFI bindings: symbol definitions, library resolution, and
 * the raw `callFfi` helper that encodes JSON over `char*` and frees
 * the returned pointer.
 */
import { existsSync } from "node:fs";
import { promisify } from "node:util";
import koffi from "koffi";

import { MatugenFfiError } from "../error";
import path from "node:path";

type LibFn = (request: string) => Promise<string>;

const suffix =
  process.platform === "win32"
    ? "dll"
    : process.platform === "darwin"
      ? "dylib"
      : "so";

// Library interface and registration
export interface Lib {
  matugen_extract_colors: LibFn;
  matugen_get_source_colors: LibFn;
  matugen_render_template: LibFn;
  matugen_render_from_image: LibFn;
  matugen_write_output: LibFn;
  matugen_free_string: (ptr: any) => void;
  unload: () => void;
}

/**
 * Loads the library and binds FFI functions using Koffi.
 *
 * Functions returning `char *` use a Koffi disposable type so the C string is
 * automatically decoded into a JavaScript string AND the original pointer is
 * freed via `matugen_free_string` — no manual memory management needed.
 */
export function loadLib(libPath?: string): Lib {
  const path = resolveLibPath(libPath);
  const lib = koffi.load(path);

  // Sync free function — used as the Koffi disposable callback.
  // Must be synchronous: Koffi calls it immediately after decoding the return value.
  const freeFn = lib.func("matugen_free_string", "void", ["char *"]);

  // Anonymous disposable type: Koffi decodes char * → JS string, then calls
  // _free on the original pointer to prevent memory leaks.
  // Anonymous (no name) avoids "Duplicate type name" errors in HMR.
  const MatugenStr = koffi.disposable("char *", freeFn);

  // Bind each FFI function and promisify its .async() method.
  // Koffi's .async(args, callback) follows the Node.js error-first callback convention,
  // so util.promisify converts it to (args) => Promise<result>.
  const extractColorsFn = lib.func(
    "matugen_extract_colors",
    MatugenStr,
    ["char *"],
  );
  const getSourceColorsFn = lib.func(
    "matugen_get_source_colors",
    MatugenStr,
    ["char *"],
  );
  const renderTemplateFn = lib.func(
    "matugen_render_template",
    MatugenStr,
    ["char *"],
  );
  const renderFromImageFn = lib.func(
    "matugen_render_from_image",
    MatugenStr,
    ["char *"],
  );
  const writeOutputFn = lib.func(
    "matugen_write_output",
    MatugenStr,
    ["char *"],
  );

  return {
    matugen_extract_colors: promisify(
      extractColorsFn.async.bind(extractColorsFn),
    ) as LibFn,
    matugen_get_source_colors: promisify(
      getSourceColorsFn.async.bind(getSourceColorsFn),
    ) as LibFn,
    matugen_render_template: promisify(
      renderTemplateFn.async.bind(renderTemplateFn),
    ) as LibFn,
    matugen_render_from_image: promisify(
      renderFromImageFn.async.bind(renderFromImageFn),
    ) as LibFn,
    matugen_write_output: promisify(
      writeOutputFn.async.bind(writeOutputFn),
    ) as LibFn,
    matugen_free_string: freeFn,
    unload: () => lib.unload(),
  };
}

// ---------------------------------------------------------------------------
// Library resolution
// ---------------------------------------------------------------------------

/**
 * Locates `libmatugen_ffi.{so,dylib,dll}`.
 *
 * Resolution order:
 * 1. The explicit `libPath` argument, if provided.
 * 2. The `MATUGEN_FFI_LIB_PATH` environment variable.
 * 3. `../../target/release/` and `../../target/debug/` relative to this
 *    package (i.e. `matugen-ffi/target/{release,debug}`), which is where
 *    `cargo build [--release] --features ffi` puts the library by default.
 */
export function resolveLibPath(libPath?: string): string {
  if (libPath) return libPath;

  const envPath = process.env.MATUGEN_FFI_LIB_PATH;
  if (envPath) return envPath;

  const fileName = `matugen.${suffix}`;
  const candidates = [
    path.resolve(process.cwd(), "native/matugen.so")
  ];

  for (const url of candidates) {
    if (existsSync(url)) return url;
  }

  throw new Error(
    `Could not locate ${fileName}. Build it first with ` +
      "`cargo build --features ffi` (or `--release`) inside `matugen-ffi/`, " +
      "or point at it explicitly via the `MATUGEN_FFI_LIB_PATH` environment variable.",
  );
}

// ---------------------------------------------------------------------------
// Low-level call helper
// ---------------------------------------------------------------------------
type FfiFn = (request: string) => Promise<any>;

/**
 * Encode a request as a JSON string, pass it to the native function,
 * parse the JSON response, and free the returned `char*`.
 */
export async function callFfi<Req, Res>(fn: FfiFn, request: Req): Promise<Res> {
  const responseString = await fn(JSON.stringify(request));

  if (responseString === null) {
    throw new MatugenFfiError(
      "matugen FFI call returned a null pointer (this should never happen; please report a bug)",
    );
  }

  return JSON.parse(responseString) as Res;
}
