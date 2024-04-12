import LoginScreen from "./Login";
import { ReactNode, useState } from "react";
import { View } from "react-native";
import CreateAccount from "./CreateAccount";
import LinkAccount from "./LinkAccount";
import useUser from "./Hooks/useUser";
import AccountContext from "@context/AccountContext";

type Props = {
  children?: ReactNode;
}

export type mode = 'login' | 'createAccount' | 'link' | 'loggedIn';
const LoginIndex = ({ children }: Props) => {
  const [mode, setMode] = useState<mode>('login');
  const [user, setUser] = useState("");

  const { user: activeUser, error, loading } = useUser({ email: user });

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
        <AccountContext.Provider value={activeUser}>
          <View style={{ flex: 1 }}>
            {children}
          </View>
        </AccountContext.Provider>
      );
  }
}
export default LoginIndex;
