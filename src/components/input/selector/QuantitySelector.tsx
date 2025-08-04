'use client';
import * as React from 'react';
import { useState } from 'react';

interface QuantitySelectorProps {
  label: string;
  defaultValue?: number;
  options?: number[];
  onChange?: (value: number) => void;
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  label,
  defaultValue = 4,
  options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  onChange,
  className = '',
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: number) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange?.(value);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className={`flex flex-col items-start ${className}`}>
      <label className="text-base font-bold text-teal-900 mb-2">{label}</label>

      <div className="relative w-full max-w-[334px]">
        <button
          type="button"
          className="flex justify-between items-center px-6 py-5 w-full text-base text-black bg-white rounded-lg shadow-[0px_4px_14px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span>{selectedValue}</span>
          <img
            src="https://api.builder.io/api/v1/image/assets/d15ccaa318ae47d3ace2dfebd63f7426/0928132b55264a7ceeec3e0d51a090e81b3af654?placeholderIfAbsent=true"
            alt=""
            className={`w-3.5 aspect-[2.33] transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <ul
            role="listbox"
            aria-label={label}
            className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-[0px_4px_14px_rgba(0,0,0,0.1)] border border-gray-200 max-h-48 overflow-y-auto z-10"
          >
            {options.map(option => (
              <li
                key={option}
                role="option"
                aria-selected={option === selectedValue}
              >
                <button
                  type="button"
                  className={`w-full px-6 py-3 text-left text-base hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors ${
                    option === selectedValue
                      ? 'bg-teal-50 text-teal-900 font-semibold'
                      : 'text-black'
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}

        <div
          className="flex shrink-0 mt-2.5 max-w-full h-px rounded-lg shadow-[0px_4px_14px_rgba(0,0,0,0.1)] w-[334px] bg-gray-100"
          role="presentation"
        />
      </div>
    </section>
  );
};

export default QuantitySelector;
