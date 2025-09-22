import React, { useEffect, useState } from 'react';
import TimePicker from 'react-time-picker';
import ColorTheme from '$libs/types/Theme.ts'; // Clock styling if used by the picker

import '@styles/input/time/TimePicker.scss';
import '@styles/input/time/ClockInput.scss';

type Props = {
  label?: string;
  value?: string;
  onInput?: (value: string) => void;
  valid?: boolean;
  invalidMessage?: string;
  readOnly?: boolean;
  theme?: ColorTheme;
};

function TimePickerInput({
  label,
  value = '12:00',
  onInput,
  valid = true,
  invalidMessage,
  readOnly,
  theme = 'teal',
}: Props) {
  const [time, setTime] = useState(value);

  useEffect(() => {
    if (onInput) {
      onInput(time);
    }
  }, [time]);

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
    <div className="flex flex-col w-full">
      {label && <label className={allTextThemeColors[theme]}>{label}</label>}

      <TimePicker
        onChange={newTime => {
          if (newTime) {
            setTime(newTime);
          }
        }}
        value={time}
        className={allInputThemeColors[theme]}
        clearIcon={null}
      />
    </div>
  );
}

export default TimePickerInput;
