import { useCallback, useState, useEffect } from "react";
import { PaletteIcon } from "lucide-react";
import { createMaterialSchemesFromImageSync } from "svaela";

import { ColorGrid } from "../features/ColorGrid";
import { MaterialOptions } from "../features/MaterialOptions";
import { Separator } from "../ui/separator";
import { FileUpload } from "../shared/FileUpload";

import { useTheme } from "@/hooks/useTheme";
import { useOptions } from "@/hooks/useOptions";
import { cn } from "@/lib/utils";
import { logger } from "@/lib/logger";
import { downscale } from "@/lib/downscale";

export function PaletteConfig() {
  const { options, setOptions } = useOptions();
  const { setTheme, generatedPalettes, setGeneratedPalettes } =
    useTheme();

  const [activeSchemeIndex, setActiveSchemeIndex] = useState<number>(0);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(
    null,
  );

  const handleImageRefChange = useCallback((img: HTMLImageElement | null) => {
    logger("Image Ref Changed");
    setImageElement(img);
  }, []);

  useEffect(() => {
    if (generatedPalettes.length === 0) return;
    setTheme(generatedPalettes[activeSchemeIndex]);
  }, [activeSchemeIndex, generatedPalettes]);

  useEffect(() => {
    if (!imageElement) return;

    const generateColors = () => {
      try {
        const img = downscale(imageElement);
        const colors = createMaterialSchemesFromImageSync(img, {
          contrastLevel: options.contrastLevel,
          scheme: options.schemeVariant,
          format: options.colorOutput,
          extractionMode: options.extractionMode,
          paletteSize: options.paletteSize,
        });

        if (colors.length < activeSchemeIndex) setActiveSchemeIndex(0);
        setGeneratedPalettes(colors);
        logger("colors", colors);
      } catch (error) {
        console.error("Failed to generate schemes:", error);
      }
    };

    const handleImageLoad = () => {
      logger("Image Loaded");
      setGeneratedPalettes([]);
      generateColors();
    };

    if (imageElement.complete && imageElement.naturalWidth > 0) {
      generateColors();
    } else {
      logger("Attach load event listener to image");
      setGeneratedPalettes([]);
      imageElement.addEventListener("load", handleImageLoad);
    }

    // Cleanup event
    return () => {
      imageElement.removeEventListener("load", handleImageLoad);
    };
  }, [imageElement, options]);

  return (
    <section className="relative z-10 bg-background margin scroll-mt-20 rounded-t-[2rem]">
      <div
        className={cn(
          "flex flex-col mx-1 sm:mx-10 md:mx-20 xl:mx-40 min-h-[30dvh] gap-8",
          "p-3",
        )}
      >
        {/*Source*/}
        <div className="flex flex-col gap-2">
          <div className="flex w-full items-center gap-5 overflow-hidden">
            <span className="text-lg font-bold">Source</span>
            <Separator className="border-t-2 w-full" />
          </div>

          {/* File Upload */}
          <FileUpload
            imageRef={handleImageRefChange}
            maxSize={10 * 1024 * 1024}
          />
        </div>

        {/* ----Generator Settings ----*/}
        <MaterialOptions
          onSelectChange={(value, key) => {
            if (value === null) return;
            setGeneratedPalettes([]);
            setOptions((prev) => ({
              ...prev,
              [key]: value,
            }));
          }}
        />

        {generatedPalettes.length > 0 && imageElement ? (
          <div id="result" className="flex flex-col gap-2 ">
            <div className="flex w-full items-center gap-5 overflow-hidden">
              <span className="text-lg font-bold">Result</span>
              <Separator className="border-t-2 w-full" />
            </div>

            <ColorGrid
              value={generatedPalettes}
              activeIndex={activeSchemeIndex}
              onActiveChange={setActiveSchemeIndex}
            />
          </div>
        ) : (
          <div className="flex min-h-50 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed bg-muted/20 p-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl border bg-background text-muted-foreground">
              <PaletteIcon aria-hidden="true" className="size-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">
                Your palette starts here
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                Upload an image above to discover its colors and generate your
                Material You palette.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
