import React from 'react';

function ScrollLayout({ children }: React.PropsWithChildren) {
  return (
    <div
      className={
        'max-h-100 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'
      }
    >
      {children}
    </div>
  );
}

export default ScrollLayout;
