import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  onImageUpload: (image: string) => void;
  defaultImage?: string;
}

export function ImageUploader({
  onImageUpload,
  defaultImage,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | undefined>(defaultImage);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleFile = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      onImageUpload(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  return (
    <div
      className={`relative rounded-lg overflow-hidden transition-all ${
        isDragging ? "ring-2 ring-primary" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {preview ? (
        <div className="relative aspect-video bg-gray-50 rounded-lg flex items-center justify-center">
          <img
            src={preview}
            alt="Preview"
            className="max-w-full max-h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <label htmlFor="image-upload" className="cursor-pointer">
              <Button variant="secondary" size="sm">
                Change Image
              </Button>
            </label>
          </div>
        </div>
      ) : (
        <label
          htmlFor="image-upload"
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors flex flex-col items-center justify-center aspect-video"
        >
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            Drag and drop an image, or{" "}
            <span className="text-primary font-medium">browse</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Supports JPG, PNG and SVG
          </p>
        </label>
      )}
      <input
        id="image-upload"
        type="file"
        className="hidden"
        onChange={handleImageChange}
        accept="image/*"
      />
    </div>
  );
}
