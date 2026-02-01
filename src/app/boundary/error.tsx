import React, { useState } from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import GradientAnimatedBackground from '@layouts/view/animated/GradientAnimatedBackground.tsx';
import FooterPresentation from '@components/resources/FooterPresentation.tsx';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import HeaderText from '@components/text/HeaderText.tsx';
import ButtonLink from '@components/text/hyperlinks/ButtonLink.tsx';
import Tooltip from '@components/resources/Tooltip.tsx';

function ErrorPage() {
  const error = useRouteError();

  const ShowMessage = () => {
    const [showError, setShowError] = useState(true);

    if (isRouteErrorResponse(error)) {
      return (
        <Tooltip message={error.data}>
          <h1 className={'text-6xl font-light'}>{error.status}</h1>
          <h2 className={'text-2xl font-bold'}>{error.statusText}</h2>
        </Tooltip>
      );
    } else if (error instanceof Error) {
      return (
        <>
          <h1 className={'text-4xl font-light py-2'}>Exception error</h1>
          {showError && (
            <div
              className={
                'flex flex-col my-4 gap-2 bg-red-500 px-4 py-6 text-white rounded-lg'
              }
            >
              <div
                className={
                  'flex flex-row gap-2 align-middle items-baseline justify-start'
                }
              >
                <p className={'font-normal text-2xl'}>Message:</p>
                <p className={'font-light text-xl'}>{error.message}</p>
              </div>

              <hr className={'border-gray-300 border-t-2 w-full'} />

              <div className={'overflow-auto py-2'}>
                <p className={''}>The stack trace is:</p>
                <pre className={'font-light'}>{error.stack}</pre>
              </div>
            </div>
          )}
        </>
      );
    } else {
      return <HeaderText title={`Unknown Error`} weight={1} />;
    }
  };

  return (
    <GradientAnimatedBackground>
      <div className={'pt-16 h-screen max-md:overflow-y-scroll'}>
        <MainResponsiveLayout>
          <div
            className={
              'flex flex-col gap-2 bg-white rounded-lg px-6 py-8 shadow-xl inset-shadow-sm'
            }
          >
            <ShowMessage />

            <div
              className={'flex flex-row justify-between items-stretch gap-2'}
            >
              <ButtonLink label={'Regresar'} to={'/'} theme={'gray'} />
              <ButtonLink
                label={'Soporte tecnico'}
                to={'/support'}
                theme={'teal'}
              />
            </div>
          </div>
        </MainResponsiveLayout>
      </div>
      <FooterPresentation />
    </GradientAnimatedBackground>
  );
}

export default ErrorPage;
