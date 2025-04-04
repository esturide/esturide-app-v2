import React, { PropsWithChildren } from 'react';

type Props = {
  title?: string;
  header: React.ReactNode | React.ReactElement;
};

const PresentationLayout: React.FC<PropsWithChildren<Props>> = ({
  children,
  title = null,
  header,
}) => {
  const Content = () => {
    return (
      <div className="max-h-100 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        {children}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="flex m-8">{header}</div>

        <div className="w-full max-w-md bg-white rounded-t-[60px] flex-grow flex flex-col p-6">
          {title && (
            <h1 className="text-4xl font-bold text-black text-center">
              {title}
            </h1>
          )}

          <div className="my-5 mx-2">
            <Content />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PresentationLayout;
