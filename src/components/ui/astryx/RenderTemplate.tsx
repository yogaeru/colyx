import { useEffect, useState } from "react";
import { Search, SparklesIcon, File } from "lucide-react";
import {
  CodeBlock,
  Selector,
  VStack,
  HStack,
  Button,
  SegmentedControl,
  SegmentedControlItem,
} from "@astryxdesign/core";
import { useMediaQuery } from "@astryxdesign/core";

import { renderTemplateFn } from "#/server/renderColor";

import { cn } from "@/lib/cn";
import type { ExtractColorsSuccess } from "@/lib/matugen";
import { appsList, templates, type TemplateName } from "@/templates";

import Title from "./Title";

interface RenderTemplateProps {
  image: File | File[] | null;
  data: (ExtractColorsSuccess | null)[] | null;
}

export default function RenderTemplate({ image, data }: RenderTemplateProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [app, setApp] = useState<TemplateName>("css");
  const [template, setTemplate] = useState("");
  const [sourceColor, setSourceColor] = useState("");
  const [tab, setTab] = useState<"preview" | "result">("preview");
  const [resTemplate, setResTemplate] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  // Get source color and map to selector options
  const sourceColorsOptions = data
    ?.map((value) => {
      if (!value?.source_color) return;
      return {
        label: value?.source_color,
        value: value?.source_color,
      };
    })
    .filter(Boolean) as { label: string; value: string }[];

  // Set initial source color data
  useEffect(() => {
    const initialColor = data?.[0]?.source_color;
    if (initialColor) setSourceColor(initialColor);
  }, [data]);

  // change template on app change
  useEffect(() => {
    const cbFn = templates[app];
    const template = cbFn();

    setTemplate(template);
  }, [app]);

  // handle submit for render template
  const handleGenerateTemplate = async () => {
    const formData = new FormData();
    if (image && !Array.isArray(image)) {
      formData.append("image", image);
    }
    formData.append("template", template);
    setIsSubmit(true);
    const result = await renderTemplateFn({ data: formData });
    if (result) setResTemplate(result);
    setIsSubmit(false);
    setTab("result")
  };

  return (
    <VStack width="100%" gap={6}>
      <Title text="RENDER TEMPLATE" />
      <div className={cn("w-full gap-4", "flex flex-col md:flex-row")}>
        <Selector
          width="100%"
          label="Source Color"
          value={sourceColor}
          onChange={setSourceColor as any}
          options={sourceColorsOptions}
          renderOption={(value) => {
            return (
              <HStack gap={2} align="center">
                <div
                  className="w-5 h-5"
                  style={{
                    backgroundColor: value.value,
                  }}
                />
                <span>{value.label}</span>
              </HStack>
            );
          }}
        />
        <Selector
          width="100%"
          label="App Template"
          value={app}
          onChange={setApp as any}
          options={appsList.map((app) => ({ label: app, value: app }))}
        />
      </div>

      <VStack gap={2}>
        <HStack gap={4}>
          <SegmentedControl
            value={tab}
            onChange={(value) => {
              setTab(value as "preview" | "result");
            }}
            label="type"
            size="md"
            layout="fill"
          >
            <SegmentedControlItem
              value="preview"
              label={isMobile ? "" : "Preview"}
              icon={<Search />}
            />
            <SegmentedControlItem
              value="result"
              label={isMobile ? "" : "Result"}
              icon={<File />}
            />
          </SegmentedControl>

          <Button
            label="Generate Template"
            variant="primary"
            width="80%"
            size="md"
            icon={<SparklesIcon />}
            isLoading={isSubmit}
            isDisabled={isSubmit}
            onClick={handleGenerateTemplate}
          />
        </HStack>

        {tab === "preview" ? (
          <CodeBlock
            width="100%"
            code={template}
            language="tsx2"
            hasLineNumbers
          />
        ) : (
          <CodeBlock
            width="100%"
            code={resTemplate}
            language="tsx2"
            hasLineNumbers
          />
        )}
      </VStack>
    </VStack>
  );
}
