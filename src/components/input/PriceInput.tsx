import React, { useState } from 'react';
import ColorTheme from '$libs/types/Theme.ts';

interface Props {
  label?: string;
  placeholder?: string;
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  valid?: boolean;
  readOnly?: boolean;
  theme?: ColorTheme;
}

export const PriceInput: React.FC<Props> = ({
  label = undefined,
  placeholder = '',
  value,
  onChange,
  disabled = false,
  valid = true,
  theme = 'teal',
}) => {
  const [internalValue, setInternalValue] = useState<number>(0);

  const isControlled = value !== undefined;
  const inputValue = isControlled ? value : internalValue;

  const allTextThemeColors = {
    gray: 'my-2 mx-2 text-left text-sm font-medium text-gray-900',
    teal: 'my-2 mx-2 text-left text-sm font-medium text-teal-900',
    indigo: 'my-2 mx-2 text-left text-sm font-medium text-indigo-900',
  };

  const allInputThemeColors = {
    gray: `px-4 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent rounded-t-[40px] rounded-b-[40px] ${valid ? 'border-solid border-stone-300' : 'border-solid border-red-500 ring-2 ring-red-500'}`,
    teal: `px-4 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent rounded-t-[40px] rounded-b-[40px] ${valid ? 'border-solid border-stone-300' : 'border-solid border-red-500 ring-2 ring-red-500'}`,
    indigo: `px-4 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-t-[40px] rounded-b-[40px] ${valid ? 'border-solid border-stone-300' : 'border-solid border-red-500 ring-2 ring-red-500'}`,
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value) || 0;

    if (newValue >= 0) {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === '-' || event.key === 'e' || event.key === 'E') {
      event.preventDefault();
    }
  };

  return (
    <div className="flex flex-col w-full">
      {label && <label className={allTextThemeColors[theme]}>{label}</label>}
      <input
        type="number"
        min="0"
        step="0.01"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={allInputThemeColors[theme]}
      />
    </div>
  );
};

export default PriceInput;
