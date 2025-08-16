import { IconType } from 'react-icons';

export interface ItemType {
  label: string;
  href: string;
  current: boolean;
  action?: () => Promise<void>;
  icon?: IconType;
}
