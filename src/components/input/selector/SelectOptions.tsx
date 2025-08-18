import React, { useEffect, useState } from 'react';
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
  label?: string;
  defaultValue?: number;
  options: AvatarOption[] | StringOption[] | Option[];
  onSelect: (index: number) => Promise<void>;
  theme?: ColorTheme;
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
  label = null,
  options,
  defaultValue = 0,
  onSelect = null,
  theme = 'teal',
}) => {
  const [selected, setSelected] = useState<Option>(options[defaultValue]);

  const ShowSelectedOption = () => {
    if (isAvatar(selected)) {
      return (
        <ListboxButton
          className={`grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-${theme}-600 sm:text-sm/6`}
        >
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <img
              alt=""
              src={selected.avatar}
              className="size-5 shrink-0 rounded-full"
            />
            <span className="block truncate">{selected.name}</span>
          </span>
          <FaChevronDown
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>
      );
    } else if (isStringOption(selected)) {
      return (
        <ListboxButton
          className={`grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-${theme}-600 sm:text-sm/6`}
        >
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="block truncate">{selected.description}</span>
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
    if (isAvatarArray(options)) {
      return (
        <>
          {options.map(option => (
            <ListboxOption
              key={option.id}
              value={option}
              className={`group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-${theme}-600 data-focus:text-white data-focus:outline-hidden`}
            >
              <div className="flex items-center">
                <img
                  alt=""
                  src={option.avatar}
                  className="size-5 shrink-0 rounded-full"
                />
                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                  {option.name}
                </span>
              </div>

              <span
                className={`absolute inset-y-0 right-0 flex items-center pr-4 text-${theme}-600 group-not-data-selected:hidden group-data-focus:text-white`}
              >
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
              className={`group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-${theme}-600 data-focus:text-white data-focus:outline-hidden`}
            >
              <div className="flex items-center">
                <div></div>
                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                  {option.description}
                </span>
              </div>

              <span
                className={`absolute inset-y-0 right-0 flex items-center pr-4 text-${theme}-600 group-not-data-selected:hidden group-data-focus:text-white`}
              >
                <FaCheckCircle aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </>
      );
    }
  };

  const onChangeValue = async (option: Option) => {
    setSelected(option);

    if (onSelect) {
      await onSelect(option.id);
    }
  };

  return (
    <div className="flex flex-col w-full py-4 rounded-md">
      <Listbox value={selected} onChange={onChangeValue}>
        {label && (
          <Label className="block text-sm/6 font-medium text-gray-900">
            {label}
          </Label>
        )}
        <div className="relative mt-2">
          <ShowSelectedOption />

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
          >
            <AllElements />
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectOptions;
