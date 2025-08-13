import React, { useState } from 'react';

interface PriceInputProps {
  label?: string;
  placeholder?: string;
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

export const PriceInput: React.FC<PriceInputProps> = ({
  label = undefined,
  placeholder = '',
  value: controlledValue,
  onChange,
  disabled = false,
}) => {
  const [internalValue, setInternalValue] = useState<number>(0);

  const isControlled = controlledValue !== undefined;
  const inputValue = isControlled ? controlledValue : internalValue;

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
    <div className="flex flex-col max-w-[327px]">
      {label && (
        <label className="z-10 self-start ml-6 text-base font-bold text-teal-900">
          {label}
        </label>
      )}
      <div className="flex flex-col justify-center items-start px-8 py-5 w-full text-base font-medium tracking-normal text-center bg-white border border-solid border-stone-300 min-h-14 rounded-[32px] text-stone-300">
        <input
          type="number"
          min="0"
          step="0.01"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full bg-transparent border-none outline-none text-stone-900 placeholder:text-stone-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
    </div>
  );
};

export default PriceInput;
