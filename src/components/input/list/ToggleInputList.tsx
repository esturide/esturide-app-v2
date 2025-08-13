import React, { useState } from 'react';

export interface FilterOption {
  id: string;
  label: string;
  defaultValue?: boolean;
}

type Props = {
  options: FilterOption[];
  onSelectionChange?: (selections: Record<string, boolean>) => void;
  title: string;
  description?: string;
  theme?: 'indigo' | 'teal';
};

export const ToggleInputList: React.FC<Props> = ({
  options,
  onSelectionChange,
  title,
  description = '',
  theme = 'teal',
}) => {
  const [selections, setSelections] = useState<Record<string, boolean>>(() => {
    const initialSelections: Record<string, boolean> = {};
    options.forEach(option => {
      initialSelections[option.id] = option.defaultValue || false;
    });
    return initialSelections;
  });

  const handleToggleChange = (optionId: string, checked: boolean) => {
    const newSelections = {
      ...selections,
      [optionId]: checked,
    };
    setSelections(newSelections);
    onSelectionChange?.(newSelections);
  };

  const handleKeyDown = (event: React.KeyboardEvent, optionId: string) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      handleToggleChange(optionId, !selections[optionId]);
    }
  };

  return (
    <div
      className="overflow-hidden mx-auto w-full bg-white max-w-[480px]"
      role="dialog"
      aria-labelledby="filter-modal-title"
      aria-describedby="filter-modal-description"
    >
      <header className="overflow-hidden w-full bg-slate-800">
        <div className="w-full text-lg font-semibold tracking-tight leading-none text-center text-white whitespace-nowrap" />
        <section className="w-full">
          <div className="overflow-hidden px-4 w-full" />
        </section>
      </header>

      <div className="flex flex-col items-start px-5 mt-4 w-full">
        <div className="sr-only">
          <h1 id="filter-modal-title">{title}</h1>
          <p id="filter-modal-description">{description}</p>
        </div>

        <section className="flex flex-col gap-5 self-stretch mt-6 w-full">
          {options.map(option => {
            const isChecked = selections[option.id] || false;

            const getBackgroundColor = () => {
              if (!isChecked) return 'bg-zinc-100';
              return theme === 'teal' ? 'bg-teal-600' : 'bg-indigo-600';
            };

            const getLabelColor = () => {
              return theme === 'teal' ? 'text-teal-700' : 'text-indigo-700';
            };

            return (
              <div
                key={option.id}
                className="flex items-center justify-between"
              >
                <label
                  htmlFor={`${option.id}-toggle`}
                  className={`text-base font-bold cursor-pointer ${getLabelColor()}`}
                >
                  {option.label}
                </label>
                <div
                  className={`flex flex-col justify-center items-start p-0.5 shadow-sm rounded-[50px] transition-colors duration-200 cursor-pointer ${getBackgroundColor()}`}
                  onClick={() => handleToggleChange(option.id, !isChecked)}
                  onKeyDown={e => handleKeyDown(e, option.id)}
                  role="switch"
                  aria-checked={isChecked}
                  aria-labelledby={`${option.id}-toggle`}
                  tabIndex={0}
                >
                  <div
                    className={`flex shrink-0 w-3.5 h-3.5 rounded-full transition-colors duration-200 ${
                      isChecked ? 'bg-white' : 'bg-gray-400'
                    }`}
                  />
                  <input
                    type="checkbox"
                    id={`${option.id}-toggle`}
                    checked={isChecked}
                    onChange={e =>
                      handleToggleChange(option.id, e.target.checked)
                    }
                    className="sr-only"
                    aria-describedby={`${option.id}-description`}
                  />
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default ToggleInputList;
