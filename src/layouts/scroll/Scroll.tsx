import React, { PropsWithChildren, useEffect } from 'react';

type Props = {
  minHeight?: number;
  maxHeight?: number;
};

const Scroll: React.FC<PropsWithChildren<Props>> = ({
  children,
  minHeight = 50,
  maxHeight = 55,
}) => {
  useEffect(() => {
    if (minHeight >= maxHeight) {
      throw new Error('Minimum height should be greater than maxHeight');
    }

    if (maxHeight <= 1) {
      throw new Error('Max height is less than 1');
    }
  }, [maxHeight, minHeight]);

  return <div className={`h-auto px-2 overflow-y-auto`}>{children}</div>;
};

export default Scroll;
