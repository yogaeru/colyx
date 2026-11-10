/**
 * Downscales an image to fit within a given maximum width or height.
 * @param img - The image to downscale.
 * @param max - The maximum width or height to fit the image within.
 * @returns The downscaled image as a canvas element.
 */
function downscale(img: HTMLImageElement, max = 150): HTMLCanvasElement {
  const scale = Math.min(
    1,
    max / Math.max(img.naturalWidth, img.naturalHeight),
  );
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
  canvas
    .getContext("2d", { willReadFrequently: true })!
    .drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
}

export { downscale };