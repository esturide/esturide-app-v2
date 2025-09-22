import React from 'react';
import { IconContext } from 'react-icons';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import ColorTheme from '$libs/types/Theme.ts';
import { ItemType } from '@components/navbar/types.ts';
import NavItem from '@components/navbar/NavItem.tsx';
import StyleTheme from '$libs/types/Style.ts';

import '@styles/navbar/navbar-mobile-animated-background.scss';

interface NavigationBarProps {
  items: ItemType[];
  theme?: ColorTheme;
  style?: StyleTheme;
  dark?: boolean;
}

const MobileNavigationBar: React.FC<NavigationBarProps> = ({
  items,
  theme = 'teal',
  style = 'solid',
  dark = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultPath = location.pathname;

  const styleThemes = {
    glass:
      'pt-3.5 pb-2.5 mx-4 navbar-mobile-animated-background bg-gradient-to-r from-gray-700/10 via-gray-100/85 to-gray-200/25 rounded-4xl z-50 text-gray-900 backdrop-blur-xs shadow-xl inset-shadow-sm',
    solid:
      'pt-3.5 pb-2.5 mx-4 bg-white rounded-4xl z-50 text-gray-900 inset-shadow-sm',
  };

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
      className={
        'fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full sm:w-2/3'
      }
    >
      <nav className={styleThemes[style]} role="navigation">
        <IconContext.Provider
          value={{
            size: '1.5em',
            color: theme === 'teal' ? '#4CAF50' : '#8E24AA',
          }}
        >
          <ul className={'flex justify-between items-center'}>
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
