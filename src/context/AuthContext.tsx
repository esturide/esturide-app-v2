import React, { createContext, useContext, useEffect, useState } from 'react';

import { UserStatus } from '$libs/types/UserStatus.ts';

interface AuthContextType {
  status: UserStatus;
  user: any;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useState<AuthContextType['status']>('idle');
  const [user, setUser] = useState<number>(0);

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
    <AuthContext.Provider value={{ status, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
