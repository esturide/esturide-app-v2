 'use client';

import React, { useId } from 'react';

type Props = {
  dark?: boolean;
};

function GradientAnimatedBackground({
  children,
  dark = false,
}: React.PropsWithChildren<Props>) {
  const id = useId();

  if (dark) {
    return (
      <div className={'bg-gradient-animated-dark'} id={id}>
        {children}
      </div>
    );
  }

  return (
    <div className={'bg-gradient-animated-clear'} id={id}>
      {children}
    </div>
  );
}

export default GradientAnimatedBackground;
