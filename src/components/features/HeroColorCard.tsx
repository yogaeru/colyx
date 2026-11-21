import { useId, useState } from "react";
import { ArrowUpRightIcon, SparklesIcon } from "lucide-react";

const SATURATION = 52;
const VALUE = 100;

function hsvToHex(hue: number): string {
  const saturation = SATURATION / 100;
  const value = VALUE / 100;
  const chroma = value * saturation;
  const sector = (hue % 360) / 60;
  const secondary = chroma * (1 - Math.abs((sector % 2) - 1));
  const offset = value - chroma;
  const channels = [
    [chroma, secondary, 0],
    [secondary, chroma, 0],
    [0, chroma, secondary],
    [0, secondary, chroma],
    [secondary, 0, chroma],
    [chroma, 0, secondary],
  ][Math.floor(sector)];

  return `#${channels
    .map((channel) =>
      Math.round((channel + offset) * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

const HUE_GRADIENT = `linear-gradient(to right, ${[
  0, 60, 120, 180, 240, 300, 360,
]
  .map((hue) => hsvToHex(hue))
  .join(", ")})`;

export function HeroColorCard() {
  const [hue, setHue] = useState(265);
  const sliderId = useId();
  const color = hsvToHex(hue);

  return (
    <div className="mx-auto w-full max-w-md rounded-[2rem] border bg-card p-3 shadow-2xl shadow-black/10 sm:p-4">
      <div
        className="relative isolate flex min-h-64 flex-col justify-between overflow-hidden rounded-3xl p-6 text-slate-950 sm:min-h-80"
        style={{ backgroundColor: color }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 -z-10 size-56 rounded-full border-[40px] border-white/20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-12 -z-10 size-64 rounded-full bg-white/15"
        />

        <div className="flex items-center justify-between">
          <span className="rounded-full border border-black/10 bg-white/30 px-3 py-1 text-xs font-medium tracking-wide">
            A little color playground
          </span>
          <SparklesIcon aria-hidden="true" className="size-5" />
        </div>

        <div className="py-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]">
            One hue. Endless moods.
          </p>
          <p className="text-5xl font-semibold leading-none tracking-tight sm:text-6xl">
            Make it
            <br />
            your color.
          </p>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-medium">Your current color</p>
            <p className="font-mono text-xl font-semibold uppercase">{color}</p>
          </div>
          <span className="flex size-10 items-center justify-center rounded-full bg-white/30">
            <ArrowUpRightIcon aria-hidden="true" className="size-5" />
          </span>
        </div>
      </div>

      <div className="px-2 pb-2 pt-6 sm:px-3">
        <div className="mb-3 flex items-center justify-between text-sm">
          <label htmlFor={sliderId} className="font-medium">
            Find your hue
          </label>
          <output
            htmlFor={sliderId}
            className="text-muted-foreground tabular-nums"
          >
            {hue}°
          </output>
        </div>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={360}
          step={1}
          value={hue}
          aria-valuetext={`${hue} degrees`}
          onChange={(event) => setHue(Number(event.target.value))}
          style={{ background: HUE_GRADIENT }}
          className="block h-3 w-full cursor-pointer appearance-none rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-slate-900 [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-slate-900 [&::-moz-range-thumb]:shadow-md"
        />
        <div className="mt-5 grid grid-cols-3 divide-x rounded-xl border bg-muted/40 py-3 text-center text-xs">
          <div>
            <p className="mb-1 text-muted-foreground">Hue</p>
            <p className="font-medium tabular-nums">{hue}°</p>
          </div>
          <div>
            <p className="mb-1 text-muted-foreground">Saturation</p>
            <p className="font-medium">{SATURATION}%</p>
          </div>
          <div>
            <p className="mb-1 text-muted-foreground">Value</p>
            <p className="font-medium">{VALUE}%</p>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Slide to explore. Saturation and value stay fixed.
        </p>
      </div>
    </div>
  );
}
