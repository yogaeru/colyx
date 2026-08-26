export function templateCss(type: string = "") {
  return [
    "<* for name, value in colors *>",
    `  @define-color {{name}} {{value.default.${type ? type : "hex"}}};`,
    "<* endfor *>",
  ].join("\n");
}
