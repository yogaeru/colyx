import { useCallback, useState, useEffect } from "react";
import { PaletteIcon, PaintRollerIcon, UploadIcon } from "lucide-react";
import {
  formatColor,
  createMaterialSchemesFromImage,
  type ColorFormatMap,
  type MaterialSchemeResult,
} from "svaela";

import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";
import { Selector } from "./components/ui/Selector";
import { Slider } from "./components/ui/slider";
import { ColorSwatch } from "./components/ui/ColorSwatch";
import { FileUpload } from "./components/features/FileUpload";

import { cn } from "@/lib/utils";
import selectOptions from "@/lib/options";
import { downscale } from "@/lib/downscale";
import { useTheme } from "@/hooks/useTheme";
import { useOptions } from "@/hooks/useOptions";
import { materialYouColors } from "@/lib/colors";

const TEXT_ASCII = `
░█████╗░░█████╗░██╗░░░░░██╗░░░██╗██╗░░██╗
██╔══██╗██╔══██╗██║░░░░░╚██╗░██╔╝╚██╗██╔╝
██║░░╚═╝██║░░██║██║░░░░░░╚████╔╝░░╚███╔╝░
██║░░██╗██║░░██║██║░░░░░░░╚██╔╝░░░██╔██╗░
╚█████╔╝╚█████╔╝███████╗░░░██║░░░██╔╝╚██╗
░╚════╝░░╚════╝░╚══════╝░░░╚═╝░░░╚═╝░░╚═╝
`;

export default function App() {
  const { setTheme } = useTheme();
  const { options, setOptions } = useOptions();

  const [activeSchemeIndex, setActiveSchemeIndex] = useState<number>(0);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(
    null,
  );
  const [result, setResult] = useState<
    MaterialSchemeResult<keyof ColorFormatMap>[] | []
  >([]);

  /** Handle for image changes */
  const handleImageRefChange = useCallback((img: HTMLImageElement | null) => {
    console.log("Image Ref Changed");
    setImageElement(img);
  }, []);

  useEffect(() => {
    if (result.length < 0) return;
    setTheme(result[activeSchemeIndex]);
  }, [activeSchemeIndex, result]);

  useEffect(() => {
    if (!imageElement) return;

    let cancelled = false;

    const generateColors = async () => {
      try {
        console.time("Generate Time");
        const img = downscale(imageElement);
        const colors = await createMaterialSchemesFromImage(img, {
          contrastLevel: options.contrastLevel,
          scheme: options.schemeVariant,
          format: options.colorOutput,
          extractionMode: options.extractionMode,
          paletteSize: options.paletteSize,
        });
        console.timeEnd("Generate Time");

        if (!cancelled) {
          if (colors.length < activeSchemeIndex) setActiveSchemeIndex(0);
          setResult(colors);
          console.log("colors", colors);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to generate schemes:", error);
        }
      }
    };

    const handleImageLoad = () => {
      console.log("Image Loaded");
      setResult([]);
      generateColors();
    };

    if (imageElement.complete && imageElement.naturalWidth > 0) {
      generateColors();
    } else {
      console.log("Attach load event listener to image");
      setResult([]);
      imageElement.addEventListener("load", handleImageLoad);
    }

    // Cleanup event
    return () => {
      cancelled = true;
      imageElement.removeEventListener("load", handleImageLoad);
    };
  }, [imageElement, options]);

  return (
    <>
      <main>
        {/*Hero Section*/}
        <section
          id="hero"
          className="bg-background bg-grid relative z-1 lg:sticky lg:top-0"
        >
          <div
            className={cn(
              "grid grid-cols-1 items-center gap-12 mx-5 md:mx-20 xl:mx-40 min-h-[95dvh] lg:grid-cols-2 lg:gap-10",
              "px-3 py-16 lg:py-20",
            )}
          >
            <div className="flex min-w-0 flex-col justify-center">
              <div className="flex flex-wrap gap-3 py-1">
                <Badge variant="default">
                  <PaletteIcon className="w-4 h-4" />
                  Material You
                </Badge>
                <Badge variant="secondary">
                  <PaintRollerIcon className="w-4 h-4" />
                  Color Generator
                </Badge>
              </div>

              <pre
                aria-hidden="true"
                className="whitespace-pre text-[clamp(0.45rem,1.4vw,0.75rem)] text-primary"
              >
                {TEXT_ASCII}
              </pre>
              <h1 className="max-w-[16ch] text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-3xl xl:text-4xl">
                Turn Any Image Into Material You Palette
              </h1>
              <p className="mt-2 max-w-[48ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Find the colors hiding in your favorite images. Create a
                harmonious Material You palette and make your next idea feel
                uniquely yours.
              </p>

              <Button
                className="px-5 mt-5 w-fit"
                onClick={() => {
                  document.getElementById("content")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                <UploadIcon size={12} />
                Upload an Image
              </Button>
            </div>
          </div>
        </section>

        {/* ---- Content Section ---- */}
        <section
          id="content"
          className="relative z-10 bg-background margin scroll-mt-20 rounded-t-[2rem]"
        >
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
            <div className="flex flex-col gap-2">
              <div className="flex w-full items-center gap-5 overflow-hidden">
                <span className="text-lg font-bold">Options</span>
                <Separator className="border-t-2 w-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                {Object.entries(selectOptions).map(([key, items], index) => (
                  <div key={index} className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium">{items.label}</span>

                    <Selector<(typeof items.options)[number]["value"]>
                      label={items.label}
                      items={items.options}
                      onChange={(value) => {
                        if (value === null) return;
                        setResult([]);
                        setOptions((prev) => ({
                          ...prev,
                          [key]: value,
                        }));
                      }}
                    />
                  </div>
                ))}

                {/* Slider For How Many Palette source color generate*/}
                {options.extractionMode === "palette" && (
                  <div className="flex flex-col gap-2">
                    <span className="text-lg font-bold">
                      Palette Size - {options.paletteSize}
                    </span>

                    <Slider
                      min={2}
                      max={10}
                      step={1}
                      value={[options.paletteSize]}
                      onValueChange={(value) => {
                        const paletteSize = Array.isArray(value)
                          ? value[0]
                          : value;

                        setOptions((prev) => ({
                          ...prev,
                          paletteSize,
                        }));
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/*
              Result ---
            */}
            {result.length > 0 && imageElement ? (
              <div id="result" className="flex flex-col gap-2 ">
                <div className="flex w-full items-center gap-5 overflow-hidden">
                  <span className="text-lg font-bold">Result</span>
                  <Separator className="border-t-2 w-full" />
                </div>

                {/* Container Extracted Source Color */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                  {result.map((scheme, index) => {
                    const activeId = result[activeSchemeIndex]?.id;
                    return (
                      <div
                        key={index}
                        className={cn(
                          "rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
                          activeId === scheme.id
                            ? "border-2 border-primary"
                            : "",
                        )}
                        onClick={() => setActiveSchemeIndex(index)}
                      >
                        <ColorSwatch
                          title={scheme.name}
                          color={formatColor(
                            scheme.sourceColor,
                            options.colorOutput,
                          )}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Color Swatch Container */}
                <div className="flex flex-col gap-3 bg-popover rounded-xl p-3">
                  {Object.entries(materialYouColors).map(
                    ([category, colors]) => (
                      // Color Swatch Category
                      <div key={category} className="flex flex-col gap-3">
                        <span className="text-sm font-bold">{category}</span>
                        {/* Color Swatch Grid per Category */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                          {Object.entries(colors).map(([token, desc]) => {
                            //  Get Color
                            let formattedColor: string = "";
                            const color = result[activeSchemeIndex]?.colors;
                            const selectedColor =
                              color?.[token as keyof typeof color]?.dark;

                            if (!selectedColor) {
                              return null;
                            }
                            try {
                              formattedColor = formatColor(
                                selectedColor,
                                options.colorOutput,
                              );
                            } catch (e) {
                              console.log(e);
                            }

                            return (
                              <ColorSwatch
                                key={token}
                                color={formattedColor}
                                title={token}
                                subtitle={desc}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ),
                  )}
                </div>
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
                    Upload an image above to discover its colors and generate
                    your Material You palette.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="p-2 bg-card">
        <div className="flex justify-center gap-2">
          <span>Made by yogaeru with ❣️</span>
        </div>
      </footer>
    </>
  );
}
