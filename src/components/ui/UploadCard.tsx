import { useRef, useState } from "react";
import { M3eButton } from "@m3e/react/button";
import { M3eIcon } from "@m3e/react/icon";
import { M3eShape } from "@m3e/react/shape";

interface UploadCardProps {
  file: File | null;
  previewUrl: string | null;
  onFile: (file: File) => void;
  onRemove?: () => void;
}

export default function UploadCard({
  file,
  previewUrl,
  onFile,
  onRemove,
}: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const acceptFile = (candidate: File | undefined) => {
    if (candidate && candidate.type.startsWith("image/")) {
      onFile(candidate);
    }
  };


  return (
    <div className="flex flex-col gap-3">
      <div
        className={`group relative isolate flex min-h-[300px] items-center justify-center overflow-hidden rounded-[12px] border-2 border-dashed border-md-outline-variant bg-md-surface-container-low transition-all duration-300 sm:min-h-[360px] ${
          isDragging
            ? "scale-[1.01] border-md-primary bg-md-primary-container/20 ring-4 ring-md-primary/20"
            : ""
        } ${previewUrl ? "border-solid border-md-outline" : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          acceptFile(event.dataTransfer.files[0]);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(event) => acceptFile(event.target.files?.[0])}
        />

        {previewUrl ? (
          <>
            <img
              className="absolute inset-0 size-full object-cover"
              src={previewUrl}
              alt={file?.name ?? "Selected cover"}
            />

            <div
              className="absolute inset-0 bg-md-scrim/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-wrap items-center justify-center gap-2.5 px-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
              <M3eButton
                size="small"
                shape="rounded"
                variant="outlined"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-black/60 px-4 py-2 text-sm font-bold text-white backdrop-blur-md transition hover:bg-black/80"
                onClick={() => inputRef.current?.click()}
              >
                <M3eIcon name="upload" aria-hidden="true" />
                Change Image
              </M3eButton>

              {onRemove && (
                <M3eButton
                  size="small"
                  shape="square"
                  variant="filled"
                  className="inline-flex items-center gap-1.5 rounded-full bg-md-error px-4 py-2 text-sm font-bold text-md-on-error transition hover:opacity-90"
                  onClick={onRemove}
                >
                  <M3eIcon name="close" aria-hidden="true" />
                  Remove
                </M3eButton>
              )}
            </div>

            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold tracking-normal text-white backdrop-blur-md">
              <M3eIcon name="image" className="text-sm" aria-hidden="true" />
              <span className="max-w-[200px] truncate">
                {file?.name ?? "Extracted Image"}
              </span>
            </div>
          </>
        ) : (
          <div className="relative z-10 grid justify-items-center gap-4 px-6 py-8 text-center">
            <M3eShape
              name="puffy"
              className="grid size-16 place-items-center rounded-full bg-md-primary-container text-3xl text-md-on-primary-container shadow-sm transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            >
              <M3eIcon name="add_photo_alternate" aria-hidden="true" />
            </M3eShape>

            <div className="grid max-w-md gap-2">
              <h3 className="text-lg font-extrabold leading-7 tracking-normal text-md-on-surface sm:text-xl sm:leading-8">
                Upload or Drop an Image
              </h3>

              <p className="text-sm font-medium leading-6 text-md-on-surface-variant sm:text-base sm:leading-7">
                Extract colors directly from photos, brand assets, or artwork.
              </p>

              <p className="text-xs font-semibold leading-5 text-md-on-surface-variant/80 sm:text-sm">
                Supports PNG, JPG, WebP, SVG · Up to 10MB
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <M3eButton
                size="small"
                shape="square"
                variant="filled"
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold"
                onClick={() => inputRef.current?.click()}
              >
                <M3eIcon name="folder_open" aria-hidden="true" />
                Browse Files
              </M3eButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
