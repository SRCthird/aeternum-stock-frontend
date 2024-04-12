import { User } from '@src/screens/Login/Hooks/useUser';
import {createContext} from 'react';

const AccountContext = createContext<User | null>(null);

export default AccountContext;
