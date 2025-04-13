import { IconType } from 'react-icons';

export type DefaultColor = 'green' | 'purple';

export interface NavigationItemType {
  icon: IconType;
  label: string;
  action?: () => Promise<void>;
}

export interface NavigationType {
  name: string;
  href: string;
  current: boolean;
  action?: () => Promise<void>;
}
