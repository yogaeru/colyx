import { useState } from "react";
import { Copy, CheckCheck } from "lucide-react";

interface ColorSwatchProps {
  title?: string;
  subtitle?: string;
  color: string;
}

export function ColorSwatch({ title, subtitle, color }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {
    }
  };

  return (
    <div className="flex flex-col border overflow-hidden">
      {/* color swatch */}
      <div
        style={{ backgroundColor: color }}
        className="min-h-15 md:min-h-20 min-w-full h-full"
      />

      <div className="w-full border-t border-border" />

      {/* footer */}
      <div className="flex flex-col gap-1 px-2 py-1.5 min-w-0">
        
        {title && (
          <span
            title={title}
            className="truncate text-xs font-bold leading-tight text-foreground"
          >
            {title}
          </span>
        )}
        
        {subtitle && (
          <span
            title={subtitle}
            className="text-xs font-medium leading-tight text-muted-foreground"
          >
            {subtitle}
          </span>
        )}
        

        {/*<div className="w-full border-t border-border" />*/}
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
            {copied ? <CheckCheck className="text-success" size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}