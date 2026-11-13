import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectorItems<T> = {
  label: React.ReactNode;
  value: T;
  description?: string;
};

interface SelectorProps<T> {
  label?: string
  items: readonly SelectorItems<T>[];
  defaultValue?: T;
  onChange?: (value: T | null) => void;
}

export function Selector<T = string>({
  label,
  items,
  defaultValue,
  onChange,
}: SelectorProps<T>) {
  return (
    <Select
      items={items}
      defaultValue={defaultValue ?? items[0].value}
      onValueChange={onChange}
    >
      <SelectTrigger className="w-full rounded-lg">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {items.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              <div className="flex flex-col">
                <span>{item.label}</span>
                {item.description && <span>{item.description}</span>}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
