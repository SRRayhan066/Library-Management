import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DropdownProps } from "@/types/DropdownProps";
import { Controller, Control } from "react-hook-form";
import { Spinner } from "../ui/spinner";
import { ChevronDown } from "lucide-react";

interface DropdownWithFormProps extends DropdownProps {
  name: string;
  control: Control<any>;
  rules?: {};
  loading?: boolean;
}

export default function Dropdown({
  placeholder = "",
  options = [],
  defaultValue = "",
  name,
  control,
  rules,
  disabled = false,
  loading = false,
}: DropdownWithFormProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Select
          onValueChange={field.onChange}
          value={field.value}
          disabled={disabled}
        >
          <SelectTrigger className="w-full relative [&>svg]:hidden">
            <SelectValue placeholder={placeholder} />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
              {loading ? (
                <Spinner className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4 opacity-50" />
              )}
            </div>
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => (
              <SelectItem
                key={`${option?.value}-${index}`}
                value={option?.value}
              >
                {option?.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}
