import { useSelector } from "@tanstack/react-store";
import { Theme, useTheme } from "@astryxdesign/core";

import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import Navbar from "#/components/Navbar";

import { themeStore } from "#/data/theme";
import { defaultTheme } from "#/themes/default/default";
import "#/themes/default/default.css";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootContainer({ children }: { children: React.ReactNode }) {
  const { tokens } = useTheme();
  const bgColor = tokens["--color-background-body"];

  return (
    <div className="w-full min-h-dvh" style={{ backgroundColor: bgColor }}>
      {children}
    </div>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const themeState = useSelector(themeStore, (s) => s);
  const theme = themeState.theme ?? defaultTheme;
  const themeMode = themeState.mode ?? "dark";

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Theme
          theme={theme}
          mode={themeMode}
        >
          <RootContainer>
            <Navbar />
            {children}
          </RootContainer>
        </Theme>
        
        
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
