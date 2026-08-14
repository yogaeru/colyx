import { useEffect } from "react";
import { FileInput, Divider, VStack } from "@astryxdesign/core";
import { cn } from "#/lib/cn";

interface FileInputProps {
  value: File | File[] | null;
  onChange: (value: File | File[] | null) => void;
  preview: string | null;
  onPreviewChange: (preview: string | null) => void;
}

export default function AstryxFileInput({
  value,
  onChange,
  preview,
  onPreviewChange,
}: FileInputProps) {
  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      onPreviewChange(url);
      return () => URL.revokeObjectURL(url);
    }
    onPreviewChange("");
  }, [value]);

  return (
    <VStack className={cn("w-full")} gap={4} hAlign="center">
      <FileInput
        className="h-25 md:h-35 lg:h-45"
        width="100%"
        label="Upload Image"
        value={null}
        onChange={onChange}
        mode="dropzone"
        accept=".png,.jpg,.jpeg,.webp"
        description="PNG, JPG, or JPEG image, up to 5 MB"
        maxSize={5 * 1024 * 1024}
       
      />
      {preview && (
        <>
          <Divider
            label={(!Array.isArray(value) && value?.name) ?? "Preview"}
          />
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover"
            style={{
              width: "100%",
              maxHeight: 400,
              objectFit: "contain",
              borderRadius: 8,
            }}
          />
        </>
      )}
    </VStack>
  );
}
