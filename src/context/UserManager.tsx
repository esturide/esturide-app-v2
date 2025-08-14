import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { loginUser } from '$libs/request/login.ts';
import { configHeaderAuthToken, getRequestRoot } from '$libs/request/api.ts';

interface UserManagerProps {
  isAuthenticated: boolean;
  login: (code: number, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [authToken, setAuthToken] = useState<string>('');

  useEffect(() => {
    configHeaderAuthToken(authToken);
  }, [authToken]);

  const login = async (code: number, password: string) => {
    const status = await loginUser(
      getRequestRoot(),
      {
        code: code,
        password: password,
      },
      setAuthToken,
    );

    setIsAuthenticated(status);

    console.log(`Login event: ${code} ${password} ${status}`);

    return status;
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
