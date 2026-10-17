import { Field } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectorValue {
  value: string;
  label: string;
  description: string;
}

interface SelectorProps {
  items: SelectorValue[];
  defaultValue?: SelectorValue;
  onValueChange?: (value: SelectorValue | null) => void;
}

export function Selector({
  items,
  defaultValue,
  onValueChange,
}: SelectorProps) {
  return (
    <Field className="max-w-full">
      <Select
        defaultValue={defaultValue ?? items[0]}
        items={items}
        onValueChange={onValueChange}
      >
        <SelectTrigger className="w-60 p-4 [&_span.text-muted-foreground]:hidden">
          <SelectValue className="text-md">
            {(item: SelectorValue) => item?.label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            {items.map((plan) => (
              <SelectItem
                key={plan.value}
                value={plan}
                className="[&_svg]:text-primary"
              >
                <div className="flex flex-col items-start gap-px">
                  <span className="font-medium">{plan.label}</span>
                  <span className="text-muted-foreground text-xs">
                    {plan.description}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}
