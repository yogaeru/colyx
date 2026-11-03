import { cn } from "cn";
import { useTheme } from "../hooks/useTheme";
import { M3eIcon } from "@m3e/react/icon";

export default function Navbar() {
  const { theme, changeTheme } = useTheme();

  const icon = theme.scheme === "dark" ? "bedtime" : "sunny";

  return (
    <nav
      id="navbar"
      className={cn(
        "flex flex-row justify-start",
        "bg-md-background/10 backdrop-blur-xl",
        "border-b-1 border-md-outline-variant",
        "sticky top-0 z-1000",
      )}
    >
      <div className="flex flex-row justify-between w-full h-full section border-0 border-b-0 py-3 px-5">
        <a href="/" className="">
          <span className="font-bold">SVAELA</span>
        </a>

        <span className="text-xs">
          <M3eIcon
            name={icon}
            onClick={() => {
              changeTheme("scheme", theme.scheme === "dark" ? "light" : "dark");
            }}
          />
        </span>
      </div>
    </nav>
  );
}
