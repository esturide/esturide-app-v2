import React, { createContext, useContext, useEffect } from 'react';

import { UserStatus } from '$libs/types/UserStatus.ts';
import { atom, useAtom } from 'jotai';

interface AuthContextType {
  status: UserStatus;
  user: any;
  login: (token: string) => void;
  logout: () => void;
}

const authStatusAtom = atom<UserStatus>('unauthenticated');
const tokenAtom = atom<string>('');

const UserAuthContext = createContext<AuthContextType | undefined>(undefined);

export const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useAtom(authStatusAtom);
  const [user, setUser] = useAtom(tokenAtom);

  useEffect(() => {
    /* Check if token is valid */
  }, []);

  const login = () => {
    /* Login user and set if valid token */
  };

  const logout = () => {
    /* Logout user and clear resources */
  };

  return (
    <UserAuthContext.Provider value={{ status, user, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = (): AuthContextType => {
  const context = useContext(UserAuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
