import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const config = defineConfig(({ command }) => {
  return {
    resolve: { tsconfigPaths: true },
    build: {
      rolldownOptions: {
        external: ["koffi", "sharp"],
      },
    },
    plugins: [
      devtools(),
      tailwindcss(),
      ...(command === "build"
        ? [
            nitro(),
          ]
        : []),
      tanstackStart(),
      viteReact(),
    ],
  };
});

export default config;
