import React from 'react';
import { useNavigate } from 'react-router-dom';
import PresentationLayout from '@layouts/PresentationLayout.tsx';
import HeaderPresentation from '@components/resources/HeaderPresentation.tsx';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const DefaultHeader = () => {
    return (
      <HeaderPresentation
        showBackward
        onBackwardClick={async () => {
          navigate(-1);
        }}
      />
    );
  };

  return (
    <PresentationLayout title={'Hello world!'} header={<DefaultHeader />}>
      <div>Hello world</div>
    </PresentationLayout>
  );
};

export default LoginPage;
