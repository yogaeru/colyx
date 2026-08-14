import {
  unwrap,
  extractColors,
  getSourceColors,
  renderTemplate,
  renderFromImage,
} from "./index";

console.time("start time")
const data = unwrap(
  await renderFromImage({
    source: {
      type: "image",
      path: "/mnt/sharing/abc/tanstack/new/appv1/src/1.png",
    },
    source_color_index: 0,
    scheme_type: "scheme-tonal-spot",
    template: {
      input_string: `
      .dark{     
      <* for name, value in colors *>
          --{{name}} {{value.dark.hex}};
      <* endfor *>
      }

      .light {
      <* for name, value in colors *>
          --{{name}} {{value.light.hex}};
      <* endfor *>
      }
      ` ,
      mode: "dark"
    }
  }),
);

// const

console.log(data.rendered);
console.timeEnd("start time")