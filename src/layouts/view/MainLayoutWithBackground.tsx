import React from 'react';
import ImageBackground from '@components/resources/MainBackgroundAnimated.tsx';
import MainLayout from '@layouts/view/MainLayout.tsx';

type Props = {
  filename?: string;
};

function MainLayoutWithBackground({
  children,
  filename,
}: React.PropsWithChildren<Props>) {
  if (filename) {
    return (
      <ImageBackground>
        <MainLayout>{children}</MainLayout>
      </ImageBackground>
    );
  } else {
    return <MainLayout>{children}</MainLayout>;
  }
}

export default MainLayoutWithBackground;
