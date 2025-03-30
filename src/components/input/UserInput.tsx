import React, { useState, ChangeEvent, KeyboardEvent, FocusEvent } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type Props = {
  label?: string;
  initialValue?: string;
  type?: 'text' | 'number' | 'password';
  placeholder?: string;
  onChange?: (value: string) => Promise<void>;
  onBlur?: (value: string) => Promise<void>;
  onFocus?: (value: string) => Promise<void>;
  onKeyPress?: (
    value: string,
    event: KeyboardEvent<HTMLInputElement>,
  ) => Promise<void>;
};

const UserInput: React.FC<Props> = ({
  label,
  initialValue = '',
  type = 'text',
  placeholder = '',
  onChange,
  onBlur,
  onFocus,
  onKeyPress,
}) => {
  const [value, setValue] = useState(initialValue);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (onChange) {
      await onChange(newValue);
    }
  };

  const handleBlur = async (event: FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      await onBlur(event.target.value);
    }
  };

  const handleFocus = async (event: FocusEvent<HTMLInputElement>) => {
    if (onFocus) {
      await onFocus(event.target.value);
    }
  };

  const handleKeyPress = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyPress) {
      await onKeyPress(event.currentTarget.value, event);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col w-full p-4 rounded-md">
      {label && (
        <label
          htmlFor="userInput"
          className="mb-2 text-left text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          id="userInput"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="px-4 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white border border-solid border-stone-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label={label || 'User input'}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <FaEye className="h-5 w-5 text-gray-400" />
            ) : (
              <FaEyeSlash className="h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInput;
