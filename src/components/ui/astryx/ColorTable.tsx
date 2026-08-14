import { useEffect, useState } from "react";
import {
  Table,
  Divider,
  CodeBlock,
  Heading,
  HStack,
  Selector,
} from "@astryxdesign/core";
import type { ExtractColorsSuccess } from "@/lib/matugen";
import { materialYouColors, base16Colors } from "@/data/color";

interface ColorTableProps {
  data: Array<ExtractColorsSuccess | null>;
}

interface ColorRow {
  key: string;
  description: string;
  color: [string, string];
  [k: string]: unknown; // required so ColorRow satisfies Record<string, unknown>
}

interface TableCell {
  base16: ColorRow[];
  colors: ColorRow[];
}

function ColorSwatch({ colors }: { colors: [string, string] }) {
  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      {colors.map((color, index) => (
        <span key={index} className="flex items-center gap-1">
          <div
            className="shrink-0 w-5 h-5 md:w-6.5 md:h-6.5 lg:w-8 lg:h-8"
            style={{
              borderRadius: 4,
              border: "1px solid black",
              backgroundColor: color,
            }}
          />
          {color}
        </span>
      ))}
    </div>
  );
}

function buildColorCell(data: ExtractColorsSuccess): TableCell {
  const { base16, colors } = data;

  const base16Cell: ColorRow[] = Object.entries(base16Colors).map(
    ([token, desc]) => {
      const lightColor =
        base16?.light[token as keyof typeof base16Colors] || "";
      const darkColor = base16?.dark[token as keyof typeof base16Colors] || "";
      return {
        key: token,
        description: desc,
        color: [lightColor, darkColor],
      };
    },
  );

  const colorsCell: ColorRow[] = Object.entries(materialYouColors).map(
    ([token, desc]) => {
      const lightColor = colors?.light[token as keyof typeof colors] || "";
      const darkColor = colors?.dark[token as keyof typeof colors] || "";
      return {
        key: token,
        description: desc,
        color: [lightColor, darkColor],
      };
    },
  );

  return {
    base16: base16Cell,
    colors: colorsCell,
  };
}

export default function ColorTable({ data }: ColorTableProps) {
  if (!data) return;
  const [tableCell, setTableCell] = useState<TableCell | null>(null);
  const [activeTab, setActiveTab] = useState("colors");
  const [activeView, setActiveView] = useState("table");
  const [sourceColor, setSourceColor] = useState<string>("");
  const [activePallete, setActivePallete] =
    useState<ExtractColorsSuccess | null>(null);

  const sourceColorList = data
    .map((item) => {
      if (!item?.source_color) return null;
      return {
        value: item?.source_color,
        label: item?.source_color,
      };
    })
    .filter(Boolean) as { value: string; label: string }[];

  useEffect(() => {
    const initialColor = data[0]?.source_color;
    if (initialColor) setSourceColor(initialColor);
  }, [data]);

  useEffect(() => {
    const index = data.findIndex((item) => item?.source_color === sourceColor);
    const pallete = data[index];
    if (pallete) {
      const tableCell = buildColorCell(pallete);
      setTableCell(tableCell);
      setActivePallete(pallete);
    }
  }, [sourceColor, data]);

  return (
    <>
      <Divider label="Colors Table" />

      <Heading
        className="self-start"
        level={2}
        children={
          <HStack gap={2} align="center">
            <span>Active Color: </span>
            <div
              className="w-10 h-5 md:w-14 md:h-7 rounded-sm"
              style={{
                backgroundColor: sourceColor,
                // border: "1px solid white",
              }}
            />
            <span>{sourceColor}</span>
          </HStack>
        }
      />

      <HStack gap={4} className="w-full">
        <Selector
          label="Source colors"
          value={sourceColor}
          onChange={setSourceColor}
          options={sourceColorList}
          width="100%"
          size="lg"
          renderOption={(value) => {
            return (
              <HStack gap={2} align="center">
                <div
                  className="w-5 h-5"
                  style={{
                    backgroundColor: value.value,
                  }}
                />
                <span>{value.label}</span>
              </HStack>
            );
          }}
        />

        <Selector
          label="Type"
          value={activeTab}
          onChange={setActiveTab}
          options={[
            { value: "colors", label: "Material You" },
            { value: "base16", label: "Base16" },
          ]}
          size="lg"
          width="100%"
        />

        <Selector
          label="View"
          value={activeView}
          onChange={setActiveView}
          options={[
            { value: "table", label: "Table" },
            { value: "code", label: "Code" },
          ]}
          size="lg"
          width="100%"
        />
      </HStack>

      {/*Code View*/}
      {activeView === "code" && (
        <CodeBlock
          width="100%"
          code={JSON.stringify(
            activeTab === "colors"
              ? activePallete?.colors
              : activePallete?.base16,
            null,
            2,
          )}
          language="json"
          title="template.json"
          hasLineNumbers
        />
      )}

      {/*Table View*/}
      {activeView === "table" && (
        <Table
          data={activeTab === "colors" ? tableCell?.colors : tableCell?.base16}
          columns={[
            {
              key: "key",
              header: "Key",
              renderCell: (row: ColorRow) => (
                <span style={{ fontFamily: "monospace" }}>{row.key}</span>
              ),
            },
            {
              key: "description",
              header: "Description",
              renderCell: (row: ColorRow) => <span>{row.description}</span>,
            },
            {
              key: "color",
              header: "Light/Dark",
              renderCell: (row: ColorRow) => <ColorSwatch colors={row.color} />,
            },
          ]}
          density="compact"
          isStriped
        />
      )}
    </>
  );
}
