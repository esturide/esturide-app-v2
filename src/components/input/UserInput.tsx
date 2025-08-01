import React, {
  ChangeEvent,
  FocusEvent,
  PropsWithChildren,
  useState,
} from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type Props = {
  label?: string;
  value?: string;
  type?: 'text' | 'number' | 'password' | 'date';
  placeholder?: string;
  onChange?: (value: string) => Promise<void>;
  onBlur?: (value: string) => Promise<void>;
  onFocus?: (value: string) => Promise<void>;
};

const UserInput: React.FC<Props> = ({
  label,
  value = '',
  type = 'text',
  placeholder = '',
  onChange,
  onBlur,
  onFocus,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const targetValue = event.target.value;

    if (onChange) {
      await onChange(targetValue);
    }

    setInputValue(targetValue);
  };

  const InputContainer: React.FC<PropsWithChildren> = ({ children }) => {
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
        <div className="relative">{children}</div>
      </div>
    );
  };

  return (
    <InputContainer>
      <input
        type={type === 'password' && showPassword ? 'text' : type}
        id="userInput"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        className="px-4 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white border border-solid border-stone-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-t-[40px] rounded-b-[40px]"
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
    </InputContainer>
  );
};

export default UserInput;
