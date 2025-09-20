import React, { JSX, useEffect } from 'react';

type Props = {
  title: string;
  weight: number;
};

const weightStyle = [
  'text-4xl',
  'text-3xl',
  'text-2xl',
  'text-xl',
  'text-lg',
  'text-xl',
] as const;

function HeaderText({ title, weight }: Props) {
  const Header = `h${weight}` as keyof JSX.IntrinsicElements;

  useEffect(() => {
    if (weight == 0 || weight > weightStyle.length) {
      throw Error('Invalid weight style.');
    }
  }, [weight]);

  return (
    <Header className={`text-lg font-semibold ${weightStyle[weight + 1]}`}>
      {title}
    </Header>
  );
}

export default HeaderText;
