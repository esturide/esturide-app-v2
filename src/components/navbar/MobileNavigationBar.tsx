import React from 'react';
import { IconContext } from 'react-icons';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import ColorTheme from '$libs/types/Theme.ts';
import { ItemType } from '@components/navbar/types.ts';
import NavItem from '@components/navbar/NavItem.tsx';

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
  const defaultPath = location.pathname;

  type CurrentNavProps = {
    index: number;
    item: ItemType;
  };

  const CurrentNavItem: React.FC<CurrentNavProps> = ({ index, item }) => {
    return (
      <NavItem
        key={index}
        item={item}
        isActive={defaultPath === item.href}
        onClick={async () => {
          await handleItemClick(item);

          navigate(item.href);
        }}
        color={theme}
      />
    );
  };

  const handleItemClick = async (item: ItemType) => {
    if (item.action) {
      await item.action();
    }
  };

  return (
    <nav
      className={'absolute bottom-0 w-full z-50 bg-white text-white'}
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
            <CurrentNavItem index={index} item={item} />
          ))}
        </ul>
      </IconContext.Provider>
    </nav>
  );
};

export default MobileNavigationBar;
