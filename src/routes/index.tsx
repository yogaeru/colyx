import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createStore, useSelector } from "@tanstack/react-store";
import { ArrowBigDownDash } from "lucide-react";
import {
  Button,
  VStack,
  useTheme,
  Selector,
  SegmentedControl,
  SegmentedControlItem,
  useToast,
} from "@astryxdesign/core";

import { cn } from "#/lib/cn";
import Hero from "#/components/Hero";
import ColorTable from "#/components/ui/astryx/ColorTable";
import AstryxFileInput from "#/components/ui/astryx/FileInput";
import Footer from "#/components/Footer";
import Title from "#/components/ui/astryx/Title";
import RenderTemplate from "#/components/ui/astryx/RenderTemplate";

import { extractColorsFn } from "#/server/extractColors";
import {
  selectionColorFormat,
  selectionScheme,
  type RequestColorsForm,
} from "@/data/color";

import type {
  ColorOutputFormat,
  SchemeType,
  ExtractColorsSuccess,
} from "@/lib/matugen/types";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {},
  head: () => ({
    meta: [
      {
        title: "Colyx Home",
      },
    ],
  }),
});

interface TabStore {
  type: "image" | "color";
  want: "palette" | "template";
}

// store
const formStore = createStore<RequestColorsForm>({
  schemeType: "scheme-tonal-spot",
  colorFormat: "hex",
  app: "css",
});

const tabStore = createStore<TabStore>({
  type: "image",
  want: "palette",
});

function Home() {
  const toast = useToast();
  const { tokens } = useTheme();
  const formState = useSelector(formStore, (state) => state);
  const tabState = useSelector(tabStore, (state) => state);

  const [imageValue, setImageValue] = useState<File | File[] | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitData, setSubmitData] = useState<
    (ExtractColorsSuccess | null)[] | null
  >(null);

  const [isSubmit, setIsSubmit] = useState(false);

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

    setIsSubmit(true);
    const colors = await extractColorsFn({
      data: formData,
    });

    if (colors) {
      setSubmitData(colors);
    }

    setIsSubmit(false);
    toast({
      body: "Colors extracted successfully!",
      type: "info",
      isAutoHide: true,
      autoHideDuration: 1500,
    });
  };

  return (
    <>
      <Hero onStart={srollIntoContent} />

      <section
        id="content"
        className={cn(
          "min-h-[50dvh] md:min-h-[40dvh] lg:min-h-[30dvh]",
          "relative z-1",
          "py-10 px-5 lg:py-10 lg:px-40",
        )}
        style={{
          backgroundColor: tokens["--color-background-muted"],
          borderRadius: "40px 40px 0 0",
        }}
      >
        <VStack gap={10} align="center" className="w-full">
          <VStack
            gap={10}
            align="center"
            className="w-full md:w-[90%] lg:w-[80%]"
          >
            <VStack gap={4} width="100%">
              <Title text="SOURCE" />
              <AstryxFileInput
                value={imageValue}
                onChange={setImageValue}
                preview={imagePreview}
                onPreviewChange={setImagePreview}
              />
            </VStack>

            {imageValue && (
              <>
                <form onSubmit={handleSubmit} className="w-full">
                  <VStack gap={6} className="w-full">
                    <Title text="EXTRACT OPTIONS" />

                    <div
                      className={cn(
                        "w-full gap-2 md:gap-8",
                        "flex flex-col md:flex-row",
                      )}
                    >
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
                    </div>

                    <Button
                      type="submit"
                      label="Extract Colors"
                      width="100%"
                      variant="primary"
                      size="lg"
                      icon={<ArrowBigDownDash size={18} />}
                      isDisabled={isSubmit}
                      isLoading={isSubmit}
                    />
                  </VStack>
                </form>
              </>
            )}

            {/*Resiult content */}
            {submitData && (
              <VStack gap={6} align="center" className="w-full">
                <Title text="RESULT" />
                <SegmentedControl
                  value={tabState.want}
                  onChange={(value) => {
                    tabStore.setState((s) => ({
                      ...s,
                      want: value as "palette" | "template",
                    }));
                  }}
                  label="type"
                  size="lg"
                  layout="fill"
                >
                  <SegmentedControlItem value="palette" label="Palette" />
                  <SegmentedControlItem value="template" label="Template" />
                </SegmentedControl>

                {/*Result section*/}
                {tabState.want === "palette" ? (
                  <ColorTable data={submitData} />
                ) : (
                  <RenderTemplate image={imageValue} data={submitData} />
                )}
              </VStack>
            )}
          </VStack>
        </VStack>
      </section>
      <Footer />
    </>
  );
}
