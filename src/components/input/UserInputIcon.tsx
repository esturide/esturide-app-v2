import React, { FocusEvent, PropsWithChildren, useState } from 'react';
import { IconType } from 'react-icons';
import { FaCircleCheck } from 'react-icons/fa6';
import ColorTheme from '$libs/types/Theme.ts';

type Props = {
  label?: string;
  value?: string;
  placeholder?: string;
  onClick?: () => Promise<void>;
  onInput?: (value: string) => void;
  icon?: IconType;
  readOnly?: boolean;
  theme?: ColorTheme;
  name?: string;
};

const UserInputIcon: React.FC<Props> = ({
  label,
  value = '',
  placeholder = '',
  onClick,
  onInput,
  icon = FaCircleCheck,
  readOnly = false,
  theme = 'teal',
  name = undefined,
}) => {
  const Icon = icon;

  const allThemes = {
    gray: 'px-3 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white border border-solid border-stone-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent rounded-t-[40px] rounded-b-[40px]',
    teal: 'px-3 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white border border-solid border-stone-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent rounded-t-[40px] rounded-b-[40px]',
    indigo:
      'px-3 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white border border-solid border-stone-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-t-[40px] rounded-b-[40px]',
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

  const onClickIcon = async () => {
    if (onClick !== undefined) {
      await onClick();
    }
  };

  return (
    <InputContainer>
      <input
        type="text"
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        className={allThemes[theme]}
        aria-label={label || 'User input'}
        readOnly={readOnly}
      />
      <button
        type="button"
        onClick={onClickIcon}
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <Icon className="h-5 w-5 text-gray-400" />
      </button>
    </InputContainer>
  );
};

export default UserInputIcon;
