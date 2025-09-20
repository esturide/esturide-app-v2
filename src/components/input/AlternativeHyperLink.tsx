import React from 'react';

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
      <a
        href="#"
        onClick={handleClick}
        className="text-center subpixel-antialiased font-sans w-full font-light align-middle"
        role="button"
        aria-label={label}
      >
        {label}
      </a>
      <div
        className="mt-1 w-full border border-solid border-zinc-500 min-h-[1px]"
        aria-hidden="true"
      />
    </div>
  );
};

export default AlternativeHyperLink;
