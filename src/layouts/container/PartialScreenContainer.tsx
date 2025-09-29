import React from 'react';

function PartialScreenContainer({ children }: React.PropsWithChildren) {
  return (
    <div className={'flex items-center justify-center md:h-screen'}>
      {children}
    </div>
  );
}

export default PartialScreenContainer;
