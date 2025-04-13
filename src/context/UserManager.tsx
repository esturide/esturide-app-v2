import React, { createContext, PropsWithChildren, useContext } from 'react';

const UserManagerContext = createContext({});

export const UserManagerProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <UserManagerContext.Provider value={{}}>
      {children}
    </UserManagerContext.Provider>
  );
};

export const useUserManager = () => {
  return useContext(UserManagerContext);
};
