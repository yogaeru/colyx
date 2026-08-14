import { z } from "zod";
import sharp from "sharp";
import { createServerFn } from "@tanstack/react-start";

import { extractColors } from "#/lib/matugen";
import type { ColorOutputFormat, SchemeType } from "#/lib/matugen/types";

const extractColorsSchema = z.object({
  image: z.instanceof(File),
  colorFormat: z.string(),
  schemeType: z.string(),
});

export type ExtractColorsRequest = z.infer<typeof extractColorsSchema>;

export const extractColorsFn = createServerFn({ method: "POST" })
  .validator((data: FormData) => {
    return extractColorsSchema.parse(Object.fromEntries(data));
  })
  .handler(async ({ data }) => {
    const { image, colorFormat, schemeType } = data;
    const resized = await sharp(await image.arrayBuffer())
      .resize({ width: 240 })
      .jpeg({ quality: 70 })
      .toBuffer();
    const base64 = resized.toString("base64");

    const colors = (
      await Promise.all(
        [0, 1, 2, 3].map(async (index) => {
          const result = await extractColors({
            source: {
              type: "imagebytes",
              data_base64: base64,
            },
            source_color_index: index,
            color_format: colorFormat as ColorOutputFormat,
            scheme_type: schemeType as SchemeType,
          });
          return result.ok ? result : null;
        }),
      )
    ).filter(Boolean);

    // console.log({
    //   colors,
    //   data
    // })

    return colors;
  });
