import { IconType } from 'react-icons';
import Link from 'next/link';
import LinkProps from '@components/text/LinkProps.ts';

interface IconLinkProps extends LinkProps {
  icon: IconType;
}

function IconLink({ label, icon, to, external = false }: IconLinkProps) {
  const Icon = icon;

  return (
    external ? (
      <a
        className={
          'flex flex-row items-center gap-1 rounded-2xl hover:text-gray-300'
        }
        href={to}
        target="_blank"
        rel="noreferrer"
      >
        <Icon />
        <p>{label}</p>
      </a>
    ) : (
      <Link
        className={
          'flex flex-row items-center gap-1 rounded-2xl hover:text-gray-300'
        }
        href={to}
      >
        <Icon />
        <p>{label}</p>
      </Link>
    )
  );
}

export default IconLink;
