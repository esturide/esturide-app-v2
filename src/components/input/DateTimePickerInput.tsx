import React, { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { CiCircleRemove, CiTimer } from 'react-icons/ci';
import ColorTheme from '$libs/types/Theme.ts';

import '@styles/input/time/DateTimePicker.scss';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

type ValueDateTime = Date | null;

type Props = {
  label?: string;
  value?: ValueDateTime;
  onInput?: (value: ValueDateTime) => void;
  valid?: boolean;
  invalidMessage?: string;
  readOnly?: boolean;
  theme?: ColorTheme;
};

function DateTimePickerInput({
  label,
  value,
  onInput,
  valid = true,
  invalidMessage,
  readOnly,
  theme = 'teal',
}: Props) {
  const [dateTime, onChangeDateTime] = useState<ValueDateTime | undefined>(
    value,
  );

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
    if (onInput && dateTime !== null && dateTime !== undefined) {
      onInput(dateTime);
    }
  }, [dateTime]);

  const CalenderIcon = () => {
    return (
      <CiTimer
        className={
          'h-5 w-5 text-gray-400 transition-all duration-300 ease-in-out hover:text-gray-900'
        }
      />
    );
  };

  const ClearIcon = () => {
    return (
      <CiCircleRemove
        className={
          'h-5 w-5 text-gray-400 transition-all duration-300 ease-in-out hover:text-gray-900'
        }
      />
    );
  };

  return (
    <div className={'flex flex-col w-full'}>
      {label && <label className={allTextThemeColors[theme]}>{label}</label>}

      <DateTimePicker
        onChange={onChangeDateTime}
        value={dateTime}
        className={allInputThemeColors[theme]}
        disabled={readOnly}
        calendarIcon={CalenderIcon}
        clearIcon={readOnly ? null : ClearIcon}
      />

      {!valid && (
        <p className={'px-3 pt-1 text-xs text-red-500'}>{invalidMessage}</p>
      )}
    </div>
  );
}

export default DateTimePickerInput;
