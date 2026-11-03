import {
  M3eButtonSegment,
  M3eSegmentedButton,
} from "@m3e/react/segmented-button";
import { M3eIcon } from "@m3e/react/icon";

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
  icon?: string;
  badge?: string;
}

interface SegmentedControlProps<T extends string> {
  ariaLabel: string;
  value: T;
  options: readonly SegmentOption<T>[];
  onChange: (value: T) => void;
  className?: string;
}

export default function SegmentedControl<T extends string>({
  ariaLabel,
  value,
  options,
  onChange,
  className = "",
}: SegmentedControlProps<T>) {
  return (
    <div className={`inline-flex max-w-full overflow-x-auto ${className}`}>
      <M3eSegmentedButton aria-label={ariaLabel}>
        {options.map((option) => (
          <M3eButtonSegment
            key={option.value}
            value={option.value}
            checked={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.icon && <M3eIcon name={option.icon} aria-hidden="true" />}
            <span>{option.label}</span>
          </M3eButtonSegment>
        ))}
      </M3eSegmentedButton>
    </div>
  );
}
