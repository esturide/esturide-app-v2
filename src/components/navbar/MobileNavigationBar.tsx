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
    <div
      className={'fixed bottom-2 left-1/2 transform -translate-x-1/2 w-full'}
    >
      <nav
        className={
          ' pt-3.5 pb-2.5 mx-4 bg-red-500/50 rounded-2xl z-50 text-gray-900'
        }
        role="navigation"
      >
        <IconContext.Provider
          value={{
            size: '1.5em',
            color: theme === 'teal' ? '#4CAF50' : '#8E24AA',
          }}
        >
          <ul className="flex justify-between items-center">
            {items.map((item, index) => (
              <CurrentNavItem index={index} item={item} />
            ))}
          </ul>
        </IconContext.Provider>
      </nav>
    </div>
  );
};

export default MobileNavigationBar;
