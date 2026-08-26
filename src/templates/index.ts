import { templateCss } from "./apps/css";
import { templateDiscord } from "./apps/discord";
import { templateSpicetify } from "./apps/spicetify";
import { templateWinterm } from "./apps/winterm";
import { templateYazi } from "./apps/yazi";
import { templateZed } from "./apps/zed";

export * from "./apps/css";
export * from "./apps/discord";
export * from "./apps/spicetify";
export * from "./apps/winterm";
export * from "./apps/yazi";
export * from "./apps/zed";

export const templates = {
  css: templateCss,
  discord: templateDiscord,
  spicetify: templateSpicetify,
  winterm: templateWinterm,
  yazi: templateYazi,
  zed: templateZed,
};

export const appsList = Object.keys(templates) as TemplateName[];

export type TemplateName = keyof typeof templates;
export type TemplateFunction = (typeof templates)[TemplateName];
