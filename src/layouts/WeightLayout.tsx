import React from 'react';

function WeightLayout({ children }: React.PropsWithChildren) {
  return <div className={'flex flex-col lg:h-screen'}>{children}</div>;
}

export default WeightLayout;
