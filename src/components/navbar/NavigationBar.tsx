import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import NavItem from './NavItem';
import { DefaultColor, NavItemType } from './types';

interface NavigationBarProps {
  items: NavItemType[];
  color?: DefaultColor;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  items,
  color = 'green',
}) => {
  const [activeItem, setActiveItem] = useState<string>(items[0]?.label || '');

  const handleItemClick = async (item: NavItemType) => {
    setActiveItem(item.label);
    if (item.action) {
      await item.action();
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white shadow-lg"
      role="navigation"
    >
      <IconContext.Provider
        value={{
          size: '1.5em',
          color: color === 'green' ? '#4CAF50' : '#8E24AA',
        }}
      >
        <ul className="flex justify-around items-center h-16">
          {items.map((item, index) => (
            <NavItem
              key={index}
              item={item}
              isActive={activeItem === item.label}
              onClick={() => handleItemClick(item)}
              color={color}
            />
          ))}
        </ul>
      </IconContext.Provider>
    </nav>
  );
};

export default NavigationBar;
