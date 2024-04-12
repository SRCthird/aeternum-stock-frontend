import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@screens";
import LoginScreen from "./Login";
import { useState } from "react";
import { View } from "react-native";
import CreateAccount from "./CreateAccount";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}

export type mode = 'login' | 'createAccount' | 'link';
const LoginIndex = ({ navigation }: Props) => {
  const [mode, setMode] = useState<mode>('login');
  
  return (
    <View style={{ flex: 1 }}>
    {mode === 'login' && (
      <LoginScreen 
        navigation={navigation} 
        setMode={setMode}
      />
    )}
    {mode === 'createAccount' && (
      <CreateAccount 
        setMode={setMode}
      />
    )}
    </View>
  )
}

export default LoginIndex;
