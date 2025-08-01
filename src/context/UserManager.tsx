import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { atom, useAtom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import Cookies from 'js-cookie';

const defaultTokenExpire = 7;

interface UserManagerProps {
  isAuthenticated: boolean;
  token: string;
}

const UserManagerContext = createContext<UserManagerProps>({
  isAuthenticated: false,
  token: '',
});

const cookieStorage = createJSONStorage<string>(() => ({
  getItem: (key: string) => {
    const value = Cookies.get(key);

    return value ? JSON.parse(value).get('token') : null;
  },
  setItem: (key: string, newValue: string) => {
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [useToken, setToken] = useAtom(userToken);

  const props: UserManagerProps = {
    isAuthenticated: isAuthenticated,
    token: useToken,
  };

  return (
    <UserManagerContext.Provider value={props}>
      {children}
    </UserManagerContext.Provider>
  );
};

export const useUserManager = () => {
  return useContext(UserManagerContext);
};
