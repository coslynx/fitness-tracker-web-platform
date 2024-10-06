import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled,
  children,
}) => {
  const buttonClasses = `rounded-md px-4 py-2 font-medium text-white transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
    disabled
      ? 'cursor-not-allowed opacity-50'
      : 'hover:brightness-90'
  } ${
    variant === 'primary'
      ? 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300'
      : variant === 'secondary'
      ? 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-300'
      : variant === 'tertiary'
      ? 'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-100 focus:ring-gray-200'
      : ''
  } ${
    size === 'sm'
      ? 'text-sm py-2 px-3'
      : size === 'md'
      ? 'text-base py-2 px-4'
      : size === 'lg'
      ? 'text-lg py-3 px-6'
      : ''
  } ${className}`;

  return (
    <button type="button" className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;