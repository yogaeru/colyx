import type { LucideIcon } from "lucide-react";

import {
  ToggleGroup as ToggleGroupPrimitve,
  ToggleGroupItem,
} from "../ui/toggle-group";

interface ToggleGroupValue {
  label: string;
  value: string;
  icon?: LucideIcon;
}

interface ToggleGroupProps {
  variant?: "default" | "outline";
  items: ToggleGroupValue[];
  onChange?: (value: string[]) => void;
  multiple?: boolean;
  value?: string[];
  defaultValue?: string[];
}

function ToggleGroup({
  variant = "default",
  items,
  onChange,
  multiple = false,
  defaultValue,
  value,
}: ToggleGroupProps) {
  return (
    <div className="bg-card w-fit rounded-full border-2 border-border p-1">
      <ToggleGroupPrimitve
        variant={variant}
        value={value}
        onValueChange={onChange}
        multiple={multiple}
        defaultValue={defaultValue}
      >
        {items.map(({ label, value, icon: Icon }) => (
          <ToggleGroupItem
            key={label}
            value={value}
            aria-label={`Toggle ${label}`}
          >
            {Icon && <Icon size={12} />}
            {label}
          </ToggleGroupItem>
        ))}
      </ToggleGroupPrimitve>
    </div>
  );
}

export { ToggleGroup };
