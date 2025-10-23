import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DropdownProps } from "@/types/DropdownProps";
import { Controller, Control } from "react-hook-form";

interface DropdownWithFormProps extends DropdownProps {
  name: string;
  control: Control<any>;
  rules?: {};
}

export default function Dropdown({
  placeholder = "",
  options = [],
  defaultValue = "",
  name,
  control,
  rules,
  disabled = false,
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
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
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
