import React from 'react';

function PartialScreenContainer({ children }: React.PropsWithChildren) {
  return (
    <div className={'absolute top-0 left-0 bg-white h-screen w-screen'}>
      <div className={'flex h-screen items-center justify-center'}>
        {children}
      </div>
    </div>
  );
}

export default PartialScreenContainer;
