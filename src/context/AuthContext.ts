import { createContext, useContext } from 'react';

type AuthContextType = {
  setAuth: (mode: 'login' | 'createAccount' | 'link' | 'loggedIn') => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export default AuthContext;

