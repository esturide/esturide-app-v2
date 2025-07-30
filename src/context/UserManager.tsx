import React, { createContext, PropsWithChildren, useContext } from 'react';
import { atom, useAtom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import Cookies from 'js-cookie';

const defaultTokenExpire = 7;

const UserManagerContext = createContext({});

const isAuthenticate = atom(false);

const cookieStorage = createJSONStorage(() => ({
  getItem: (key: string) => {
    const value = Cookies.get(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error(`Error parsing cookie for key ${key}:`, e);
      return null;
    }
  },
  setItem: (key: string, newValue: any) => {
    Cookies.set(key, JSON.stringify(newValue), { expires: defaultTokenExpire });
  },
  removeItem: (key: string) => {
    Cookies.remove(key);
  },
}));

const atomStorage = atomWithStorage('userToken', '', cookieStorage);

const userToken = atom(
  get => {
    return get(atomStorage);
  },
  (get, set, value) => {
    return set(atomStorage, value);
  },
);

export const UserManagerProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [authenticate, setAuthenticate] = useAtom(isAuthenticate);
  const [useToken, setToken] = useAtom(userToken);

  return (
    <UserManagerContext.Provider value={{}}>
      {children}
    </UserManagerContext.Provider>
  );
};

export const useUserManager = () => {
  return useContext(UserManagerContext);
};
