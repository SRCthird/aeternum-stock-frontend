import LoginScreen, { api } from "./Login";
import { ReactNode, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import CreateAccount from "./CreateAccount";
import LinkAccount from "./LinkAccount";
import { User } from "./Hooks/useUser";
import AccountContext from "@context/AccountContext";
import { CanceledError } from "axios";
import AuthContext from "@src/context/AuthContext";

type Props = {
  children: ReactNode;
}

export type authState = 'login' | 'createAccount' | 'link' | 'loggedIn';

const Authenticate = ({ children }: Props) => {
  const [auth, setAuth] = useState<authState>('login');

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeUser, setActiveUser] = useState<User>({
    id: 0,
    email: '',
    password: '',
    role: '',
    created_at: ''
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
    if (user !== "" && auth === 'loggedIn') handleLogin();
  }, [user, auth]);

  switch (auth) {
    case 'login':
      return (
        <View style={{ flex: 1 }}>
          <LoginScreen
            setMode={setAuth}
            setUser={setUser}
            passPassword={setPassword}
          />
        </View>
      );
    case 'createAccount':
      return (
        <View style={{ flex: 1 }}>
          <CreateAccount
            setMode={setAuth}
          />
        </View>
      );
    case 'link':
      return (
        <View style={{ flex: 1 }}>
          <LinkAccount
            setMode={setAuth}
            _user={user}
            _password={password}
          />
        </View>
      );
    case 'loggedIn':
      return (
        <View style={{ flex: 1 }}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <AuthContext.Provider value={{ setAuth }}>
              <AccountContext.Provider value={{ 
                user: activeUser, 
                setUser: setActiveUser 
              }}>
                {children}
              </AccountContext.Provider>
            </AuthContext.Provider>
          )}
        </View>
      );
  }
}
export default Authenticate;
