import { useState } from "react";
import { M3eIcon } from "@m3e/react/icon";

interface ColorSwatchProps {
  title?: string;
  description?: string;
  color: string;
  className?: string;
}

export function ColorSwatch({
  title,
  description,
  color,
  className,
}: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {}
  };

  return (
    <div
      className={`flex flex-col border-2 border-md-outline-variant overflow-hidden rounded-lg ${className}`}
    >
      {/* color swatch */}
      <div
        style={{ backgroundColor: color }}
        className="min-h-15 md:min-h-20 min-w-full max-h-20"
      />

      <div className="w-full border-t border-md-outline-variant" />

      <div className="flex flex-col justify-between gap-1 px-2 py-1.5 min-w-0 h-full">
        {/*Body*/}
        <div className="flex flex-col gap-1">
          {title && (
            <span
              title={title}
              className="truncate text-sm font-bold leading-tight text-md-on-background"
            >
              {title}
            </span>
          )}

          {description && (
            <span
              title={description}
              className="text-sm font-medium leading-tight text-md-on-background/70"
            >
              {description}
            </span>
          )}
        </div>

        {/*<div className="w-full border-t-2 border-md-outline-variant" />*/}
        
        {/* Footer   */}
        <div className="flex items-center justify-between gap-1">
          <span className="text-xs font-semibold uppercase leading-tight tracking-wide text-muted-foreground tabular-nums">
            {color}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : `Copy ${color}`}
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? <M3eIcon name="check" /> : <M3eIcon name="home1" />}
          </button>
        </div>
      </div>
    </div>
  );
}
