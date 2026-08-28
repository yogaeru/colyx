import { z } from "zod";
import sharp from "sharp";
import { createServerFn } from "@tanstack/react-start";

import { renderFromImage } from "@/lib/matugen";

const RenderTemplateSchema = z.object({
  image: z.instanceof(File),
  template: z.string(),
});

export const renderTemplateFn = createServerFn({ method: "POST" })
  .validator((data: FormData) => {
    return RenderTemplateSchema.parse(Object.fromEntries(data));
  })
  .handler(async ({ data }) => {
    // console.log(data);

    const { image, template } = data;
    console.log("TEMPLATE", template);

    const resized = await sharp(await image.arrayBuffer())
      .resize({ width: 240 })
      .jpeg({ quality: 70 })
      .toBuffer();
    const base64 = resized.toString("base64");

    const color = await renderFromImage({
      source_color_index: 0,
      source: {
        type: "imagebytes",
        data_base64: base64,
      },
      template: {
        input_string: template,
        mode: "dark",
      },
    });

    // console.log("COLOR", color);
    if (color.ok) {
      console.log("COLORS RENDERED TEMPLATE", color?.rendered);
      return color.rendered;
    } else {
      return color.error;
    }
  });
