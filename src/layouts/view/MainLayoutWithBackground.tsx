import React from 'react';
import ImageBackground from '@components/resources/MainBackgroundAnimated.tsx';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';

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
        <MainResponsiveLayout>{children}</MainResponsiveLayout>
      </ImageBackground>
    );
  } else {
    return <MainResponsiveLayout>{children}</MainResponsiveLayout>;
  }
}

export default MainLayoutWithBackground;
