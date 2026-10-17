"use client";

import { useState } from "react";
import {
  useFileUpload,
  // type FileMetadata,
  type FileWithPreview,
} from "@/hooks/use-file-upload";
import { Alert, AlertDescription, AlertTitle } from "@/components/reui/alert";

import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  ImageIcon,
  UploadIcon,
  XIcon,
  CloudUploadIcon,
  CircleAlertIcon,
} from "lucide-react";

interface CoverUploadProps {
  maxSize?: number;
  accept?: string;
  className?: string;
  onImageChange?: (file: File | null) => void;
  setShowOptions?: () => void;
  onImageRef?: (element: HTMLImageElement | null) => void;
}

export function Pattern({
  maxSize = 5 * 1024 * 1024, // 5MB default
  accept = "image/*",
  className,
  onImageChange,
  setShowOptions,
  onImageRef,
}: CoverUploadProps) {
  const [coverImage, setCoverImage] = useState<FileWithPreview | null>(null);

  const [imageLoading, setImageLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [
    { isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles: 1,
    maxSize,
    accept,
    multiple: false,
    onFilesChange: (files) => {
      if (files.length > 0) {
        setImageLoading(true);
        // setIsUploading(true);
        setUploadProgress(0);
        setUploadError(null);
        setCoverImage(files[0]);
        onImageChange?.(files[0].file as File);
        setShowOptions?.();

        // Simulate upload progress
        // simulateUpload();
      }
    },
  });

  // Simulate upload progress
  const simulateUpload = () => {
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          // Simulate occasional upload failure (10% chance)
          if (Math.random() < 0.0) {
            setUploadError("Upload failed. Please try again.");
            return 0;
          }

          return 100;
        }

        // Random progress increment between 5-15%
        const increment = Math.random() * 10 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 200);
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setImageLoading(false);
    setIsUploading(false);
    setUploadProgress(0);
    setUploadError(null);
    onImageChange?.(null);
  };

  const retryUpload = () => {
    if (coverImage) {
      setUploadError(null);
      setIsUploading(true);
      setUploadProgress(0);
      simulateUpload();
    }
  };

  const hasImage = coverImage && coverImage.preview;

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Cover Upload Area */}
      <div
        className={cn(
          "group border-border  relative overflow-hidden border transition-all duration-200",
          isDragging
            ? "border-primary bg-primary/5 border-dashed"
            : hasImage
              ? "border-border bg-background hover:border-primary/50"
              : "border-muted-foreground/25 bg-muted/30 hover:border-primary hover:bg-primary/5 border-dashed",
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Hidden file input */}
        <input {...getInputProps()} className="sr-only" />

        {hasImage ? (
          <>
            {/* Cover Image Display */}
            <div className="relative h-40 sm:h-50 md:70 lg:h-100 w-full">
              {/* Loading placeholder */}
              {imageLoading && (
                <div className="bg-muted absolute inset-0 flex animate-pulse items-center justify-center">
                  <div className="text-muted-foreground flex flex-col items-center gap-2">
                    <ImageIcon className="size-5" />
                    <span className="text-sm">Loading image...</span>
                  </div>
                </div>
              )}

              {/* Actual image */}
              <img
                ref={onImageRef}
                src={coverImage.preview}
                alt="Cover"
                className={cn(
                  "h-full w-full object-cover object-center transition-opacity duration-300",
                  imageLoading ? "opacity-0" : "opacity-100",
                )}
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 transition-all duration-200 group-hover:bg-black/40" />

              {/* Action buttons overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="flex gap-2">
                  <Button onClick={openFileDialog} size="sm" variant="outline">
                    <UploadIcon />
                    Change Cover
                  </Button>
                  <Button onClick={removeCoverImage} size="sm">
                    <XIcon />
                    Remove
                  </Button>
                </div>
              </div>

              {/* Upload progress */}
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="relative">
                    <svg className="size-16 -rotate-90" viewBox="0 0 64 64">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-white/20"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - uploadProgress / 100)}`}
                        className="text-white transition-all duration-300"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {Math.round(uploadProgress)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Empty State */
          <div
            className="flex h-45 sm:h-50 md:60 lg:h-70 w-full cursor-pointer flex-col items-center justify-center gap-1 md:gap-4 p-8 text-center"
            onClick={openFileDialog}
          >
            <div className="bg-primary/10 rounded-full p-3 sm:p-4">
              <CloudUploadIcon className="text-primary size-4" />
            </div>

            <div className="space-y-0">
              <h3 className="text-md md:text-lg font-semibold">
                Upload an Image
              </h3>
              <p className="text-muted-foreground text-sm">
                Drag and drop an image here, or click to browse
              </p>
              {/*<p className="text-muted-foreground text-sm">
                Upload image here or click to browse
              </p>*/}
              <p className="text-muted-foreground text-xs">Max size: 10MB</p>
            </div>

            <Button variant="outline" size="xs">
              <ImageIcon />
              Browse Files
            </Button>
          </div>
        )}
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive" className="mt-5">
          <CircleAlertIcon />
          <AlertTitle>File upload error(s)</AlertTitle>
          <AlertDescription>
            {errors.map((error, index) => (
              <p key={index} className="last:mb-0">
                {error}
              </p>
            ))}
          </AlertDescription>
        </Alert>
      )}

      {/* Upload Error */}
      {uploadError && (
        <Alert variant="destructive" className="mt-5">
          <CircleAlertIcon />
          <AlertTitle>Upload failed</AlertTitle>
          <AlertDescription>
            <p>{uploadError}</p>
            <Button onClick={retryUpload} size="sm">
              Retry Upload
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
