"use client";

import { Label } from "@/components/ui/label";
import { DropdownFieldProps } from "@/types/DropdownProps";
import Dropdown from "../dropdown/Dropdown";
import { useForm } from "react-hook-form";

export default function DropdownField({
  label,
  required = false,
  className,
  id,
  description,
  error,
  options,
  placeholder,
}: DropdownFieldProps) {
  const fieldId = id || label?.toLowerCase().replace(/\s+/g, "-");
  const { control } = useForm({
    mode: "onChange",
  });
  return (
    <div className={`w-full space-y-1 ${className}`}>
      {label && (
        <Label htmlFor={fieldId} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Dropdown
        name="genre"
        control={control}
        placeholder={placeholder}
        options={options}
      />
      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : description ? (
        <p className="text-sm text-gray-500">{description}</p>
      ) : null}
    </div>
  );
}
