import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

interface UserManagerProps {
  isAuthenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
  token: string;
}

const UserManagerContext = createContext<UserManagerProps>({
  isAuthenticated: false,
  setAuthenticated: () => {},
  token: '',
});

export const UserManagerProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const props: UserManagerProps = {
    isAuthenticated: isAuthenticated,
    setAuthenticated: (authenticated: boolean) => {
      setIsAuthenticated(authenticated);
    },
    token: '',
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
