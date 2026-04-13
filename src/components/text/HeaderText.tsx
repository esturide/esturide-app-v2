import React, { JSX, useEffect } from 'react';

type Props = {
  title: string;
  weight: number;
};

function HeaderText({ title, weight }: Props) {
  const Header = `h${weight}` as keyof JSX.IntrinsicElements;

  const weightStyle = [
    'text-4xl font-semibold',
    'text-3xl font-semibold',
    'text-2xl font-semibold',
    'text-xl font-semibold',
    'text-lg font-semibold',
    'text-xl font-semibold',
  ] as const;

  useEffect(() => {
    if (weight == 0 || weight > weightStyle.length) {
      throw Error('Invalid weight style.');
    }
  }, [weight]);

  return <Header className={weightStyle[weight + 1]}>{title}</Header>;
}

export default HeaderText;
