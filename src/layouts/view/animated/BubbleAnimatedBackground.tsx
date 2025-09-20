import React, { useId } from 'react';

import '@/styles/background/animated/bubble-dark-animation.scss';

type Props = {
  dark?: boolean;
  bubblesQuantity?: number;
};

const Bubble = () => {
  const id = useId();

  return <span className={'bubble'} id={id}></span>;
};

function BubbleAnimatedBackground({
  children,
  dark = false,
  bubblesQuantity = 10,
}: React.PropsWithChildren<Props>) {
  const id = useId();

  const bubbles = [];

  for (let i = 0; i < bubblesQuantity; i++) {
    bubbles.push(<Bubble />);
  }

  if (dark) {
    return (
      <div className={'bg-bubble-animation-dark'} id={id}>
        {bubbles}
        {children}
      </div>
    );
  }

  return (
    <div className={'bg-bubble-animation-dark'} id={id}>
      {bubbles}
      {children}
    </div>
  );
}

export default BubbleAnimatedBackground;
