import React, { useState, useEffect } from 'react';

interface SelectProps<T> {
  label: string;
  options: T[];
  value: T | null;
  onChange: (value: T | null) => void;
  placeholder?: string;
}

const Select: React.FC<SelectProps<any>> = ({ label, options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(value);

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: any) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="form-group">
      <label htmlFor={label} className="form-label">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 w-full"
          onClick={handleClick}
        >
          {selectedOption ? selectedOption : placeholder}
          <span className="absolute inset-y-0 right-3 flex items-center pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        {isOpen && (
          <ul className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-white border border-gray-300">
            {options.map((option: any) => (
              <li
                key={option}
                className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                onClick={() => handleSelectOption(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;