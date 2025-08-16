import React from 'react';
import { IconContext } from 'react-icons';
import { ItemType } from '@components/navbar/types.ts';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import NavItem from '@components/navbar/NavItem.tsx';
import ColorTheme from '$libs/types/Theme.ts';

interface NavigationBarProps {
  items: ItemType[];
  theme?: ColorTheme;
}

const MobileNavigationBar: React.FC<NavigationBarProps> = ({
  items,
  theme = 'teal',
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
      className={'fixed bottom-0 w-full bg-white text-white shadow-md'}
      role="navigation"
    >
      <IconContext.Provider
        value={{
          size: '1.5em',
          color: theme === 'teal' ? '#4CAF50' : '#8E24AA',
        }}
      >
        <ul className="flex justify-between items-center mt-5">
          {items.map((item, index) => (
            <NavItem
              key={index}
              item={item}
              isActive={item.href == currentPath}
              onClick={async () => {
                await handleItemClick(item);
                navigate(item.href);
              }}
              color={theme}
            />
          ))}
        </ul>
      </IconContext.Provider>
    </nav>
  );
};

export default MobileNavigationBar;
