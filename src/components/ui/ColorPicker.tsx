// import { useCallback, useRef, useState } from "react";
// import { M3eIcon } from "@m3e/react/icon";
// import { M3eButton } from "@m3e/react/button";
// 
// interface ColorPickerProps {
//   value: string;
//   onChange: (value: string) => void;
// }
// 
// function hsvToHex(hue: number, saturation: number, value: number): string {
//   const chroma = value * saturation;
//   const segment = hue / 60;
//   const x = chroma * (1 - Math.abs((segment % 2) - 1));
//   const [red, green, blue] =
//     segment < 1
//       ? [chroma, x, 0]
//       : segment < 2
//         ? [x, chroma, 0]
//         : segment < 3
//           ? [0, chroma, x]
//           : segment < 4
//             ? [0, x, chroma]
//             : segment < 5
//               ? [x, 0, chroma]
//               : [chroma, 0, x];
//   const match = value - chroma;
//   return `#${[red, green, blue]
//     .map((channel) =>
//       Math.round((channel + match) * 255)
//         .toString(16)
//         .padStart(2, "0"),
//     )
//     .join("")}`;
// }
// 
// function hexToHsv(hex: string): {
//   hue: number;
//   saturation: number;
//   value: number;
// } {
//   let clean = hex.replace("#", "").trim();
//   if (clean.length === 3) {
//     clean = clean
//       .split("")
//       .map((c) => c + c)
//       .join("");
//   }
//   const channels =
//     clean.length === 6
//       ? [0, 2, 4].map(
//           (index) => Number.parseInt(clean.slice(index, index + 2), 16) / 255,
//         )
//       : [0.4, 0.3, 0.7];
//   const [red, green, blue] = channels;
//   const max = Math.max(red, green, blue);
//   const min = Math.min(red, green, blue);
//   const delta = max - min;
//   let hue = 0;
//   if (delta) {
//     hue =
//       max === red
//         ? 60 * (((green - blue) / delta) % 6)
//         : max === green
//           ? 60 * ((blue - red) / delta + 2)
//           : 60 * ((red - green) / delta + 4);
//   }
//   return {
//     hue: hue < 0 ? hue + 360 : hue,
//     saturation: max ? delta / max : 0,
//     value: max,
//   };
// }
// 
// export default function ColorPicker({ value, onChange }: ColorPickerProps) {
//   const [hsv, setHsv] = useState(() => hexToHsv(value));
//   const [prevValue, setPrevValue] = useState(value);
//   const [inputValue, setInputValue] = useState(value);
// 
//   // Sync state if external value changes
//   if (value !== prevValue) {
//     setPrevValue(value);
//     setHsv(hexToHsv(value));
//     setInputValue(value.toUpperCase());
//   }
// 
//   const areaRef = useRef<HTMLDivElement>(null);
//   const hueRef = useRef<HTMLDivElement>(null);
// 
//   const updateArea = useCallback(
//     (clientX: number, clientY: number) => {
//       const bounds = areaRef.current?.getBoundingClientRect();
//       if (!bounds) return;
//       const nextSaturation = Math.max(
//         0,
//         Math.min(1, (clientX - bounds.left) / bounds.width),
//       );
//       const nextBrightness = Math.max(
//         0,
//         Math.min(1, 1 - (clientY - bounds.top) / bounds.height),
//       );
//       setHsv((prev) => ({
//         ...prev,
//         saturation: nextSaturation,
//         value: nextBrightness,
//       }));
//       const newHex = hsvToHex(hsv.hue, nextSaturation, nextBrightness);
//       setInputValue(newHex.toUpperCase());
//       onChange(newHex);
//     },
//     [hsv.hue, onChange],
//   );
// 
//   const updateHue = useCallback(
//     (clientX: number) => {
//       const bounds = hueRef.current?.getBoundingClientRect();
//       if (!bounds) return;
//       const nextHue = Math.max(
//         0,
//         Math.min(359, ((clientX - bounds.left) / bounds.width) * 360),
//       );
//       setHsv((prev) => ({ ...prev, hue: nextHue }));
//       const newHex = hsvToHex(nextHue, hsv.saturation, hsv.value);
//       setInputValue(newHex.toUpperCase());
//       onChange(newHex);
//     },
//     [hsv.saturation, hsv.value, onChange],
//   );
// 
//   const handleHexInput = (val: string) => {
//     setInputValue(val);
//     const cleaned = val.trim();
//     if (/^#?[0-9a-fA-F]{6}$/.test(cleaned)) {
//       const formatted = cleaned.startsWith("#") ? cleaned : `#${cleaned}`;
//       onChange(formatted.toLowerCase());
//     }
//   };
// 
//   const hasEyeDropper = typeof window !== "undefined" && "EyeDropper" in window;
// 
//   const openEyeDropper = async () => {
//     try {
//       if (hasEyeDropper) {
//         // @ts-expect-error - EyeDropper API is supported in Chromium browsers
//         const eyeDropper = new window.EyeDropper();
//         const result = await eyeDropper.open();
//         if (result?.sRGBHex) {
//           onChange(result.sRGBHex);
//         }
//       }
//     } catch {
//       // User canceled eyedropper
//     }
//   };
// 
//   return (
//     <div className="flex flex-col gap-4">
//       {/* 2D Saturation / Brightness gradient area */}
//       <div
//         ref={areaRef}
//         className="relative aspect-[2] w-full cursor-crosshair touch-none select-none overflow-hidden rounded-[24px] border border-md-outline-variant shadow-inner transition hover:shadow-md"
//         style={{
//           backgroundColor: `hsl(${hsv.hue} 100% 50%)`,
//           backgroundImage:
//             "linear-gradient(to right, #fff, transparent), linear-gradient(to top, #000, transparent)",
//         }}
//         onPointerDown={(event) => {
//           event.currentTarget.setPointerCapture(event.pointerId);
//           updateArea(event.clientX, event.clientY);
//         }}
//         onPointerMove={(event) => {
//           if (event.currentTarget.hasPointerCapture(event.pointerId)) {
//             updateArea(event.clientX, event.clientY);
//           }
//         }}
//       >
//         <span
//           className="pointer-events-none absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-lg ring-1 ring-black/30"
//           style={{
//             left: `${hsv.saturation * 100}%`,
//             top: `${(1 - hsv.value) * 100}%`,
//             backgroundColor: value,
//           }}
//         />
//       </div>
// 
//       {/* 1D Hue rainbow slider */}
//       <div className="flex items-center gap-3">
//         <M3eIcon
//           name="palette"
//           className="text-md-on-surface-variant text-lg"
//           aria-hidden="true"
//         />
//         <div
//           ref={hueRef}
//           className="relative h-5 flex-1 cursor-ew-resize touch-none select-none rounded-full border border-md-outline-variant shadow-inner"
//           style={{
//             background:
//               "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
//           }}
//           onPointerDown={(event) => {
//             event.currentTarget.setPointerCapture(event.pointerId);
//             updateHue(event.clientX);
//           }}
//           onPointerMove={(event) => {
//             if (event.currentTarget.hasPointerCapture(event.pointerId)) {
//               updateHue(event.clientX);
//             }
//           }}
//         >
//           <span
//             className="pointer-events-none absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-md ring-1 ring-black/20"
//             style={{
//               left: `${(hsv.hue / 360) * 100}%`,
//               backgroundColor: `hsl(${hsv.hue} 100% 50%)`,
//             }}
//           />
//         </div>
//       </div>
// 
//       {/* Hex input & Eyedropper toolbar */}
//       <div className="flex flex-wrap items-center gap-2.5 rounded-[20px] border border-md-outline-variant bg-md-surface-container-low p-2 px-3">
//         <span
//           className="size-8 shrink-0 rounded-full border-2 border-white shadow-sm ring-1 ring-md-outline-variant"
//           style={{ backgroundColor: value }}
//         />
//         <div className="flex items-center gap-1 font-mono text-sm font-bold text-md-on-surface">
//           <span>#</span>
//           <input
//             type="text"
//             value={inputValue.replace("#", "")}
//             onChange={(e) => handleHexInput(e.target.value)}
//             maxLength={6}
//             className="w-20 bg-transparent font-mono font-bold uppercase text-md-on-surface focus:outline-none"
//             placeholder="6750A4"
//           />
//         </div>
// 
//         <div className="ml-auto flex items-center gap-1.5">
//           {hasEyeDropper && (
//             <M3eButton
//               size="small"
//               variant="tonal"
//               className="rounded-full px-2.5 py-1 text-xs font-semibold"
//               onClick={openEyeDropper}
//             >
//               <M3eIcon
//                 name="colorize"
//                 aria-hidden="true"
//                 className="text-sm mr-1"
//               />
//               Eyedropper
//             </M3eButton>
//           )}
//           <span className="text-xs text-md-on-surface-variant hidden sm:inline-flex items-center gap-1">
//             <M3eIcon name="touch_app" aria-hidden="true" className="text-sm" />
//             Seed Color
//           </span>
//         </div>
//       </div>
// 
//       {/* Curated quick seed palette presets */}
//       <div>
//         <div className="mb-2 text-xs font-bold uppercase tracking-wider text-md-on-surface-variant">
//           Curated Seed Presets
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {PRESET_SEED_COLORS.map((preset) => {
//             const isSelected = value.toLowerCase() === preset.hex.toLowerCase();
//             return (
//               <button
//                 type="button"
//                 key={preset.hex}
//                 onClick={() => onChange(preset.hex)}
//                 className={`group relative flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all hover:scale-105 ${
//                   isSelected
//                     ? "border-md-primary bg-md-primary-container text-md-on-primary-container shadow-sm"
//                     : "border-md-outline-variant bg-md-surface-container hover:bg-md-surface-variant text-md-on-surface"
//                 }`}
//                 title={preset.name}
//               >
//                 <span
//                   className="size-3.5 rounded-full border border-black/10 shadow-xs"
//                   style={{ backgroundColor: preset.hex }}
//                 />
//                 <span>{preset.name}</span>
//                 {isSelected && (
//                   <M3eIcon
//                     name="check"
//                     className="text-xs"
//                     aria-hidden="true"
//                   />
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
