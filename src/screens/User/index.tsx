import { Alert, Text, View } from "react-native";
import UserHeader from "./components/UserHeader";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "..";
import { useEffect, useState } from "react";
import { mode } from "@src/utils/types";
import { useAccount } from "@src/context/AccountContext";
import ViewProfile from "./ViewProfile";
import EditProfile from "./EditProfile";
import UserList from "./UserList";
import { User } from "../Authenticate/Hooks/useUser";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'User'>;
}
const UserIndex = ({ navigation }: Props) => {
  const [mode, setMode] = useState<mode>('view');
  const { user, setUser } = useAccount();
  const [selectedUser, setSelectedUser] = useState<User>(user);

  switch (mode) {
    case 'view':
      return (
        <View style={{ flex: 1 }}>
          <UserHeader
            setMode={setMode}
            navigation={navigation}
          />
          <ViewProfile
            setMode={setMode}
            user={selectedUser}
            navigation={navigation}
          />
        </View>
      );
    case 'edit':
      return (
        <View style={{ flex: 1 }}>
          <UserHeader
            setMode={setMode}
            navigation={navigation}
          />
          <EditProfile
            setMode={setMode}
            user={user}
            setUser={setUser}
          />
        </View>
      );
    case 'add':
      return (
        <View style={{ flex: 1 }}>
          <UserHeader
            setMode={setMode}
            navigation={navigation}
          />
          <UserList
            onUserSelect={(user) => {
              setSelectedUser(user);
              setMode('view');
            }}
          />
        </View>
      );
  }
}

export default UserIndex;
