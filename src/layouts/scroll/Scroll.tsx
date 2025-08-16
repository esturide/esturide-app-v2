import React, { PropsWithChildren } from 'react';

type Props = object;

const Scroll: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return <div className="h-screen overflow-y-scroll">{children}</div>;
};

export default Scroll;
