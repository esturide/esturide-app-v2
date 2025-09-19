import React, { useId } from 'react';

import '@styles/background-image.scss';

const MainBackgroundAnimated = ({ children }: React.PropsWithChildren) => {
  const id = useId();

  return <div id={id}>{children}</div>;
};

export default MainBackgroundAnimated;
