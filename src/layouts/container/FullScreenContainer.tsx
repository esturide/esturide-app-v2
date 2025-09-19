import React from 'react';

function FullScreenContainer({ children }: React.PropsWithChildren) {
  return <div className="fixed inset-0 bg-white z-50">{children}</div>;
}

export default FullScreenContainer;
