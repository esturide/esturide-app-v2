import LinkProps from '@components/text/hyperlinks/LinkProps.ts';
import { Link } from 'react-router';

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
    <Link
      className={'flex hover:text-gray-300'}
      to={to}
      target={external ? '_blank' : '_self'}
    >
      <Text />
    </Link>
  );
}

export default TextLink;
