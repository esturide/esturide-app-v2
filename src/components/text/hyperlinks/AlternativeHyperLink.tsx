import React from 'react';
import { Link } from 'react-router';

type Props = {
  label: string;
  onClick?: () => Promise<void>;
};

const AlternativeHyperLink: React.FC<Props> = ({
  label,
  onClick = async () => {},
}) => {
  const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    await onClick();
  };

  return (
    <div className="w-full justify-center items-center flex flex-col text-sm font-bold rounded-none max-w-[196px] text-zinc-700 hover:text-zinc-500">
      <Link
        to="#"
        onClick={handleClick}
        className="text-center subpixel-antialiased font-sans w-full font-light align-middle"
        role="button"
        aria-label={label}
      >
        {label}
      </Link>
      <div
        className="mt-1 w-full border border-solid border-zinc-500 min-h-[1px]"
        aria-hidden="true"
      />
    </div>
  );
};

export default AlternativeHyperLink;
