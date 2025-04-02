import React from 'react';
import PresentationLayout from '@layouts/PresentationLayout.tsx';
import HeaderPresentation from '@components/resources/HeaderPresentation.tsx';

const LoginPage: React.FC = () => {
  return (
    <PresentationLayout
      title={'Hello world!'}
      header={
        <HeaderPresentation showBackward onBackwardClick={async () => {}} />
      }
    >
      <div>Hello world</div>
    </PresentationLayout>
  );
};

export default LoginPage;
