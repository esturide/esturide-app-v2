import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

import '@styles/input/time/DateTimePicker.scss';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import ColorTheme from '$libs/types/Theme.ts';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type Props = {
  label?: string;
  value?: Value;
  onInput?: (value: string) => void;
  valid?: boolean;
  invalidMessage?: string;
  readOnly?: boolean;
  theme?: ColorTheme;
};

function DateTimePickerInput({
  label,
  value = '',
  onInput,
  valid = true,
  invalidMessage,
  readOnly,
  theme = 'teal',
}: Props) {
  const [dateTime, onChangeDateTime] = useState<Value>(value);

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

  return (
    <div>
      {label && <label className={allTextThemeColors[theme]}>{label}</label>}
      <DateTimePicker
        onChange={onChangeDateTime}
        value={dateTime}
        className={allInputThemeColors[theme]}
      />
    </div>
  );
}

export default DateTimePickerInput;
