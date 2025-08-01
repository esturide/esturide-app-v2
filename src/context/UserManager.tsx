import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

interface UserManagerProps {
  isAuthenticated: boolean;
  token: string;
}

const UserManagerContext = createContext<UserManagerProps>({
  isAuthenticated: false,
  token: '',
});

export const UserManagerProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const props: UserManagerProps = {
    isAuthenticated: isAuthenticated,
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
