import React, { useState } from 'react';

type Props = {
  label: string;
};

const ToggleSwitch: React.FC<Props> = ({ label }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => setIsChecked(!isChecked);

  return (
    <div className="flex gap-10 max-w-[327px] items-center">
      <label
        htmlFor="toggle-switch"
        className="text-base font-bold text-teal-900"
      >
        {label}
      </label>
      <button
        id="toggle-switch"
        role="switch"
        aria-checked={isChecked}
        onClick={toggleSwitch}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleSwitch();
          }
        }}
        className="flex flex-col justify-center items-start p-0.5 shadow-sm bg-zinc-100 rounded-[50px] focus:outline-none focus:ring-2 focus:ring-teal-500"
        tabIndex={0}
      >
        <div
          className={`flex shrink-0 w-3.5 h-3.5 rounded-full transition-transform duration-200 ease-in-out ${
            isChecked ? 'bg-teal-500 transform translate-x-full' : 'bg-gray-400'
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
