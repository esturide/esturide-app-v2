import React, {
  FocusEvent,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type Props = {
  label?: string;
  value?: string;
  type?: 'text' | 'number' | 'password' | 'date';
  placeholder?: string;
  onInput?: (value: string) => void;
  valid?: boolean;
};

const UserInput: React.FC<Props> = ({
  label,
  value = '',
  type = 'text',
  placeholder = '',
  onInput,
  valid = true,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (onInput) {
      onInput(inputValue);
    }
  }, [inputValue]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const InputContainer: React.FC<PropsWithChildren> = ({ children }) => {
    return (
      <div className="flex flex-col w-full">
        {label && (
          <label className="my-2 mx-2 text-left text-sm font-medium text-teal-900">
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
        defaultValue={inputValue}
        onBlur={(event: FocusEvent<HTMLInputElement>) => {
          const value = event.target.value;

          if (onInput) {
            setInputValue(value);
          }
        }}
        placeholder={placeholder}
        className={`px-4 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-t-[40px] rounded-b-[40px] ${valid ? 'border-solid border-stone-300' : 'border-solid border-red-500 ring-2 ring-red-500'}`}
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
