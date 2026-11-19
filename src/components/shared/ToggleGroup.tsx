import {
  ToggleGroup as ToggleGroupPrimitve,
  ToggleGroupItem,
} from "../ui/toggle-group";

interface ToggleGroupProps {
  variant?: "default" | "outline";
  item: string[];
  onChange?: (value: string[]) => void;
  multiple?: boolean;
  value?: string[];
  defaultValue?: string[];
}

function ToggleGroup({
  variant = "default",
  item,
  onChange,
  multiple = false,
  defaultValue,
  value,
}: ToggleGroupProps) {
  return (
    <div className="bg-card w-fit rounded-full">
      <ToggleGroupPrimitve
        variant={variant}
        value={value}
        onValueChange={onChange}
        multiple={multiple}

        defaultValue={defaultValue}
      >
        {item.map((value) => (
          <ToggleGroupItem
            key={value}
            value={value}
            aria-label={`Toggle ${value}`}
          >
            {value}
          </ToggleGroupItem>
        ))}
      </ToggleGroupPrimitve>
    </div>
  );
}

export { ToggleGroup };
