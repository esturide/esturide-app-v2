import React, { useId } from 'react';

import '@styles/background/gradient/gradient-animation-clear.scss';
import '@styles/background/gradient/gradient-animation-dark.scss';

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
