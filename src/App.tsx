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
import { ColorSwatch } from "./components/ui/ColorSwatch";
import { FileUpload } from "./components/features/FileUpload";

import { cn } from "@/lib/utils";
import selectOptions from "@/lib/options";
import { downscale } from "@/lib/downscale";
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
    if (!imageElement) return;

    let cancelled = false;

    const generateColors = async () => {
      try {
        const img = downscale(imageElement);
        const colors = await createMaterialSchemesFromImage(img, {
          contrastLevel: options.contrastLevel,
          scheme: options.schemeVariant,
          format: options.colorOutput,
          extractionMode: options.extractionMode,
        });

        if (!cancelled) {
          setResult(colors);
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
        <section id="hero" className="bg-grid sticky top-0 z-1">
          <div
            className={cn(
              "flex flex-col mx-5 md:mx-30 lg:mx-40 h-[95dvh]",
              "p-3",
            )}
          >
            <div className={cn("flex flex-col justify-center", "h-full w-fit")}>
              <div className="flex gap-3 py-1 px-4">
                <Badge variant="default">
                  <PaletteIcon className="w-4 h-4" />
                  Material You
                </Badge>
                <Badge variant="secondary">
                  <PaintRollerIcon className="w-4 h-4" />
                  Color Generator
                </Badge>
              </div>

              <pre className="whitespace-pre text-xs">{TEXT_ASCII}</pre>
              <h1>Turn Any Image Into Material You Palette</h1>
              <pre className="max-w-[60ch] text-balance mt-3 text-foreground ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                nesciunt aliquid dicta, inventore quam minima iste vero
                cupiditate. Sunt fugit fuga necessitatibus eligendi hic.
                Suscipit dolorum qui exercitationem quos molestiae.
              </pre>

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

        <section
          id="content"
          className="relative z-10 bg-card margin scroll-mt-20 rounded-t-[2rem] border"
        >
          <div
            className={cn(
              "flex flex-col mx-1 sm:mx-10 md:mx-20 lg:mx-40 min-h-[30dvh] gap-8",
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
              <FileUpload imageRef={handleImageRefChange} />
            </div>

            {/*Generator Settings*/}
            <div className="flex flex-col gap-2">
              <div className="flex w-full items-center gap-5 overflow-hidden">
                <span className="text-lg font-bold">Options</span>
                <Separator className="border-t-2 w-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                {Object.entries(selectOptions).map(([key, items], index) => (
                  <div key={index} className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium">
                      Select an options
                    </span>

                    <Selector<(typeof items)[number]["value"]>
                      items={items}
                      onChange={(value) => {
                        if (!value) return;
                        setResult([]);
                        setOptions((prev) => ({
                          ...prev,
                          [key]: value,
                        }));
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Result*/}
            <div id="result" className="flex flex-col gap-2">
              <div className="flex w-full items-center gap-5 overflow-hidden">
                <span className="text-lg font-bold">Result</span>
                <Separator className="border-t-2 w-full" />
              </div>

              {/* Container Extracted Source Color */}
              <div className="grid grid-cols-5 gap-5">
                {result.map((scheme, index) => {
                  const activeId = result[activeSchemeIndex]?.id;
                  return (
                    <div
                      key={index}
                      className={cn(
                        "rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
                        activeId === scheme.id ? "border-2 border-primary" : "",
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
              <div className="flex flex-col gap-3 bg-background rounded-xl p-3 border">
                {result.length > 0 &&
                  Object.entries(materialYouColors).map(
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
