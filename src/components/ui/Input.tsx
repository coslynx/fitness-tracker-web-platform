import React, { useState, ChangeEvent } from 'react';

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled,
}) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="form-group">
      <label htmlFor={label} className="form-label">
        {label}
      </label>
      <input
        type={type}
        id={label}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 ${
          error ? 'border-red-500 focus:ring-red-500' : ''
        } ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
        disabled={disabled}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;