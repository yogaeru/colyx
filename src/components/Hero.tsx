import { useEffect, useState } from "react";

import {
  Badge,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
} from "@astryxdesign/core";

import { Palette, SwatchBook, Upload, LucideBuilding2 } from "lucide-react";
import { cn } from "#/lib/cn";

const MATERIAL_YOU_SAMPLE = [
  { name: "Primary", hex: "#6750A4" },
  { name: "On primary", hex: "#FFFFFF" },
  { name: "Primary container", hex: "#EADDFF" },
  { name: "On primary container", hex: "#21005D" },
  { name: "Secondary", hex: "#625B71" },
  { name: "Tertiary", hex: "#7D5260" },
  { name: "Error", hex: "#B3261E" },
  { name: "Surface", hex: "#FEF7FF" },
  { name: "Surface variant", hex: "#E7E0EC" },
  { name: "Outline", hex: "#79747E" },
];

const BASE16_SAMPLE = [
  { name: "base00", hex: "#181818" },
  { name: "base01", hex: "#282828" },
  { name: "base02", hex: "#383838" },
  { name: "base03", hex: "#585858" },
  { name: "base04", hex: "#B8B8B8" },
  { name: "base05", hex: "#D8D8D8" },
  { name: "base06", hex: "#E8E8E8" },
  { name: "base07", hex: "#F8F8F8" },
  { name: "base08", hex: "#AB4642" },
  { name: "base09", hex: "#DC9656" },
  { name: "base0A", hex: "#F7CA88" },
  { name: "base0B", hex: "#A1B56C" },
  { name: "base0C", hex: "#86C1B9" },
  { name: "base0D", hex: "#7CAFC2" },
  { name: "base0E", hex: "#BA8BAF" },
  { name: "base0F", hex: "#A16946" },
];

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <span
      role="img"
      title={`${name} · ${hex}`}
      aria-label={`${name} ${hex}`}
      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-md"
      style={{ backgroundColor: hex }}
    />
  );
}

export default function Hero({ onStart }: { onStart: () => void }) {
  const [navBarHeight, setNavBarHeight] = useState(0);

  const asciiLogo = `
    ░█████╗░░█████╗░██╗░░░░░██╗░░░██╗██╗░░██╗
    ██╔══██╗██╔══██╗██║░░░░░╚██╗░██╔╝╚██╗██╔╝
    ██║░░╚═╝██║░░██║██║░░░░░░╚████╔╝░░╚███╔╝░
    ██║░░██╗██║░░██║██║░░░░░░░╚██╔╝░░░██╔██╗░
    ╚█████╔╝╚█████╔╝███████╗░░░██║░░░██╔╝╚██╗
    ░╚════╝░░╚════╝░╚══════╝░░░╚═╝░░░╚═╝░░╚═╝
    `;

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      setNavBarHeight(navbar.offsetHeight);
    }
  }, []);

  return (
    <section
      className={cn(
        "sticky z-0 overflow-hidden",
        "p-4",
      )}
      style={{
        top: navBarHeight,
        // border: "2px solid red"
      }}
    >
      <VStack
        gap={2}
        align="center"
        width="100%"
        style={{
          // border: "2px solid red",
        }}
      >
        <VStack gap={2} align="center" width="100%">
          <HStack gap={2} wrap="wrap" justify="center">
            <Badge
              label="Material You"
              variant="blue"
              icon={<Palette size={14} />}
            />
            <Badge
              label="base16"
              variant="purple"
              icon={<SwatchBook size={14} />}
            />
          </HStack>

          <Text
            className={cn(
              "scale-80 md:scale-100",
              "whitespace-pre-line text-balance",
              "font-mono",
            )}
            children={asciiLogo}
            as="p"
            color="accent"
            size="xsm"
          />

          <Heading
            level={1}
            type="display-2"
            justify="center"
            textWrap="balance"
            // className="text-center"
          >
            Turn any image into a Material You & base16 color palette
          </Heading>

          <Text
            type="body"
            color="secondary"
            justify="center"
            textWrap="balance"
            className="max-w-2xl"
          >
            Upload a photo and matugen extracts a full Material You palette and
            a base16 scheme from its dominant colors — in hex, rgb, or hsl.
            Perfect for theming wallpapers, apps, and terminals.
          </Text>
        </VStack>

        <VStack gap={3} hAlign="center" width="100%" className="max-w-xl">
          <VStack gap={1.5} hAlign="center" width="100%">
            <Text type="label" color="secondary">
              Material You palette
            </Text>
            <HStack
              gap={1.5}
              hAlign="center"
              wrap="wrap"
              width="100%"
              justify="center"
            >
              {MATERIAL_YOU_SAMPLE.map((c) => (
                <Swatch key={c.name} name={c.name} hex={c.hex} />
              ))}
            </HStack>
          </VStack>

          <VStack gap={1.5} hAlign="center" width="100%">
            <Badge
              label="Color Scheme"
              variant="pink"
              icon={<LucideBuilding2 size={14} />}
            />

            <HStack
              gap={1.5}
              hAlign="center"
              wrap="wrap"
              width="100%"
              justify="center"
            >
              {BASE16_SAMPLE.map((c) => (
                <Swatch key={c.name} name={c.name} hex={c.hex} />
              ))}
            </HStack>
          </VStack>
        </VStack>

        <Button
          label="Upload an image"
          variant="primary"
          size="lg"
          icon={<Upload size={18} />}
          onClick={onStart}
          className="w-full sm:w-auto"
        />
      </VStack>
    </section>
  );
}
