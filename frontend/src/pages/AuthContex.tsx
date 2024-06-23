import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string;
  roles: number[];
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUsernameB: React.Dispatch<React.SetStateAction<string>>;
  setRoles: React.Dispatch<React.SetStateAction<number[]>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsernameB] = useState<string>('');
  const [roles, setRoles] = useState<number[]>([]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, roles, setIsAuthenticated, setUsernameB, setRoles }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
