import { IconType } from 'react-icons';

export type DefaultColor = 'green' | 'purple';

export interface NavItemType {
  icon: IconType;
  label: string;
  action?: () => Promise<void>;
}
