import { Selector } from "../shared/Selector";
import { Separator } from "../ui/separator";

import { useOptions } from "@/hooks/useOptions";
import { selectOptions } from "@/lib/options";
import { Slider } from "../ui/slider";

interface MaterialOptionsProps {
  onSelectChange: (value: string | number, key: string) => void;
}

export function MaterialOptions({ onSelectChange }: MaterialOptionsProps) {
  const { options, setOptions } = useOptions();

  return (
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
              onChange={(value) => onSelectChange(value, key)}
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
                const paletteSize = Array.isArray(value) ? value[0] : value;

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
  );
}
