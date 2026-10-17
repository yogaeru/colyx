import { useId, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "cn";

import { ColorSwatch } from "@/components/shared/ColorSwatch";
import {
  formatColor,
  MaterialYouColors,
  type ColorFormat,
  type MaterialRole,
  type MaterialSchemeResult,
} from "@/lib/colors";

const COLOR_GROUPS = Object.entries(MaterialYouColors).map(([name, roles]) => ({
  name,
  roles: Object.entries(roles) as [MaterialRole, string][],
}));

type SchemeMode = "light" | "dark";

export interface ColorGridProps {
  schemes: readonly MaterialSchemeResult<ColorFormat>[];
  format: ColorFormat;
  initialMode?: SchemeMode;
  className?: string;
}

export function ColorGrid({
  schemes,
  format,
  initialMode = "light",
  className,
}: ColorGridProps) {
  const gridId = useId();
  const [mode, setMode] = useState<SchemeMode>(initialMode);
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>(null);
  const activeScheme = schemes.find((scheme) => scheme.id === selectedSchemeId) ?? schemes[0];

  if (!activeScheme) {
    return (
      <p role="status" className={cn("p-4 text-sm text-muted-foreground", className)}>
        No colors could be extracted. Try another image.
      </p>
    );
  }

  const colors = activeScheme.color[mode];

  return (
    <div className={cn("space-y-6 p-2", className)}>
      <section aria-labelledby={`${gridId}-sources`} className="space-y-3">
        <h3 id={`${gridId}-sources`} className="text-sm font-semibold">
          Extracted colors
        </h3>
        <div role="group" aria-label="Source color" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {schemes.map((scheme) => {
            const sourceColor = formatColor(scheme.sourceColor, format);
            const selected = scheme.id === activeScheme.id;
            return (
              
              <button
                key={scheme.id}
                type="button"
                aria-pressed={selected}
                aria-label={`Show ${scheme.name} scheme`}
                onClick={() => setSelectedSchemeId(scheme.id)}
                className={cn(
                  "min-w-0 overflow-hidden bg-card text-left transition-shadow",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  selected ? "border-primary ring-2 ring-primary" : "border-border hover:border-primary/50",
                )}
              >
                <ColorSwatch title={scheme.name} color={sourceColor} />
                {/*<span className="block h-14 border-b border-border" style={{ backgroundColor: sourceColor }} />
                <span className="block space-y-1 p-2">
                  <span className="block truncate text-xs font-semibold">{scheme.name}</span>
                  <span title={sourceColor} className="block truncate font-mono text-[10px] text-muted-foreground">
                    {sourceColor}
                  </span>
                </span>*/}
              </button>
            );
          })}
        </div>
      </section>

      <section aria-labelledby={`${gridId}-scheme`} className="space-y-5 border-t border-border pt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 id={`${gridId}-scheme`} className="text-sm font-semibold">
              {activeScheme.name} scheme
            </h3>
            <p className="text-xs text-muted-foreground">
              Choose an appearance. Click a color's copy button to copy its CSS value.
            </p>
          </div>
          <div role="group" aria-label="Scheme appearance" className="inline-flex gap-1 rounded-lg border border-border p-1">
            {(["light", "dark"] as const).map((appearance) => {
              const Icon = appearance === "light" ? Sun : Moon;
              return (
                <button
                  key={appearance}
                  type="button"
                  aria-pressed={mode === appearance}
                  onClick={() => setMode(appearance)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium capitalize",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    mode === appearance ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <Icon size={14} aria-hidden="true" />
                  {appearance}
                </button>
              );
            })}
          </div>
        </div>

        <div aria-live="polite" aria-atomic="false" className="space-y-6">
          {COLOR_GROUPS.map((group) => (
            <section key={group.name} aria-labelledby={`${gridId}-${group.name}`} className="space-y-2">
              <h4 id={`${gridId}-${group.name}`} className="text-sm font-semibold capitalize">
                {group.name}
              </h4>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {group.roles.map(([role, description]) => (
                  <div
                    key={role}
                    data-color-role={role}
                    className="min-w-0 [&>div]:w-full [&>div]:max-w-none"
                  >
                    <ColorSwatch
                      title={role}
                      subtitle={description}
                      color={formatColor(colors[role], format)}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
