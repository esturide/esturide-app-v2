import React, { useId, useState } from 'react';

export interface FilterOption {
  id: string;
  label: string;
  defaultValue?: boolean;
}

type Props = {
  options: FilterOption[];
  onSelectionChange?: (selections: Record<string, boolean>) => void;
  title?: string;
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
  const id = useId();
  const valid = true;

  const [selections, setSelections] = useState<Record<string, boolean>>(() => {
    const initialSelections: Record<string, boolean> = {};
    options.forEach(option => {
      initialSelections[option.id] = option.defaultValue || false;
    });
    return initialSelections;
  });

  const allTextThemeColors = {
    gray: 'my-2 mx-2 text-left text-sm font-medium text-gray-900 items-center',
    teal: 'my-2 mx-2 text-left text-sm font-medium text-teal-900 items-center',
    indigo:
      'my-2 mx-2 text-left text-sm font-medium text-indigo-900 items-center',
  };

  const allInputThemeColors = {
    gray: `flex justify-between px-3 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white`,
    teal: `flex justify-between px-3 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white`,
    indigo: `flex justify-between px-3 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white `,
  };

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
    <div id={id} className="overflow-hidden mx-auto w-full">
      <div className="flex flex-col items-start w-full">
        <div className="w-full">
          {title && <h1 className={allTextThemeColors[theme]}>{title}</h1>}
        </div>
        <section className="flex flex-col self-stretch w-full">
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
              <div key={option.id} className={allInputThemeColors[theme]}>
                <label
                  htmlFor={`${option.id}-toggle`}
                  className={`text-base font-bold cursor-pointer ${getLabelColor()}`}
                >
                  {option.label}
                </label>

                <div
                  className={`flex flex-col justify-center items-start p-1.5 rounded-full shadow-sm transition-colors duration-200 cursor-pointer ${getBackgroundColor()}`}
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

        {description && (
          <p
            className={'my-2 mx-2 text-left text-sm font-normal text-gray-700'}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ToggleInputList;
