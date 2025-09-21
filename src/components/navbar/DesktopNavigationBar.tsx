import React from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { ItemType } from '@components/navbar/types.ts';
import { FaBell, FaUser } from 'react-icons/fa';
import { LuMenu } from 'react-icons/lu';
import { useUserManager } from '@/context/UserManager.tsx';
import { useNavigate } from 'react-router-dom';
import LogoResource from '@assets/images/logo.png';
import { Link } from 'react-router';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  items: ItemType[];
};

const DesktopNavigationBar: React.FC<Props> = ({ items }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useUserManager();

  const handleItemClick = async (item: ItemType) => {
    if (item.action) {
      await item.action();
    }
  };

  const Notifications = () => {
    const onCLick = async () => {
      navigate('/notify');
    };

    return (
      <button
        type="button"
        className="relative rounded-full p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
        onClick={onCLick}
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View notifications</span>
        <FaBell color={'white'} />
      </button>
    );
  };

  const MenuUser = () => {
    return (
      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton className="relative p-2 flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <FaUser color={'white'} />
          </MenuButton>
        </div>
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <MenuItem>
            <Link
              to={'/home/profile'}
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
            >
              Your Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to={'/home/settings'}
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
            >
              Settings
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to={'/'}
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
              onClick={logout}
            >
              Sign out
            </Link>
          </MenuItem>
        </MenuItems>
      </Menu>
    );
  };

  return (
    <Disclosure
      as="nav"
      className="fixed top-0 w-full z-50 bg-teal-700 inset-shadow-sm inset-shadow-teal-800 shadow-lg"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open menu</span>
              <LuMenu />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img alt="logo" src={LogoResource} className="h-8 w-auto" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {items.map(item => (
                  <a
                    key={item.label}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white font-bold'
                        : 'text-white hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                    onClick={async () => {
                      await handleItemClick(item);
                      navigate(item.href);
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            {isAuthenticated && (
              <>
                <Notifications />
                <MenuUser />
              </>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {items.map(item => (
            <DisclosureButton
              key={item.label}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current
                  ? 'bg-gray-900 text-white font-bold'
                  : 'text-white hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.label}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default DesktopNavigationBar;
