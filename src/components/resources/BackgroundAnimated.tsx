import React from 'react';

type Props = {
  filename: string;
};

const BackgroundAnimated = ({
  children,
  filename,
}: React.PropsWithChildren<Props>) => {
  return (
    <div
      className="bg-cover bg-center h-screen "
      style={{ backgroundImage: `url(${filename})` }}
    >
      {children}
    </div>
  );
};

export default BackgroundAnimated;
