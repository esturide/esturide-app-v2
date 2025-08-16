import React from 'react';
import { IconType } from 'react-icons';

type Props = {
  label: string;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  icon?: IconType;
};

function TouchableOption({
  label,
  onClick = undefined,
  disabled = false,
  icon: Icon,
}: Props) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <>
      <button
        className="bg-red-300 my-1 text-xl font-bold text-neutral-600 w-full text-left focus:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        type="button"
        role="button"
        tabIndex={0}
      >
        <div className="bg-blue-300 flex flex-col justify-between">
          <div className="flex items-center justify-between w-full">
            <span className="bg-green-300 opacity-75 text-neutral-600">
              {label}
            </span>
            {Icon && (
              <Icon
                className="opacity-75 text-neutral-600 bg-yellow-300"
                size={20}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </button>
    </>
  );
}

export default TouchableOption;
