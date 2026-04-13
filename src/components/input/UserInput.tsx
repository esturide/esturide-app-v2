import React, {
  FocusEvent,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ColorTheme from '$libs/types/Theme.ts';

type Props = {
  label?: string;
  value?: string;
  type?: 'text' | 'number' | 'password' | 'date';
  placeholder?: string;
  onInput?: (value: string) => void;
  valid?: boolean;
  invalidMessage?: string;
  readOnly?: boolean;
  theme?: ColorTheme;
};

const UserInput: React.FC<Props> = ({
  label,
  value = '',
  type = 'text',
  placeholder = '',
  onInput,
  valid = true,
  invalidMessage = '',
  readOnly = false,
  theme = 'teal',
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);

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

  useEffect(() => {
    if (onInput) {
      onInput(inputValue);
    }
  }, [inputValue]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const Container: React.FC<PropsWithChildren> = ({ children }) => {
    return (
      <div className="flex flex-col w-full">
        {label && <label className={allTextThemeColors[theme]}>{label}</label>}
        <div className="relative">{children}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full">
      <Container>
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
          className={allInputThemeColors[theme]}
          aria-label={label || 'User input'}
          readOnly={readOnly}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <FaEye className="h-5 w-5 text-gray-400" />
            ) : (
              <FaEyeSlash className="h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
      </Container>
      {!valid && (
        <p className={'px-3 pt-1 text-xs text-red-500'}>{invalidMessage}</p>
      )}
    </div>
  );
};

export default UserInput;
