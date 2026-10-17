import { useState, useCallback, useEffect } from "react";
import { ArrowBigDownDash } from "lucide-react";
import { cn } from "cn";

import Title from "@/components/Title";
import { ColorGrid } from "@/components/features/ColorGrid";
import { Selector, type SelectorValue } from "@/components/shared/Selector";
import { Pattern } from "@/components/examples/c-file-upload-10";
import { Button } from "@/components/ui/button";

import {
  schemeFromImageToColor,
  type ColorFormat,
  type SchemeName,
  type ColorExtractionType,
  type MaterialSchemeResult,
} from "@/lib/colors";

interface ExtractedColors {
  type: ColorExtractionType;
  format: ColorFormat;
  schemes: MaterialSchemeResult<ColorFormat>[];
}

const schemes: SelectorValue[] = [
  {
    value: "content",
    label: "Content",
    description: "Colors derived from the source content.",
  },
  {
    value: "vibrant",
    label: "Vibrant",
    description: "Vivid colors with strong saturation.",
  },
  {
    value: "rainbow",
    label: "Rainbow",
    description: "A colorful palette with varied hues.",
  },
  {
    value: "neutral",
    label: "Neutral",
    description: "Subtle colors with low saturation.",
  },
  {
    value: "fidelity",
    label: "Fidelity",
    description: "Preserves the source color's character.",
  },
  {
    value: "tonalSpot",
    label: "Tonal Spot",
    description: "Balanced colors with distinct accents.",
  },
  {
    value: "fruitSalad",
    label: "Fruit Salad",
    description: "Contrasting colors for a playful look.",
  },
  {
    value: "expressive",
    label: "Expressive",
    description: "Bold colors with unexpected combinations.",
  },
  {
    value: "monochrome",
    label: "Monochrome",
    description: "Grayscale colors without colorful accents.",
  },
];

const colorFormat: SelectorValue[] = [
  {
    value: "hex",
    label: "Hex",
    description: "Hexadecimal color code (e.g., #FF5733).",
  },
  {
    value: "argb",
    label: "ARGB",
    description: "Packed alpha, red, green, and blue (0xAARRGGBB).",
  },
  {
    value: "rgb",
    label: "RGB",
    description: "Red, green, and blue channels (0–255).",
  },
  {
    value: "rgba",
    label: "RGBA",
    description: "RGB channels with alpha (0–1).",
  },
  {
    value: "hsl",
    label: "HSL",
    description: "Hue, saturation, and lightness.",
  },
  {
    value: "hsla",
    label: "HSLA",
    description: "HSL channels with alpha (0–1).",
  },
  {
    value: "oklch",
    label: "OKLCH",
    description: "Perceptual lightness, chroma, hue, and alpha.",
  },
];

const extractType = [
  {
    value: "palette",
    label: "Palette",
    description: "Extracts a color palette from the image.",
  },
  {
    value: "dominant",
    label: "Dominant",
    description: "Extracts the dominant color from the image.",
  },
  {
    value: "swatch",
    label: "Swatch",
    description: "Extracts a swatch of colors from the image.",
  },
];

const extractOptionsData = [
  {
    key: "colorFormat",
    title: "Color Format",
    description: "The color format to use for extracted colors.",
    items: colorFormat,
    defaultValue: colorFormat[0],
  },
  {
    key: "colorScheme",
    title: "Color Scheme",
    description: "The color scheme to use for extracted colors.",
    items: schemes,
    defaultValue: schemes[0],
  },
  {
    key: "extractType",
    title: "Extract Type",
    description: "The type of color extraction to perform.",
    items: extractType,
    defaultValue: extractType[0],
  },
];

interface ExtractOptions {
  colorFormat: SelectorValue;
  colorScheme: SelectorValue;
  extractType: SelectorValue;
}

/* Downscale image and return as canvas */
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

export default function Home() {
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(
    null,
  );
  const handleImageRef = useCallback((element: HTMLImageElement | null) => {
    setImageElement(element);
  }, []);

  const [extractedColors, setExtractedColors] =
    useState<ExtractedColors | null>(null);

  const [extractOptions, setExtractOptions] = useState<ExtractOptions>({
    colorFormat: colorFormat[0],
    colorScheme: schemes[0],
    extractType: extractType[0],
  });

  const [isExtracting, setIsExtracting] = useState(false);


  useEffect(() => {
    if (!imageElement) return;
    const resetColors = () => setExtractedColors(null);
    imageElement.addEventListener("load", resetColors);
    return () => imageElement.removeEventListener("load", resetColors);
  }, [imageElement]);

  const nextPaint = useCallback(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => setTimeout(resolve, 0)),
      ),
    [],
  );

  const handleColorExtract = useCallback(async () => {
    if (!imageElement) return;
    if (isExtracting) return;
    setIsExtracting(true);
    await nextPaint();

    try {
      console.time("Color extraction");
      const format = extractOptions.colorFormat.value as ColorFormat;
      const scheme = extractOptions.colorScheme.value as SchemeName;
      const type = extractOptions.extractType.value as ColorExtractionType;

      const resizedImage = downscale(imageElement);

      const generatedSchemes = await schemeFromImageToColor(resizedImage, {
        scheme,
        format,
        colorType: type,
      });
      setExtractedColors({ type, format, schemes: generatedSchemes });
      console.timeEnd("Color extraction");
    } finally {
      setIsExtracting(false);
    }
  }, [imageElement, isExtracting, nextPaint, extractOptions]);

  return (
    <>
      {/*Hero Section*/}
      <section
        id="hero"
        className="flex flex-col items-center justify-center w-full"
      >
        <div className="min-h-[50dvh] section flex flex-col items-center justify-center py-16 px-6 md:px-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
            Material 3 Dynamic Color Generator
          </div>

          <h1 className="text-2xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl text-foreground">
            Extract color from image & generate{" "}
            <span className="text-ring underline decoration-primary/30 decoration-wavy underline-offset-8">
              Material 3
            </span>{" "}
            scheme
          </h1>

          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Upload any image to automatically extract its dominant color
            palette, preview harmonious Material You tonal palettes, and export
            CSS variables or design tokens instantly.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#content"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium text-sm shadow hover:opacity-90 transition-opacity"
            >
              Get Started
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-border bg-card text-card-foreground font-medium text-sm hover:bg-muted/50 transition-colors"
            >
              Documentation
            </a>
          </div>
        </div>
      </section>

      <div className="w-full border-t-2"></div>

      {/* Content Section*/}
      <section
        id="content"
        className="flex flex-col items-center justify-center w-full"
      >
        <div className="min-h-[20dvh] section">
          {/* Souce */}
          <div id="source">
            <Title
              number="01"
              title="Source"
              subtitle="Extract Colors From Source"
            />
            <Pattern
              onImageRef={handleImageRef}
              maxSize={10 * 1024 * 1024}
              className={cn("p-3")}
            />
          </div>
          {/* Source End*/}

          <div className="w-full border-t-2 border-border" />

          {imageElement && (
            // {/* Extract Options */}
            <div id="extract-options">
              <Title
                number="02"
                title="Extract Options"
                subtitle="Extract Colors From Source"
              />

              {/* Content*/}
              <div className="min-h-fit">
                {/* Selector Options*/}
                <div
                  className={cn(
                    "flex flex-col md:flex-row items-center justify-center",
                    "h-fit gap-0 py-2",
                  )}
                >
                  {extractOptionsData.map((option, index) => (
                    <div key={index} className="w-full">
                      <div className="p-2 space-y-2">
                        <div className="space-y-1">
                          <span className="text-sm font-semibold">
                            {option.title}
                          </span>
                          <p className="text-xs text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                        <Selector
                          items={option.items}
                          onValueChange={(value) => {
                            if (value)
                              setExtractOptions({
                                ...extractOptions,
                                [option.key]: value,
                              });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/*Selector Options End*/}

                <div className="w-full border-t-2 border-border" />
                {/*Summary*/}
                <div id="summary">
                  <Title
                    title="Summary"
                    subtitle="000"
                    className="py-0.5 md:py-1.5 static"
                  />

                  <div>
                    <ul className="text-sm">
                      <li className="flex flex-row items-center justify-between py-1.5 px-4 md:px-6 lg:px-8">
                        <span className="text-muted-foreground">
                          Color Output
                        </span>
                        <span className="font-medium text-right">
                          {extractOptions?.colorFormat?.label ?? "—"}
                        </span>
                      </li>

                      <div className="w-full border-t-2 border-border" />

                      <li className="flex items-center justify-between py-1.5 px-4 md:px-6 lg:px-8">
                        <span className="text-muted-foreground">
                          Scheme Type
                        </span>
                        <span className="font-medium text-right">
                          {extractOptions?.colorScheme?.label ?? "—"}
                        </span>
                      </li>

                      <div className="w-full border-t-2 border-border" />

                      <li className="flex items-center justify-between py-1.5 px-4 md:px-6 lg:px-8">
                        <span className="text-muted-foreground">
                          Extract Type
                        </span>
                        <span className="font-medium text-right">
                          {extractOptions?.extractType?.label ?? "—"}
                        </span>
                      </li>
                    </ul>

                    <div className="w-full border-t-2 border-border" />
                    <div className="p-2">
                      <Button
                        className={cn(
                          "w-full p-4.5",
                          "disabled:pointer-events-auto disabled:cursor-not-allowed",
                        )}
                        onClick={handleColorExtract}
                        disabled={isExtracting}
                      >
                        <ArrowBigDownDash size={18} />
                        <span className="font-bold">Extract & Generate</span>
                      </Button>
                    </div>
                  </div>
                </div>

                {/*<pre className="overflow-hidden">
                  {JSON.stringify(extractedColors, null, 1)}
                </pre>*/}
              </div>
              {/*Content End*/}
            </div>
            // {/* Extract Options End*/}
          )}

          {extractedColors && (
            <>
              <div className="w-full border-t-2 border-border" />

              <div id="result">
                <Title
                  number="03"
                  title="Result"
                  subtitle="Extracted Colors and Scheme"
                />
                <ColorGrid
                  schemes={extractedColors.schemes}
                  format={extractedColors.format}
                />
              </div>
            </>
          )}
        </div>
      </section>

      <div className="w-full border-t-2 border-border" />

      <section className="flex flex-col items-center justify-center w-full">
        <div className="min-h-[5dvh] section"></div>
      </section>
    </>
  );
}
