import { createContext, useContext, useState } from "react";
import type {
  ColorExtractionMode,
  ColorFormat,
  MaterialSchemeVariant,
} from "svaela";

interface OptionsProps {
  schemeVariant: MaterialSchemeVariant;
  extractionMode: ColorExtractionMode;
  colorOutput: ColorFormat;
  contrastLevel: number;
  paletteSize: number;
}

interface OptionsContextProps {
  options: OptionsProps;
  setOptions: React.Dispatch<React.SetStateAction<OptionsProps>>;
}

const OptionsContext = createContext<OptionsContextProps | null>(null);

function OptionsProvider({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useState<OptionsProps>({
    colorOutput: "hex",
    contrastLevel: 0,
    extractionMode: "dominant",
    schemeVariant: "content",
    paletteSize: 3,
  });

  return (
    <OptionsContext.Provider value={{ options, setOptions }}>
      {children}
    </OptionsContext.Provider>
  );
}

function useOptions() {
  const context = useContext(OptionsContext);
  if (!context) {
    throw new Error("useOptions must be used within an OptionsProvider");
  }
  return context;
}

export { OptionsContext, OptionsProvider, useOptions };
