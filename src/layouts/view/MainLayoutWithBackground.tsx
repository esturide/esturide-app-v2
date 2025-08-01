import React from 'react';
import BackgroundAnimated from '@components/resources/BackgroundAnimated.tsx';
import MainLayout from '@layouts/view/MainLayout.tsx';

type Props = {
  filename: string;
};

function MainLayoutWithBackground({
  children,
  filename,
}: React.PropsWithChildren<Props>) {
  return (
    <BackgroundAnimated filename={filename}>
      <MainLayout>{children}</MainLayout>
    </BackgroundAnimated>
  );
}

export default MainLayoutWithBackground;
