import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@screens";
import { mode } from "@src/utils/types";
import { Dispatch, SetStateAction, useState } from "react";
import { Appbar, Menu } from "react-native-paper";
import UserMenu from "./UserMenu";

type Props = {
  setMode: Dispatch<SetStateAction<mode>>;
  navigation: StackNavigationProp<RootStackParamList, 'User'>;
}

const UserHeader = ({ setMode, navigation }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Appbar style={{
      height: 80,
      width: '100%',
      paddingTop: 25,
      backgroundColor: 'white',
    }}>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action icon="menu" color="grey" onPress={openMenu} />
        }
      >
        <Menu.Item
          title="Home"
          onPress={() => {
            navigation.navigate('Actions');
            closeMenu();
          }}
        />
        <Menu.Item
          title="View Users"
          onPress={() => {
            setMode('add');
            closeMenu();
          }}
        />
      </Menu>
      <Appbar.Content
        title="Account"
        titleStyle={{ color: 'black' }}
      />
      <UserMenu
        navigation={navigation}
        Appbar={Appbar}
      />
    </Appbar>
  )
}

export default UserHeader;
