import AccountContext from '@context/AccountContext';
import { useContext } from 'react';

const useAccount = () => {
  const account = useContext(AccountContext);
  if (account === null) {
    throw new Error('useAccount must be used within a UserAccount.Provider');
  }
  return account;
}

export default useAccount;

