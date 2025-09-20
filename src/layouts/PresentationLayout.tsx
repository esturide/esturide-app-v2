import React, { PropsWithChildren } from 'react';
import BubbleAnimatedBackground from '@layouts/view/animated/BubbleAnimatedBackground.tsx';

import '@/styles/background/animated/bubble-dark-animation.scss';
import GradientAnimatedBackground from '@layouts/view/animated/GradientAnimatedBackground.tsx';

type Props = {
  title?: string;
  header: React.ReactNode | React.ReactElement;
};

const PresentationLayout: React.FC<PropsWithChildren<Props>> = ({
  children,
  title = null,
  header,
}) => {
  return (
    <GradientAnimatedBackground dark>
      <div className="w-full h-screen flex-grow flex flex-col items-center justify-center">
        <div className="flex m-8">{header}</div>

        <div className="w-full max-w-md overflow-hidden bg-white rounded-t-[60px] pt-6 shadow-lg flex-grow flex flex-col items-center justify-center">
          <div className="flex-grow flex flex-col w-full h-full px-5">
            {title && (
              <h1 className="text-4xl font-bold text-black text-center p-5">
                {title}
              </h1>
            )}
            <div className="pb-5 overflow-y-auto h-screen">{children}</div>
          </div>
        </div>
      </div>
    </GradientAnimatedBackground>
  );
};

export default PresentationLayout;
