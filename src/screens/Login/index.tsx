import LoginScreen, { api } from "./Login";
import { ReactNode, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import CreateAccount from "./CreateAccount";
import LinkAccount from "./LinkAccount";
import { User } from "./Hooks/useUser";
import AccountContext from "@context/AccountContext";
import { CanceledError } from "axios";

type Props = {
  children?: ReactNode;
}

export type mode = 'login' | 'createAccount' | 'link' | 'loggedIn';
const LoginIndex = ({ children }: Props) => {
  const [mode, setMode] = useState<mode>('login');
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeUser, setActiveUser] = useState<User>({
    id: 0,
    email: '',
    password: '',
    role: '',
    createdAt: '',
    updatedAt: ''
  });

  useEffect(() => {
    const handleLogin = () => {
      api.get('/api/user/?email=' + user)
        .then(res => {
          setActiveUser(res.data[0]);
          setLoading(false);
        })
        .catch(err => {
          if (err instanceof CanceledError) return;
          Alert.alert('Error', 'Invalid username or password');
        });
    }
    if (user !== "") handleLogin();
  }, [user]);

  switch (mode) {
    case 'login':
      return (
        <View style={{ flex: 1 }}>
          <LoginScreen
            setMode={setMode}
            setUser={setUser}
          />
        </View>
      );
    case 'createAccount':
      return (
        <View style={{ flex: 1 }}>
          <CreateAccount
            setMode={setMode}
          />
        </View>
      );
    case 'link':
      return (
        <View style={{ flex: 1 }}>
          <LinkAccount
            setMode={setMode}
          />
        </View>
      );
    case 'loggedIn':
      return (
        <View style={{ flex: 1 }}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <AccountContext.Provider value={activeUser}>
              {children}
            </AccountContext.Provider>
          )}
        </View>
      );
  }
}
export default LoginIndex;
