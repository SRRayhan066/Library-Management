interface OptionType {
  label: string;
  value: string;
}

export interface DropdownProps {
  placeholder: string;
  options: OptionType[];
}

export interface DropdownFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  description?: string;
  error?: string;
  options: OptionType[];
  placeholder: string;
}
