import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import NavItem from '@components/navbar/NavItem.tsx';
import { DefaultColor, ItemType } from '@components/navbar/types.ts';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';

interface NavigationBarProps {
  items: ItemType[];
  color?: DefaultColor;
}

const MobileNavigationBar: React.FC<NavigationBarProps> = ({
  items,
  color = 'green',
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleItemClick = async (item: ItemType) => {
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
              isActive={item.href == currentPath}
              onClick={() => {
                handleItemClick(item);
                navigate(item.href);
              }}
              color={color}
            />
          ))}
        </ul>
      </IconContext.Provider>
    </nav>
  );
};

export default MobileNavigationBar;
