import React from 'react';
import PresentationLayout from '@layouts/PresentationLayout.tsx';
import HeaderPresentation from '@components/resources/HeaderPresentation.tsx';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PresentationLayout
      title={'Hello world!'}
      header={
        <HeaderPresentation
          showBackward
          onBackwardClick={async () => {
            navigate(-1);
          }}
        />
      }
    >
      <div>Hello world</div>
    </PresentationLayout>
  );
};

export default LoginPage;
