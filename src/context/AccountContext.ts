import { User } from '@src/screens/Authenticate/Hooks/useUser';
import {createContext} from 'react';
import { useContext } from 'react';

const AccountContext = createContext<User | null>(null);

export const useAccount = () => {
  const account = useContext(AccountContext);
  if (account === null) {
    throw new Error('useAccount must be used within a UserAccount.Provider');
  }
  return account;
}

export default AccountContext;
