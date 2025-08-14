import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAtom } from 'jotai';
import { loginUser } from '$libs/request/login.ts';
import { configHeaderAuthToken, getRequestRoot } from '$libs/request/api.ts';
import { atomWithStorage } from 'jotai/utils';
import createCookieStorage from '$libs/storage/cookies.ts';
import { checkToken } from '$libs/request/check.ts';

interface UserManagerProps {
  isAuthenticated: boolean;
  login: (code: number, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

const authTokenStorage = atomWithStorage<string>(
  'authToken',
  '',
  createCookieStorage({
    expires: 7 * 24 * 60 * 60,
    secure: true,
    sameSite: 'lax',
  }),
);

const UserManagerContext = createContext<UserManagerProps>({
  isAuthenticated: false,
  login: async (code: number, password: string) => {
    return false;
  },
  logout: async () => {
    return false;
  },
});

export const UserManagerProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authToken, setAuthToken] = useAtom(authTokenStorage);

  useEffect(() => {
    configHeaderAuthToken(authToken);
  }, [authToken]);

  useEffect(() => {
    const request = async () => {
      if (authToken.length != 0) {
        await checkToken(getRequestRoot(), setIsAuthenticated);
      }
    };

    request();
  }, [authToken, isAuthenticated]);

  const login = async (code: number, password: string) => {
    return await loginUser(
      getRequestRoot(),
      {
        code: code,
        password: password,
      },
      setAuthToken,
    );
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setAuthToken('');
    return true;
  };

  const props: UserManagerProps = {
    isAuthenticated: isAuthenticated,
    login: login,
    logout: logout,
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
