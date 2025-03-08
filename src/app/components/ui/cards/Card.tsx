export interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div 
      className={`flex flex-col bg-gray-100 rounded-lg border border-gray-200 p-4 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
