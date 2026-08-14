import { createStore, useSelector } from "@tanstack/react-store";
import type { DefinedTheme } from "@astryxdesign/core";

interface ThemeState {
  mode: "dark" | "light";
  theme?: DefinedTheme;
}

export const themeStore = createStore<ThemeState>({
  mode: "dark",
});

export const useThemeStore = () => {
  const data = useSelector(themeStore, (state) => state);
  const setData = (data: ThemeState) =>
    themeStore.setState((state) => ({ ...state, ...data }));
  return [data, setData];
};
