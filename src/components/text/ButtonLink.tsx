import LinkProps from '@components/text/LinkProps.ts';
import Link from 'next/link';
import ColorTheme from '$libs/types/Theme.ts';

interface ButtonLinkProps extends LinkProps {
  theme?: ColorTheme;
}

function ButtonLink({
  label,
  to,
  external = false,
  theme = 'teal',
}: ButtonLinkProps) {
  const buttonStyle = {
    gray: 'w-full justify-center flex bg-gray-400 inset-shadow-sm/50 inset-shadow-gray-500/50 text-white py-2 px-4 rounded-xl hover:text-gray-100 hover:inset-shadow-sm',
    teal: 'w-full justify-center flex bg-teal-400 inset-shadow-sm/50 inset-shadow-teal-500/50 text-white py-2 px-4 rounded-xl hover:text-gray-100 hover:inset-shadow-sm',
    indigo:
      'w-full justify-center flex bg-indigo-400 inset-shadow-sm/50 inset-shadow-indigo-500/50 text-white py-2 px-4 rounded-xl hover:text-gray-100 hover:inset-shadow-sm',
  };

  return (
    external ? (
      <a
        className={buttonStyle[theme]}
        href={to}
        target="_blank"
        rel="noreferrer"
      >
        <p>{label}</p>
      </a>
    ) : (
      <Link className={buttonStyle[theme]} href={to}>
        <p>{label}</p>
      </Link>
    )
  );
}

export default ButtonLink;
