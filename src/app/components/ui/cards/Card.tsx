export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  key?: number;
}


const Card: React.FC<CardProps> = ({ children, className, key }) => {
  return (
    <div 
      key={key}
      className={`flex flex-col bg-gray-100 rounded-lg border-1 border-gray-200 p-4 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;