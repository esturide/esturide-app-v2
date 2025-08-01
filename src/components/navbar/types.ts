import { IconType } from 'react-icons';

export type DefaultColor = 'green' | 'purple';

export interface ItemType {
  label: string;
  href: string;
  current: boolean;
  action?: () => Promise<void>;
  icon?: IconType;
}
