import HeaderText from '@components/text/HeaderText.tsx';

import '@styles/background/gradient/gradient-animation-card.scss';

type Props = {
  title: string;
};

function SimpleCarPresentation({
  title,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className={
        'bg-gradient-animated-card flex flex-col items-start gap-2 bg-white rounded-lg px-6 py-4 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out'
      }
    >
      <HeaderText title={title} weight={1} />
      {children}
    </div>
  );
}

export default SimpleCarPresentation;
