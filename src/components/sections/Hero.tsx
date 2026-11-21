import { UploadIcon, PaletteIcon, PaintRollerIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TEXT_ASCII = `
░█████╗░░█████╗░██╗░░░░░██╗░░░██╗██╗░░██╗
██╔══██╗██╔══██╗██║░░░░░╚██╗░██╔╝╚██╗██╔╝
██║░░╚═╝██║░░██║██║░░░░░░╚████╔╝░░╚███╔╝░
██║░░██╗██║░░██║██║░░░░░░░╚██╔╝░░░██╔██╗░
╚█████╔╝╚█████╔╝███████╗░░░██║░░░██╔╝╚██╗
░╚════╝░░╚════╝░╚══════╝░░░╚═╝░░░╚═╝░░╚═╝
`;

export function Hero() {
  return (
    <section
      className="bg-background bg-grid relative z-1 lg:sticky lg:top-0"
    >
      <div
        className={cn(
          "grid grid-cols-1 items-center gap-12 mx-5 md:mx-20 xl:mx-40 min-h-[95dvh] lg:grid-cols-2 lg:gap-10",
          "px-3 py-16 lg:py-20",
        )}
      >
        <div className="flex min-w-0 flex-col justify-center">
          <div className="flex flex-wrap gap-3 py-1">
            <Badge variant="default">
              <PaletteIcon className="w-4 h-4" />
              Material You
            </Badge>
            <Badge variant="secondary">
              <PaintRollerIcon className="w-4 h-4" />
              Color Generator
            </Badge>
          </div>

          <pre
            aria-hidden="true"
            className="whitespace-pre text-[clamp(0.45rem,1.4vw,0.75rem)] text-primary"
          >
            {TEXT_ASCII}
          </pre>
          <h1 className="max-w-[16ch] text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-3xl xl:text-4xl">
            Turn Any Image Into Material You Palette
          </h1>
          <p className="mt-2 max-w-[48ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Find the colors hiding in your favorite images. Create a harmonious
            Material You palette and make your next idea feel uniquely yours.
          </p>

          <Button
            className="px-5 mt-5 w-fit"
            onClick={() => {
              document.getElementById("content")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            <UploadIcon size={12} />
            Upload an Image
          </Button>
        </div>
      </div>
    </section>
  );
}
