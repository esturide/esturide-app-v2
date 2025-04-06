import React, { PropsWithChildren } from 'react';

type Props = object;

const Scrollable: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div
      className={`w-full max-w-md h-full sm:h-auto overflow-auto sm:overflow-visible [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}
    >
      <div className="max-w-3xl mx-auto bg-white">{children}</div>
    </div>
  );
};

export default Scrollable;
