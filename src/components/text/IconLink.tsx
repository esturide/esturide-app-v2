import { IconType } from 'react-icons';
import { Link } from 'react-router';
import LinkProps from '@components/text/LinkProps.ts';

interface IconLinkProps extends LinkProps {
  icon: IconType;
}

function IconLink({ label, icon, to, external = false }: IconLinkProps) {
  const Icon = icon;

  return (
    <Link
      className={
        'flex flex-row items-center gap-1 rounded-2xl hover:text-gray-300'
      }
      to={to}
      target={external ? '_blank' : '_self'}
    >
      <Icon />
      <p>{label}</p>
    </Link>
  );
}

export default IconLink;
