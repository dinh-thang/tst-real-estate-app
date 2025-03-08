import { ButtonProps } from "./PrimaryButton";

const GhostButton = ({ children, onClick, className } : ButtonProps) => {
  return (
    <button 
      className={`bg-transparent text-white hover:text-blue-500 flex items-center justify-center rounded-md p-2 hover:bg-white ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default GhostButton;