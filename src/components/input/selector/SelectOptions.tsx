import React, { useId, useRef, useState } from 'react';
import { FaCheckCircle, FaChevronDown } from 'react-icons/fa';
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import ColorTheme from '$libs/types/Theme.ts';

interface Option {
  id: number;
}

export interface AvatarOption extends Option {
  name: string;
  avatar: string;
}

export interface StringOption extends Option {
  description: string;
}

type Props = {
  name?: string;
  label?: string;
  defaultValue?: number;
  options: AvatarOption[] | StringOption[] | Option[];
  onSelect?: (index: number) => void;
  theme?: ColorTheme;
  disabled?: boolean;
};

const isAvatar = (option: any): option is AvatarOption => {
  return option !== undefined && 'avatar' in option;
};

const isStringOption = (option: any): option is StringOption => {
  return option !== undefined && 'description' in option;
};

function isAvatarArray(arr: any[]): arr is AvatarOption[] {
  return Array.isArray(arr) && arr.every(item => isAvatar(item));
}

function isOptionArray(arr: any[]): arr is StringOption[] {
  return Array.isArray(arr) && arr.every(item => isStringOption(item));
}

const SelectOptions: React.FC<Props> = ({
  name = undefined,
  label = null,
  options,
  defaultValue = 0,
  onSelect = null,
  theme = 'teal',
  disabled = false,
}) => {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<Option>(options[defaultValue]);

  const allThemesText = {
    gray: 'my-2 mx-2 text-left text-sm font-medium text-gray-900',
    teal: 'my-2 mx-2 text-left text-sm font-medium text-teal-900',
    indigo: 'my-2 mx-2 text-left text-sm font-medium text-indigo-900',
  };

  const ShowSelectedOption = () => {
    const allButtonColor = {
      gray: 'px-4 py-2 grid w-full cursor-default grid-cols-1 rounded-t-[40px] rounded-b-[40px] bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6',
      teal: 'px-4 py-2 grid w-full cursor-default grid-cols-1 rounded-t-[40px] rounded-b-[40px] bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6',
      indigo:
        'px-4 py-2 grid w-full cursor-default grid-cols-1 rounded-t-[40px] rounded-b-[40px] bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6hidden',
    };

    if (isAvatar(selected)) {
      return (
        <ListboxButton className={allButtonColor[theme]}>
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <img
              alt=""
              src={selected.avatar}
              className="size-5 shrink-0 rounded-full"
            />
            <span className="block truncate text-base font-medium tracking-normal text-left text-black">
              {selected.name}
            </span>
          </span>
          <FaChevronDown
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>
      );
    } else if (isStringOption(selected)) {
      return (
        <ListboxButton className={allButtonColor[theme]}>
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="block truncate text-base font-medium tracking-normal text-left text-black">
              {selected.description}
            </span>
          </span>
          <FaChevronDown
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>
      );
    }
  };

  const AllElements = () => {
    const allButtonColor = {
      gray: 'group relative cursor-default py-2 pr-9 text-gray-900 select-none data-focus:bg-gray-600 data-focus:text-white data-focus:outline-hidden',
      teal: 'group relative cursor-default py-2 pr-9 text-gray-900 select-none data-focus:bg-teal-600 data-focus:text-white data-focus:outline-hidden',
      indigo:
        'group relative cursor-default py-2 pr-9 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden',
    };

    const allIconColors = {
      gray: 'absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600 group-not-data-selected:hidden group-data-focus:text-white',
      teal: 'absolute inset-y-0 right-0 flex items-center pr-4 text-teal-600 group-not-data-selected:hidden group-data-focus:text-white',
      indigo:
        'absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white',
    };

    if (isAvatarArray(options)) {
      return (
        <>
          {options.map(option => (
            <ListboxOption
              key={option.id}
              value={option}
              className={allButtonColor[theme]}
            >
              <div className="flex items-center">
                <img
                  alt=""
                  src={option.avatar}
                  className="size-5 shrink-0 rounded-full"
                />
                <span className="ml-3 block truncate text-base tracking-normal text-left group-data-selected:font-semibold">
                  {option.name}
                </span>
              </div>

              <span className={allIconColors[theme]}>
                <FaCheckCircle aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </>
      );
    } else if (isOptionArray(options)) {
      return (
        <>
          {options.map(option => (
            <ListboxOption
              key={option.id}
              value={option}
              className={allButtonColor[theme]}
            >
              <div className="flex items-center">
                <span className="ml-3 block truncate text-base tracking-normal text-left group-data-selected:font-semibold">
                  {option.description}
                </span>
              </div>

              <span className={allIconColors[theme]}>
                <FaCheckCircle
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-400"
                />
              </span>
            </ListboxOption>
          ))}
        </>
      );
    }
  };

  const onChangeValue = async (option: Option) => {
    if (onSelect) {
      onSelect(option.id);
    }

    setSelected(option);
  };

  return (
    <div className="flex flex-col w-full">
      <Listbox
        value={selected}
        onChange={onChangeValue}
        disabled={disabled}
        name={name}
      >
        {label && (
          <Label id={id} className={allThemesText[theme]}>
            {label}
          </Label>
        )}
        <div className="relative">
          <ShowSelectedOption />

          <ListboxOptions
            id={id}
            transition
            className={
              'absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm rounded-t-[10px] rounded-b-[15px]'
            }
          >
            <AllElements />
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectOptions;
