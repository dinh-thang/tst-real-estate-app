export interface InputProps {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  defaultValue?: string; 
  className?: string;
  name?: string;
  ref?: React.Ref<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  className,
  name,
  ref
} : InputProps) => {
  return (
    <input
      type={"text"}
      id={label}
      name={name}
      value={value}
      onChange={onChange}
      className={`border text-sm w-full bg-white border-gray-200 rounded p-2 ${className}`}
      placeholder={placeholder}
      ref={ref}
    />
  );
}

export default Input;