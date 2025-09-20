import { IconType } from 'react-icons';
import { Link } from 'react-router';
import { To } from 'react-router-dom';

type Props = {
  label: string;
  icon: IconType;
  to: string | To;
  external?: boolean;
};

function IconLink({ label, icon, to, external = false }: Props) {
  const Icon = icon;

  return (
    <Link
      className={
        'flex flex-row items-center gap-1 p-2 rounded-2xl hover:bg-white hover:text-black'
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
