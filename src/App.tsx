import { useState, useEffect, useRef } from "react";
import { createMaterialSchemesFromImage } from "svaela";
import { PaletteIcon, PaintRollerIcon, UploadIcon } from "lucide-react";

import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";
import { Selector } from "./components/ui/Selector";
import { useTheme } from "@/lib/useTheme";
import { useOptions } from "@/lib/useOptions";
import { ColorSwatch } from "./components/ui/ColorSwatch";

import selectOptions from "@/lib/options";
import { downscale } from "@/lib/downscale";

import { cn } from "@/lib/utils";

import type {
  MaterialSchemeResult,
  ColorFormatMap,
} from "svaela";

export default function App() {
  const { theme } = useTheme();
  const { options, setOptions } = useOptions();
  const imageRef = useRef<HTMLImageElement>(null);

  const [result, setResult] = useState<
    MaterialSchemeResult<keyof ColorFormatMap>[] | null
  >(null);

  const handleOptionsChange = async () => {
    const img = downscale(imageRef.current!);
    const colors = await createMaterialSchemesFromImage(img, {
      contrastLevel: options.contrastLevel,
      scheme: options.schemeVariant,
      format: options.colorOutput,
      extractionMode: options.extractionMode,
    });
    // console.log(colors);
    setResult(colors);
  };

  useEffect(() => {
    if (imageRef.current) {
      handleOptionsChange();
    }
  }, [options]);

  const ascii = `
░█████╗░░█████╗░██╗░░░░░██╗░░░██╗██╗░░██╗
██╔══██╗██╔══██╗██║░░░░░╚██╗░██╔╝╚██╗██╔╝
██║░░╚═╝██║░░██║██║░░░░░░╚████╔╝░░╚███╔╝░
██║░░██╗██║░░██║██║░░░░░░░╚██╔╝░░░██╔██╗░
╚█████╔╝╚█████╔╝███████╗░░░██║░░░██╔╝╚██╗
░╚════╝░░╚════╝░╚══════╝░░░╚═╝░░░╚═╝░░╚═╝
`;

  return (
    <div>
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

              <pre className="whitespace-pre text-xs">{ascii}</pre>
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
                  document.getElementById("content").scrollIntoView({
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

              <div className="w-full h-40 border">
                <img
                  ref={imageRef}
                  src="/1.png"
                  alt="image example"
                  className="w-full h-full object-cover"
                />
                {/*Placeholder for image file upload*/}
              </div>
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

            <div className="flex flex-col gap-2">
              <div className="flex w-full items-center gap-5 overflow-hidden">
                <span className="text-lg font-bold">Result</span>
                <Separator className="border-t-2 w-full" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 bg-background rounded-xl p-3 border">
                {Object.entries(result?.[0]?.colors ?? {}).map(
                  ([key, color], index) => (
                    <ColorSwatch
                      key={index}
                      color={color.light as string}
                      title={"Color Title"}
                      subtitle={"Color"}
                    />
                  ),
                )}
              </div>

              {/*<div className="w-full min-h-40 border p-5 overflow-scroll rounded-lg bg-background">
                <pre>{JSON.stringify(result?.[0], null, 2)}</pre>
              </div>*/}
            </div>
          </div>
        </section>
      </main>

      <footer></footer>
    </div>
  );
}
