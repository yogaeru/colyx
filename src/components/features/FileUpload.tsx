import { useEffect, useRef, useState } from "react";
import { UploadCloudIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  imageRef?: React.Ref<HTMLImageElement | null>;
  className?: string;
  maxSize?: number; // in bytes
}

function FileUpload({
  imageRef,
  className,
  /** Maximum file size in bytes. default is 5MB */
  maxSize = 5 * 1024 * 1024,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onUploadClick = () => {
    inputRef.current?.click();
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.size > maxSize) {
      alert(`File size must not exceed ${maxSize / (1024 * 1024)}MB`);
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
  };

  return (
    <div className={cn("relative flex flex-col p-0 min-h-50", className)}>
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-center items-center",
          "h-full w-full border-dashed border-2 rounded-lg p-0",
          "cursor-pointer hover:bg-muted/50 transition-colors",
        )}
        onClick={onUploadClick}
      >
        {previewUrl ? (
          <img
            key={previewUrl}
            ref={imageRef}
            src={previewUrl}
            alt="Image preview"
            className="max-w-full object-cover rounded w-full h-full "
          />
        ) : (
          <>
            <UploadCloudIcon size={32} />
            <span className="text-sm text-muted-foreground font-bold">
              Upload An Image
            </span>
            <pre className="text-xs text-muted-foreground">
              Max {maxSize / (1024 * 1024)}MB, JPG, PNG, JPEG, WEBP
            </pre>
          </>
        )}
      </div>

      <Input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp, image/jpg"
        hidden
        onChange={onFileChange}
      />
    </div>
  );
}

export { FileUpload };
