import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DropdownProps } from "@/types/DropdownProps";

export default function Dropdown({ label = "", options = [] }: DropdownProps) {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={label} />
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
