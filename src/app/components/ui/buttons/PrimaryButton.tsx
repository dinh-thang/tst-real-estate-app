export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const PrimaryButton: React.FC<ButtonProps> = ({ children, onClick, type, className } : ButtonProps) => {
  return (
    <button 
      onClick={onClick}
      type={type}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  )
}

export default PrimaryButton;