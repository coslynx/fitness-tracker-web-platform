import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children }) => (
  <div
    className={`bg-white rounded-md shadow-md p-4 ${className}`}
  >
    {children}
  </div>
);

export default Card;