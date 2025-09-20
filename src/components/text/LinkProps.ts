import { IconType } from 'react-icons';
import { To } from 'react-router-dom';

interface LinkProps {
  label: string;
  to: string | To;
  external?: boolean;
}

export default LinkProps;
