import React, { useState } from 'react';
import { CirclePicker } from 'react-color';

type Props = {
  label?: string;
  value?: string;
  placeholder?: string;
  onSelect?: (value: string) => void;
};

const SelectColor: React.FC<Props> = ({
  label,
  value = '#fff',
  placeholder = '',
  onSelect = null,
}) => {
  const [color, setColor] = useState(value);

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
          type="text"
          id="userInput"
          value={color}
          placeholder={placeholder}
          className="px-4 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white border border-solid border-stone-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-t-[30px]"
          aria-label={label || 'User input'}
          readOnly
        />

        <div className="flex flex-grow items-center justify-center py-3 border border-solid border-t-white border-stone-300 rounded-b-[40px]">
          <CirclePicker
            color={color}
            onChange={e => {
              setColor(e.hex);

              if (onSelect) {
                onSelect(e.hex);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectColor;
