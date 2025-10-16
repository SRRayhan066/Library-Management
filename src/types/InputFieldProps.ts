export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  type?: "input" | "textarea";
  required?: boolean;
  description?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}
