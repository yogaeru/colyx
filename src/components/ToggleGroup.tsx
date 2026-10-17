import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "cn";

type ToggleItem<T extends string> = {
  value: T;
  label: ReactNode;
};

type ToggleGroupProps<T extends string> = {
  items: ToggleItem<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export function ToggleGroup<T extends string>({
  items,
  value,
  onChange,
  className,
}: ToggleGroupProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [indicator, setIndicator] = useState({
    x: 0,
    width: 0,
    height: 0,
  });

  const updateIndicator = () => {
    const container = containerRef.current;
    const button = buttonRefs.current[value];

    if (!container || !button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    setIndicator({
      x: buttonRect.left - containerRect.left,
      width: buttonRect.width,
      height: buttonRect.height,
    });
  };

  useLayoutEffect(() => {
    updateIndicator();
  }, [value, items]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);

    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [value]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-flex bg-muted",
        "text-muted-foreground",
        className,
      )}
    >
      {/* Sliding highlight */}
      <div
        className={cn(
          "pointer-events-none absolute left-0 top-0",
          "border bg-background shadow-sm",
          "transition-[transform,width,height]",
          "duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
        )}
        style={{
          width: indicator.width,
          height: indicator.height,
          transform: `translateX(${indicator.x}px)`,
        }}
      />

      {items.map((item) => {
        const active = item.value === value;

        return (
          <button
            key={item.value}
            ref={(el) => {
              buttonRefs.current[item.value] = el;
            }}
            type="button"
            onClick={() => onChange(item.value)}
            className={cn(
              "relative z-10 px-4 py-1.5",
              "text-sm font-medium",
              "transition-colors",
              "focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-ring",
              "focus-visible:ring-offset-2",
              "focus-visible:ring-offset-background",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}