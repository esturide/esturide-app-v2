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

interface UserManagerProps {
  isAuthenticated: boolean;
  login: (code: number, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  refresh: () => Promise<boolean>;
}

const storage = createCookieStorage<string>({
  expires: 7 * 24 * 60 * 60,
  secure: true,
  sameSite: 'lax',
});

const authTokenStorage = atomWithStorage<string>('authToken', '', storage);

const UserManagerContext = createContext<UserManagerProps>({
  isAuthenticated: false,
  login: async (code: number, password: string) => {
    return false;
  },
  logout: async () => {
    return false;
  },
  refresh: async () => {
    return false;
  },
});

export const UserManagerProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useAtom(authTokenStorage);
  const [isAuthenticated, setIsAuthenticated] = useState(authToken.length != 0);

  useEffect(() => {
    console.log(authToken, isAuthenticated);
  }, [authToken, isAuthenticated]);

  useEffect(() => {
    configHeaderAuthToken(authToken);
  }, [authToken]);

  useEffect(() => {
    setIsAuthenticated(authToken.length != 0);
  }, [authToken]);

  const removeAuthToken = async () => {
    await setAuthToken('');
    await storage.removeItem('authToken');
  };

  const login = async (code: number, password: string) => {
    const status = await loginUser(
      getRequestRoot(),
      {
        code: code,
        password: password,
      },
      setAuthToken,
    );

    return status;
  };

  const logout = async () => {
    setIsAuthenticated(false);
    await removeAuthToken();

    return true;
  };

  const refresh = async () => {
    return authToken.length != 0;
  };

  const props: UserManagerProps = {
    isAuthenticated: isAuthenticated,
    login: login,
    logout: logout,
    refresh: refresh,
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
