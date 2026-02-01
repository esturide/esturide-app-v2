import React, { useId } from 'react';
import { ItemType } from './types';
import { FaQuestion } from 'react-icons/fa';
import { IconType } from 'react-icons';
import ColorTheme from '$libs/types/Theme.ts';
import { NavLink } from 'react-router';

interface NavItemProps {
  item: ItemType;
  isActive: boolean;
  onClick?: () => void;
  color: ColorTheme;
}

const NavItem: React.FC<NavItemProps> = ({ item, isActive, color }) => {
  const id = useId();
  let Icon: IconType = FaQuestion;

  if (item.icon !== undefined) {
    Icon = item.icon;
  }

  return (
    <NavLink
      id={id}
      className={'w-full h-full flex flex-col items-center justify-center'}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
      to={item.href}
    >
      <Icon aria-hidden="true" color={isActive ? `${color}` : 'black'} />
      <span className="text-xs mt-1">{item.label}</span>
    </NavLink>
  );
};

export default NavItem;
