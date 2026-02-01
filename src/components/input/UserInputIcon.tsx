import React, { PropsWithChildren, useRef, useId } from 'react';
import { IconType } from 'react-icons';
import { FaCircleCheck } from 'react-icons/fa6';
import ColorTheme from '$libs/types/Theme.ts';

type Props = {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => Promise<void>;
  icon?: IconType;
  readOnly?: boolean;
  theme?: ColorTheme;
  name?: string;
  valid?: boolean;
  disabled?: boolean;
};

const UserInputIcon: React.FC<Props> = ({
  label,
  value = '',
  placeholder = '',
  onChange,
  icon = FaCircleCheck,
  readOnly = false,
  theme = 'teal',
  name = undefined,
  valid = true,
  disabled = false,
}) => {
  const id = useId();
  const Icon = icon;
  const inputRef = useRef<HTMLInputElement>(null);

  const AllStyles = {
    gray: `px-3 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white border border-solid border-stone-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent rounded-t-[40px] rounded-b-[40px] ${valid ? 'border-solid border-stone-300' : 'border-solid border-red-500 ring-2 ring-red-500'}`,
    teal: `px-3 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white border border-solid border-stone-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent rounded-t-[40px] rounded-b-[40px] ${valid ? 'border-solid border-stone-300' : 'border-solid border-red-500 ring-2 ring-red-500'}`,
    indigo: `px-3 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white border border-solid border-stone-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-t-[40px] rounded-b-[40px] ${valid ? 'border-solid border-stone-300' : 'border-solid border-red-500 ring-2 ring-red-500'}`,
  };

  const allStylesText = {
    gray: 'my-2 mx-2 text-left text-sm font-medium text-gray-900',
    teal: 'my-2 mx-2 text-left text-sm font-medium text-teal-900',
    indigo: 'my-2 mx-2 text-left text-sm font-medium text-indigo-900',
  };

  const InputContainer: React.FC<PropsWithChildren> = ({ children }) => {
    return (
      <div className="flex flex-col w-full">
        {label && (
          <label id={id} className={allStylesText[theme]}>
            {label}
          </label>
        )}
        <div className="relative">{children}</div>
      </div>
    );
  };

  const onCaptureValue = async () => {
    if (onChange) {
      await onChange(inputRef.current !== null ? inputRef.current.value : '');
    }
  };

  return (
    <InputContainer>
      <input
        id={id}
        type="text"
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        className={`${AllStyles[theme]} ${disabled ? 'cursor-not-allowed text-gray-600' : ''}`}
        aria-label={label || 'User input'}
        readOnly={readOnly}
        onBlur={onCaptureValue}
        ref={inputRef}
        disabled={disabled}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={onCaptureValue}
      >
        <Icon className="h-5 w-5 text-gray-400" />
      </button>
    </InputContainer>
  );
};

export default UserInputIcon;
