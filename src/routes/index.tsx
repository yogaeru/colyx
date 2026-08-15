import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createStore, useSelector } from "@tanstack/react-store";
import {
  Button,
  VStack,
  HStack,
  useTheme,
  Selector,
  Divider,
} from "@astryxdesign/core";
import { ArrowBigDownDash } from "lucide-react";

import { cn } from "#/lib/cn";
import Hero from "#/components/Hero";
import ColorTable from "#/components/ui/astryx/ColorTable";
import AstryxFileInput from "#/components/ui/astryx/FileInput";
import { extractColorsFn } from "#/server/extractColors";
import {
  selectionColorFormat,
  selectionScheme,
  type RequestColorsForm,
} from "#/data/color";

import type {
  ColorOutputFormat,
  SchemeType,
  ExtractColorsSuccess,
} from "@/lib/matugen/types";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {},
});

// store
const formStore = createStore<RequestColorsForm>({
  schemeType: "scheme-tonal-spot",
  colorFormat: "hex",
});

function Home() {
  const { tokens } = useTheme();
  const formState = useSelector(formStore, (state) => state);
  const [imageValue, setImageValue] = useState<File | File[] | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitData, setSubmitData] = useState<
    (ExtractColorsSuccess | null)[] | null
  >(null);

  const srollIntoContent = () => {
    const content = document.getElementById("content");
    if (content) {
      content.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (imageValue instanceof File) {
      formData.append("image", imageValue);
    }
    formData.append("colorFormat", formState.colorFormat);
    formData.append("schemeType", formState.schemeType);

    const colors = await extractColorsFn({
      data: formData,
    });

    if (colors) {
      setSubmitData(colors);
    }
  };

  return (
    <>
      <Hero onStart={srollIntoContent} />

      <section
        id="content"
        className={cn(
          "min-h-[50dvh] md:min-h-[60dvh] lg:min-h-[70dvh]",
          "relative z-1",
          "py-15 px-5 lg:py-10 lg:px-40",
        )}
        style={{
          backgroundColor: tokens["--color-background-muted"],
          borderRadius: "40px 40px 0 0",
        }}
      >
        <VStack align="center" className="w-full">
          <VStack
            gap={6}
            align="center"
            className="w-full md:w-[90%] lg:w-[75%]"
          >
            <AstryxFileInput
              value={imageValue}
              onChange={setImageValue}
              preview={imagePreview}
              onPreviewChange={setImagePreview}
            />

            {imageValue && (
              <>
                <Divider label="Options" />
                <form onSubmit={handleSubmit} className="w-full">
                  <VStack gap={6} className="w-full">
                    <HStack gap={4} className="w-full" hAlign="center">
                      <Selector
                        width="100%"
                        label="Output Color Format"
                        options={selectionColorFormat}
                        value={formState.colorFormat}
                        onChange={(newValue) =>
                          formStore.setState((s) => ({
                            ...s,
                            colorFormat: newValue as ColorOutputFormat,
                          }))
                        }
                      />

                      <Selector
                        width="100%"
                        label="Color Scheme"
                        value={formState.schemeType}
                        options={selectionScheme}
                        onChange={(newValue) =>
                          formStore.setState((s) => ({
                            ...s,
                            schemeType: newValue as SchemeType,
                          }))
                        }
                      />
                    </HStack>

                    <Button
                      type="submit"
                      label="Extract Colors"
                      width="100%"
                      variant="primary"
                      size="lg"
                      icon={<ArrowBigDownDash size={18} />}
                    />
                  </VStack>
                </form>
              </>
            )}

            {submitData && (
              <VStack gap={6} align="center" className="w-full">
                <ColorTable data={submitData} />
              </VStack>
            )}
          </VStack>
        </VStack>
      </section>

      {/*<Footer />*/}
    </>
  );
}
