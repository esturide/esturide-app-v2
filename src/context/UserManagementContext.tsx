import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import useIntervalEffect from '$libs/effects/useIntervalEffect.ts';
import { loginUser } from '$libs/request/login.ts';
import { configHeaderAuthToken, getRequestRoot } from '$libs/request/api.ts';
import createCookieStorage from '$libs/storage/cookies.ts';
import UserRole from '$libs/types/UserRole.ts';
import { getUserRole, setUserRole } from '$libs/request/role.ts';
import { refreshToken } from '$libs/request/authToken.ts';

const AUTH_CHECK_INTERVAL = 1000 * 60 * 5;

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

const authTokenStorage = atomWithStorage<string>('authToken', '', storage, {
  getOnInit: true,
});

const UserManagerContext = createContext<UserManagerProps>({
  isAuthenticated: false,
  login: async () => {
    return false;
  },
  logout: async () => {
    return false;
  },
  refresh: async () => {
    return false;
  },
  refreshRole: async () => {
    return false;
  },
  role: 'not-verified',
});

export const UserManagementProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [authTokenCookiesStorage, setAuthTokenCookiesStorage] =
    useAtom(authTokenStorage);

  const [isAuthenticated, setIsAuthenticated] = useState(
    authTokenCookiesStorage?.length != 0,
  );
  const [currentRole, setCurrentRole] = useState<UserRole>('not-verified');
  const [authTokenCacheMemory, setAuthTokenCacheMemory] = useState(
    authTokenCookiesStorage,
  );
  const [headAuthTokenLoad, setHeadAuthTokenLoad] = useState(false);

  const requestRole = async () => {
    if (isAuthenticated && headAuthTokenLoad) {
      await getUserRole(getRequestRoot(), setCurrentRole);
    }
  };

  useIntervalEffect(async () => {
    await refreshToken(getRequestRoot(), setAuthTokenCacheMemory);
  }, AUTH_CHECK_INTERVAL);

  useEffect(() => {
    setAuthTokenCookiesStorage(authTokenCacheMemory);
  }, [authTokenCacheMemory]);

  useEffect(() => {
    setIsAuthenticated(authTokenCookiesStorage.length != 0);
  }, [authTokenCookiesStorage]);

  useEffect(() => {
    if (isAuthenticated) {
      configHeaderAuthToken(authTokenCookiesStorage);
    }

    setHeadAuthTokenLoad(isAuthenticated);
  }, [isAuthenticated, authTokenCookiesStorage]);

  useEffect(() => {
    requestRole();
  }, [headAuthTokenLoad]);

  const removeAuthToken = async () => {
    setAuthTokenCacheMemory('');
    await storage.removeItem('authToken');
  };

  const login = async (code: number, password: string) => {
    return await loginUser(
      getRequestRoot(),
      {
        code: code,
        password: password,
      },
      setAuthTokenCacheMemory,
    );
  };

  const logout = async () => {
    setIsAuthenticated(false);
    await removeAuthToken();

    return true;
  };

  const refresh = async () => {
    return authTokenCookiesStorage.length != 0;
  };

  const refreshRole = async (role: UserRole) => {
    const status = await setUserRole(
      getRequestRoot(),
      role,
      setAuthTokenCacheMemory,
    );

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

export const useUserManagerContext = () => {
  return useContext(UserManagerContext);
};
