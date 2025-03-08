import { ButtonProps } from "./PrimaryButton";

const SecondaryButton = ({ children, onClick, className } : ButtonProps) => {
  return (
    <button 
      className={`bg-white text-blue-500 flex items-center justify-center rounded-md p-2 hover:bg-gray-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;