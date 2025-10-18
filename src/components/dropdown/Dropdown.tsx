import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DropdownProps } from "@/types/DropdownProps";

export default function Dropdown({
  placeholder = "",
  options = [],
  defaultValue = "",
}: DropdownProps) {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem key={`${option?.value}-${index}`} value={option?.value}>
            {option?.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
