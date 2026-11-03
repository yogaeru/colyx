import { useEffect, useState, useRef } from "react";
import { cn } from "cn";

import { M3eTheme, type M3eThemeElement } from "@m3e/react/theme";

import Navbar from "./components/Navbar";
import Separator from "./components/Separator";
import Button from "./components/ui/Button";
import UploadCard from "./components/ui/UploadCard";
import SectionTitle from "./components/SectionTitle";
import Selector from "./components/ui/Selector";
import { ColorSwatch } from "./components/ui/ColorSwatch";

import { useTheme } from "./hooks/useTheme";
import { useForwardTheme } from "./hooks/useForwardTheme";

import { colors, MaterialYouColors } from "./lib/colors";

import {
  contrastLevelOptions,
  colorOutputOptions,
  extractionModeOptions,
  themeVariantOptions,
} from "./lib/options";

export default function App() {
  const { theme } = useTheme();
  const themeRef = useRef<M3eThemeElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Forward Theme Color Tokens into Adopted Stylesheet
  useForwardTheme(themeRef, [theme]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <M3eTheme
      className="root"
      ref={themeRef}
      variant={theme.variant}
      scheme={theme.scheme}
      color={theme.color}
      density={theme.density}
      contrast={theme.contrast}
      motion={theme.motion}
    >
      <div
        id="app"
        className={cn("min-h-dvh", "bg-md-background text-md-on-background")}
      >
        <Navbar />

        <main>
          <section
            id="hero"
            aria-labelledby="hero-title"
            className="center flex-col"
          >
            <div className="base bg-grid overflow-hidden px-6 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
              <div className="grid items-center gap-12 xl:grid-cols-[1.15fr_1fr] xl:gap-8">
                <div className="max-w-xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-md-outline-variant bg-md-surface/80 px-3 py-2 text-[10px] tracking-widest uppercase sm:text-xs">
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full bg-md-primary"
                    />
                    Made for Material 3
                  </span>
                  <h1
                    id="hero-title"
                    className="mt-7 text-4xl leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl font-cherry"
                  >
                    Every image.
                    <br />
                    <span className="text-md-primary">A new palette.</span>
                  </h1>
                  <p className="mt-6 max-w-md text-base font-medium leading-7 tracking-normal text-md-on-surface sm:text-lg sm:leading-7">
                    Turn the colors you love into a Material 3 color palette.
                    Start with an image, find your seed color, and give your
                    next interface a little more you.
                  </p>

                  <Button
                    shape="square"
                    className="mt-8"
                    onClick={() => {
                      document.getElementById("palette")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    Explore the palette
                    <span className="ml-1" aria-hidden="true">
                      ↗
                    </span>
                  </Button>

                  <p className="mt-5 text-xs leading-6 text-md-on-surface-variant">
                    Inspired by your images. Built for your interfaces.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          <section id="palette" className="center flex-col scroll-mt-20">
            <div className="base min-h-[50dvh] p-0">
              <div id="seed-color">
                <SectionTitle
                  number="001"
                  title="Seed Color"
                  endTitle="Source Color"
                />

                <div className="p-4">
                  <UploadCard
                    file={file}
                    onFile={setFile}
                    previewUrl={previewUrl}
                    onRemove={() => {
                      URL.revokeObjectURL(previewUrl);
                      setPreviewUrl("");
                      setFile(null);
                    }}
                  />
                </div>
              </div>

              <Separator />

              <div id="options">
                <SectionTitle number="002" title="Options" endTitle="Options" />
                <div className="">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 h-full">
                    {[
                      colorOutputOptions,
                      extractionModeOptions,
                      themeVariantOptions,
                      contrastLevelOptions,
                    ].map((options, index) => (
                      <Selector
                        key={index}
                        label={options[0].label}
                        value={options[0].value}
                        options={options}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <Separator />
              {/*Result*/}
              <div id="result">
                <SectionTitle number="003" title="Results" endTitle="Results" />
                <div className="min-h-5 p-4">
                  <div>
                    <ColorSwatch className="max-w-50" color={colors.sourceColor} title="Palette-1" />
                  </div>

                  <div className="flex flex-col gap-4">
                    {Object.entries(MaterialYouColors).map(([key, value]) => {
                      // console.log(key, value);
                      return (
                        <div key={key} className="flex flex-col gap-2">
                          <h1 className="text-2xl font-cherry font-bold">
                            {key}
                          </h1>
                          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2 ">
                            {Object.entries(value).map(
                              ([role, description]) => {
                                const color =
                                  colors.colors[
                                    role as keyof typeof colors.colors
                                  ];
                                return (
                                  <ColorSwatch
                                    key={role}
                                    color={color.dark}
                                    title={role}
                                    description={description}
                                  />
                                );
                              },
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator />
          <section id="options" className="center flex-col scroll-mt-20">
            <div className="base min-h-[3dvh] p-0"></div>
          </section>
          {/*<Separator />*/}
        </main>
      </div>
    </M3eTheme>
  );
}
