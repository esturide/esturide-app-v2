import React from 'react';
import { ItemType } from './types';
import { FaQuestion } from 'react-icons/fa';
import { IconType } from 'react-icons';
import ColorTheme from '$libs/types/Theme.ts';

interface NavItemProps {
  item: ItemType;
  isActive: boolean;
  onClick: () => void;
  color: ColorTheme;
}

const NavItem: React.FC<NavItemProps> = ({
  item,
  isActive,
  onClick,
  color,
}) => {
  let Icon: IconType = FaQuestion;

  if (item.icon !== undefined) {
    Icon = item.icon;
  }

  return (
    <li className="flex-1">
      <button
        className={`w-full h-full flex flex-col items-center justify-center`}
        onClick={onClick}
        aria-label={item.label}
        aria-current={isActive ? 'page' : undefined}
      >
        <Icon aria-hidden="true" color={isActive ? `${color}` : 'black'} />
        <span className="text-xs mt-1">{item.label}</span>
      </button>
    </li>
  );
};

export default NavItem;
