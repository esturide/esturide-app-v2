import React from 'react';

type Props = {
  label: string;
  onClick?: () => Promise<void>;
};

const HyperLink: React.FC<Props> = ({ label, onClick = async () => {} }) => {
  const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    await onClick();
  };

  return (
    <div className="flex flex-col text-sm font-bold rounded-none max-w-[196px] text-zinc-700">
      <a
        href="#"
        onClick={handleClick}
        className="w-full"
        role="button"
        aria-label={label}
      >
        {label}
      </a>
      <div
        className="mt-1 w-full border border-solid border-zinc-700 min-h-[1px]"
        aria-hidden="true"
      />
    </div>
  );
};

export default HyperLink;
