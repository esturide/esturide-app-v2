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
import UserRole from '$libs/types/UserRole.ts';
import { getUserRole, setUserRole } from '$libs/request/role.ts';

interface UserManagerProps {
  isAuthenticated: boolean;
  login: (code: number, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  refresh: () => Promise<boolean>;
  refreshRole: (role: UserRole) => Promise<boolean>;
  role: UserRole;
}

const storage = createCookieStorage<string>({
  expires: 7 * 24 * 60 * 60,
  secure: true,
  sameSite: 'lax',
});

const authTokenStorage = atomWithStorage<string>('authToken', '', storage);

const UserManagerContext = createContext<UserManagerProps>({
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: async (code: number, password: string) => {
    return false;
  },
  logout: async () => {
    return false;
  },
  refresh: async () => {
    return false;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  refreshRole: async (role: UserRole) => {
    return false;
  },
  role: 'not-verified',
});

export const UserManagerProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useAtom(authTokenStorage);
  const [isAuthenticated, setIsAuthenticated] = useState(
    authToken?.length != 0,
  );
  const [currentRole, setCurrentRole] = useState<UserRole>('not-verified');

  useEffect(() => {
    if (authToken.length != 0) {
      console.log(`Current token: ${authToken}`);

      configHeaderAuthToken(authToken);
      setIsAuthenticated(authToken.length != 0);
    } else {
      console.log('Token not found!');
    }
  }, [authToken]);

  useEffect(() => {
    const request = async () => {
      if (authToken.length != 0) {
        await getUserRole(getRequestRoot(), setCurrentRole);
      }
    };

    request();
  }, [authToken]);

  const removeAuthToken = async () => {
    await setAuthToken('');
    await storage.removeItem('authToken');
  };

  const login = async (code: number, password: string) => {
    const statusLogin = await loginUser(
      getRequestRoot(),
      {
        code: code,
        password: password,
      },
      setAuthToken,
    );

    const statusRole = await getUserRole(getRequestRoot(), setCurrentRole);
    const status = statusLogin && statusRole;

    if (status) {
      console.log(`Login successfully, current role: ${currentRole}`);
    }

    return statusLogin && statusRole;
  };

  const logout = async () => {
    setIsAuthenticated(false);
    await removeAuthToken();

    return true;
  };

  const refresh = async () => {
    return authToken.length != 0;
  };

  const refreshRole = async (role: UserRole) => {
    const status = await setUserRole(getRequestRoot(), role, setAuthToken);

    if (status) {
      setCurrentRole(role);
    }

    return status;
  };

  const props: UserManagerProps = {
    isAuthenticated: isAuthenticated,
    login: login,
    logout: logout,
    refresh: refresh,
    refreshRole: refreshRole,
    role: currentRole,
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
