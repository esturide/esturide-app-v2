import React from 'react';

function LayoutBetween({ children }: React.PropsWithChildren) {
  return (
    <div className={'flex justify-between items-center gap-2 flex-row'}>
      {children}
    </div>
  );
}

export default LayoutBetween;
