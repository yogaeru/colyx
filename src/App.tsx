import { Hero } from "./components/sections/Hero";
import { PaletteConfig } from "./components/sections/PaletteConfig";

export default function App() {
  return (
    <>
      <main>
        <Hero />
        <PaletteConfig />
      </main>

      <footer className="p-2 bg-card">
        <div className="flex justify-center gap-2">
          <span>Made by yogaeru with ❣️</span>
        </div>
      </footer>
    </>
  );
}
