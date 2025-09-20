import React, { JSX } from 'react';

type Props = {
  title: string;
  weight: number;
};

function HeaderText({ title, weight }: Props) {
  const Header = `h${weight}` as keyof JSX.IntrinsicElements;

  return <Header className={'text-lg font-semibold'}>{title}</Header>;
}

export default HeaderText;
