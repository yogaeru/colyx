import { useId, useMemo, useState } from "react";
import {
  CheckCheck,
  Copy,
  MoonIcon,
  RotateCcwIcon,
  SunIcon,
} from "lucide-react";
import { renderTemplate } from "svaela";
import type { ColorFormatMap, MaterialSchemeResult } from "svaela";

import { useOptions } from "@/hooks/useOptions";
import { logger } from "@/lib/logger";
import { buildTemplateData, templatePresets } from "@/lib/templates";

import { Selector } from "../shared/Selector";
import { ToggleGroup } from "../shared/ToggleGroup";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface TemplateEngineProps {
  value: MaterialSchemeResult<keyof ColorFormatMap>[] | [];
  activeIndex: number;
}

const toggleItems = [
  { label: "Light", value: "light", icon: SunIcon },
  { label: "Dark", value: "dark", icon: MoonIcon },
];

const syntaxTokens = [
  "{{sourceColor}}",
  "{{name}}",
  "{{mode}}",
  "{{format}}",
  "{{scheme}}",
  "{{colors.primary.light}}",
  "{{colors.primary.dark}}",
  "{{colors.(role).(mode)}}",
  "{{#each colors as role}}...{{/each}}",
  "{{#each schemes as item}}...{{/each}}",
];

export function TemplateEngine({ value, activeIndex }: TemplateEngineProps) {
  const { options, setOptions } = useOptions();
  const textareaId = useId();

  const [selectedPreset, setSelectedPreset] = useState<string>(
    templatePresets[0].value,
  );
  const [templateText, setTemplateText] = useState<string>(
    templatePresets[0].template,
  );
  const [copied, setCopied] = useState(false);

  const templateData = useMemo(
    () => buildTemplateData(value, activeIndex, options),
    [value, activeIndex, options],
  );

  const renderedOutput = useMemo(() => {
    try {
      return renderTemplate(templateText, templateData);
    } catch (error) {
      logger("Template render error", error);
      return "";
    }
  }, [templateText, templateData]);

  const handlePresetChange = (presetValue: string | null) => {
    if (!presetValue) return;
    setSelectedPreset(presetValue);
    const found = templatePresets.find((item) => item.value === presetValue);
    if (found) {
      setTemplateText(found.template);
    }
  };

  const handleReset = () => {
    const found =
      templatePresets.find((item) => item.value === selectedPreset) ??
      templatePresets[0];
    setTemplateText(found.template);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(renderedOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className="flex flex-col gap-4 bg-popover rounded-xl p-3">
      {/* Toolbar: Mode toggle & Preset selector */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <ToggleGroup
          multiple={false}
          items={toggleItems}
          value={[options.theme]}
          onChange={(nextValue) => {
            logger("Theme Toggle Changed", nextValue);
            if (nextValue.length === 0) return;
            setOptions((prev) => ({
              ...prev,
              theme: nextValue[0].toLowerCase() as "light" | "dark",
            }));
          }}
        />

        <div className="flex flex-col gap-1.5 w-full sm:w-72">
          <span className="text-xs font-medium text-muted-foreground">
            Preset Template
          </span>
          <Selector
            label="Preset Template"
            items={templatePresets}
            defaultValue={selectedPreset}
            onChange={handlePresetChange}
          />
        </div>
      </div>

      {/* Available Variables / Syntax Reference */}
      <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-card p-2.5">
        <span className="text-xs font-semibold text-muted-foreground">
          Available Placeholders (click to insert at end)
        </span>
        <div className="flex flex-wrap gap-1.5 overflow-scroll">
          {syntaxTokens.map((token) => (
            <Badge
              key={token}
              variant="secondary"
              render={
                <button
                  type="button"
                  onClick={() =>
                    setTemplateText((prev) =>
                      prev.endsWith("\n") || prev.length === 0
                        ? `${prev}${token}`
                        : `${prev} ${token}`,
                    )
                  }
                />
              }
              className="p-2 md:p-3 font-mono text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {token}
            </Badge>
          ))}
        </div>
      </div>

      {/* Editor & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* Template Input */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between min-h-8">
            <label htmlFor={textareaId} className="text-sm font-bold">
              Template Input
            </label>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={handleReset}
            >
              <RotateCcwIcon size={12} />
              Reset
            </Button>
          </div>

          <Textarea
            id={textareaId}
            value={templateText}
            onChange={(e) => setTemplateText(e.target.value)}
            spellCheck={false}
            placeholder="Write your Svaela template here, e.g. --primary: {{colors.primary.(mode)}};"
            className="h-[28lh] resize-y rounded-lg bg-card p-3 font-mono text-sm leading-relaxed text-card-foreground"
          />
        </div>

        {/* Rendered Output */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between min-h-8">
            <span className="text-sm font-bold">Rendered Output</span>
            <Button
              type="button"
              variant="secondary"
              size="xs"
              onClick={handleCopy}
              aria-label={copied ? "Copied output" : "Copy rendered output"}
            >
              {copied ? <CheckCheck size={12} /> : <Copy size={12} />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>

          <pre className="w-full h-[28lh] overflow-auto rounded-lg border border-border bg-card p-3 font-mono text-sm leading-relaxed text-card-foreground ">
            <code>{renderedOutput}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
