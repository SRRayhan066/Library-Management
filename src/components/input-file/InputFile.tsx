"use client";

import { Input } from "../ui/input";
import { IconPhotoPlus } from "@tabler/icons-react";
import { useRef } from "react";

export default function InputFile() {
  const ref = useRef<HTMLInputElement>(null);
  const handleUpload = () => {
    ref.current?.click();
  };
  return (
    <div className="w-full">
      <div
        onClick={handleUpload}
        className="relative w-full h-64 border-1 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors overflow-hidden"
      >
        <div className="flex flex-col items-center gap-1">
          <IconPhotoPlus className="text-gray-300" />
          <p className="text-sm text-gray-300">Upload cover image</p>
        </div>
      </div>
      <Input className="hidden" type="file" ref={ref} />
    </div>
  );
}
