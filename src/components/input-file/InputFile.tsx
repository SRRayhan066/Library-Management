"use client";

import { InputFileProps } from "@/types/InputFileProps";
import { Input } from "../ui/input";
import { IconPhotoPlus } from "@tabler/icons-react";
import { useRef } from "react";
import { VariantType } from "@/constant/enum/VariantType";

export default function InputFile({
  variant = VariantType.PRIMARY,
  description,
}: InputFileProps) {
  const ref = useRef<HTMLInputElement>(null);
  const handleUpload = () => {
    ref.current?.click();
  };
  return (
    <div className={`w-full h-full`}>
      <div
        onClick={handleUpload}
        className={`relative w-full h-full border-1 border-dashed border-gray-300 ${
          variant === VariantType.PRIMARY ? "rounded-lg" : `rounded-[50%]`
        } flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors overflow-hidden`}
      >
        <div className="flex flex-col items-center gap-1">
          <IconPhotoPlus className="text-gray-300" />
          <p className="text-sm text-gray-300">{description}</p>
        </div>
      </div>
      <Input className="hidden" type="file" ref={ref} />
    </div>
  );
}
