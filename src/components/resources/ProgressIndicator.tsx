import React from 'react';

type Props = {
  steps: number;
  current: number;
};

const ProgressIndicator: React.FC<Props> = ({ steps, current }) => {
  return (
    <div className="flex justify-center w-full">
      <nav aria-label="Progress" className="flex gap-2 items-center px-6">
        {Array.from({ length: steps }, (_, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full ${
                index < current
                  ? 'bg-emerald-400'
                  : 'bg-white border border-solid border-stone-300'
              }`}
              role="progressbar"
              aria-valuenow={index < current ? 100 : 0}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={
                index === current
                  ? 'Current step'
                  : index < current
                    ? 'Completed step'
                    : 'Upcoming step'
              }
            />
            {index < steps - 1 && (
              <div
                className="shrink-0 self-stretch my-auto w-10 h-px border border-solid border-stone-300"
                role="presentation"
              />
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default ProgressIndicator;
