import { useSelector } from "@tanstack/react-store";
import {
  TopNav,
  TopNavHeading,
  TopNavItem,
  Icon,
  NavIcon,
  Button,
  useTheme,
} from "@astryxdesign/core";
import { Moon, Sun, Cuboid } from "lucide-react";

import { cn } from "#/lib/cn";
import { themeStore } from "#/data/theme";

export default function Navbar() {
  const { tokens } = useTheme();
  const themeMode = useSelector(themeStore, (s) => s.mode);

  return (
    <TopNav
      id="navbar"
      className={cn("sticky top-0 z-100", "backdrop-blur-lg")}

      style={{
        // backgroundColor: tokens["--color-background-card"],
        // opacity: 0.9,
        backgroundColor: `color-mix(in srgb, ${tokens["--color-background-card"]} 0%, transparent)`,
      }}

      label="Main navigation"

      heading={
        <TopNavHeading
          heading="Colyx"
          logo={<NavIcon icon={<Icon icon={Cuboid} size="sm" />} />}
          headingHref="#"
        />
      }
      centerContent={
        <>
          <TopNavItem label="HOME" href="/" isSelected />
          <TopNavItem label="SEE" href="/see" />
        </>
      }
      endContent={
        <Button
          label="Profile"
          variant="ghost"
          icon={themeMode === "dark" ? <Moon /> : <Sun />}
          onClick={() => {
            themeStore.setState((s) => ({
              ...s,
              mode: themeMode === "dark" ? "light" : "dark",
            }));
          }}
          isIconOnly
        />
      }
    />
  );
}
