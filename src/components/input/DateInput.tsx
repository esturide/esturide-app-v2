import React, { FocusEvent, useState } from 'react';

type Props = {
  label?: string;
  placeholder?: string;
  onSelect?: (value: Date) => Promise<void>;
};

const DateInput: React.FC<Props> = ({
  label,
  placeholder = '',
  onSelect = null,
}) => {
  const [startDate, setStartDate] = useState('');

  const handleChange = async (event: FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const date = new Date(value);

    if (onSelect) {
      await onSelect(date);
    }

    setStartDate(value);
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor="userInput"
          className="my-2 mx-2 text-left text-sm font-medium text-teal-900"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          id="userInput"
          value={startDate}
          onChange={handleChange}
          placeholder={placeholder}
          className="px-4 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white border border-solid border-stone-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-[30px]"
          aria-label={label || 'User input'}
        />
      </div>
    </div>
  );
};

export default DateInput;
