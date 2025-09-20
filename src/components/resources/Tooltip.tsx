import React from 'react';

type Props = {
  message?: string;
  onFocus?: () => void;
};

function Tooltip({
  children,
  message,
  onFocus,
}: React.PropsWithChildren<Props>) {
  return (
    <div className={'group relative flex flex-col justify-center py-2 gap-2'}>
      <button
        className="text-black font-bold py-2 px-4 rounded"
        onFocus={onFocus}
      >
        {children}
      </button>

      <span className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 transition-all rounded bg-gray-800 hover:shadow-xl/30 p-2 text-xs text-white group-hover:scale-100">
        {message}
      </span>
    </div>
  );
}

export default Tooltip;
