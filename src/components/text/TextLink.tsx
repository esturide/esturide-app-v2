import LinkProps from '@components/text/LinkProps.ts';
import Link from 'next/link';

type TextWeight = 'bold' | 'normal' | 'light';

interface TextLinkProps extends LinkProps {
  weight?: TextWeight;
}

function TextLink({
  label,
  to,
  weight = 'normal',
  external = false,
}: TextLinkProps) {
  const Text = () => {
    if (weight === 'normal') {
      return <p>{label}</p>;
    } else if (weight === 'bold') {
      return <b>{label}</b>;
    } else if (weight === 'light') {
      return <p className={'text-sm font-light'}>{label}</p>;
    }
  };

  return (
    external ? (
      <a
        className={'flex hover:text-gray-300'}
        href={to}
        target="_blank"
        rel="noreferrer"
      >
        <Text />
      </a>
    ) : (
      <Link className={'flex hover:text-gray-300'} href={to}>
        <Text />
      </Link>
    )
  );
}

export default TextLink;
