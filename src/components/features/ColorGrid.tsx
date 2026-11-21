import { SunIcon, MoonIcon } from "lucide-react";
import { formatColor } from "svaela";
import type { MaterialSchemeResult, ColorFormatMap } from "svaela";

import { cn } from "@/lib/utils";
import { useOptions } from "@/hooks/useOptions";
import { materialYouColors } from "@/lib/colors";

import { ColorSwatch } from "../shared/ColorSwatch";
import { ToggleGroup } from "../shared/ToggleGroup";

interface ColorGridProps {
  value: MaterialSchemeResult<keyof ColorFormatMap>[] | [];
  activeIndex: number;
  onActiveChange: (index: number) => void;
}

const toggleItems = [
  { label: "Light", value: "light", icon: SunIcon },
  { label: "Dark", value: "dark", icon: MoonIcon },
];

export function ColorGrid({
  value,
  activeIndex,
  onActiveChange,
}: ColorGridProps) {
  const { options, setOptions } = useOptions();

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {value.map((scheme, index) => {
          const activeId = value[activeIndex]?.id;
          return (
            <div
              key={index}
              className={cn(
                "rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
              )}
              onClick={() => onActiveChange(index)}
            >
              <ColorSwatch
                className={`${activeId === scheme.id ? "border-3 border-primary" : ""}`}
                title={scheme.name}
                color={formatColor(scheme.sourceColor, options.colorOutput)}
              />
            </div>
          );
        })}
      </div>

      {/* Color Swatch Container */}
      <div className="flex flex-col gap-3 bg-popover rounded-xl p-3">
        <ToggleGroup
          multiple={false}
          items={toggleItems}
          value={[options.theme]}
          onChange={(value) => {
            console.log("Theme Toggle Changed", value);
            if (value.length === 0) return;
            setOptions((prev) => ({
              ...prev,
              theme: value[0].toLowerCase() as "light" | "dark",
            }));
          }}
        />
        {Object.entries(materialYouColors).map(([category, colors]) => (
          // Color Swatch Category
          <div key={category} className="flex flex-col gap-3">
            <span className="text-sm font-bold">{category}</span>
            {/* Color Swatch Grid per Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Object.entries(colors).map(([token, desc]) => {
                //  Get Color
                let formattedColor: string = "";
                const color = value[activeIndex]?.colors;
                const selectedColor =
                  color?.[token as keyof typeof color][options.theme];

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
        ))}
      </div>
    </>
  );
}
