import { User } from '@src/screens/Authenticate/Hooks/useUser';
import {Dispatch, SetStateAction, createContext} from 'react';
import { useContext } from 'react';

type AccountContextType = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const AccountContext = createContext<AccountContextType | null>(null);

export const useAccount = () => {
  const account = useContext(AccountContext);
  if (account === null) {
    throw new Error('useAccount must be used within a UserAccount.Provider');
  }
  return account;
}

export default AccountContext;
