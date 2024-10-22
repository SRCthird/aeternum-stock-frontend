import { useAccount } from "@context/AccountContext";
import { useAuth } from "@src/context/AuthContext";
import { useTheme } from "@src/context/ThemeContext";
import { useState } from "react";
import { Menu } from "react-native-paper";

type Props = {
  navigation: any;
  Appbar: any;
}
const UserMenu = ({ navigation, Appbar }: Props) => {
  const styles = useTheme();
  const { user } = useAccount();
  const { setAuth } = useAuth();

  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => {
    setTimeout(() => setMenuVisible(true), 100);
  };
  //const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const logout = () => {
    setAuth('login');
  };

  return (
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      anchor={
        <Appbar.Action icon="account" color={styles.accents.color} onPress={openMenu} />
      }
    >
      <Menu.Item
        title={user.first_name + ' ' + user.last_name}
      />
      <Menu.Item
        title="View Account"
        onPress={() => {
          navigation.navigate('User');
          closeMenu();
        }}
      />
      {user.role === 'Admin' && (
        <Menu.Item
          title="Admin"
          onPress={() => {
            navigation.navigate('Admin');
            closeMenu();
          }}
        />
      )}
      <Menu.Item
        title="Logout"
        onPress={() => {
          logout();
          closeMenu();
        }}
      />
    </Menu>
  );
}

export default UserMenu;
