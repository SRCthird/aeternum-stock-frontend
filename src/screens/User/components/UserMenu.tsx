import { useAccount } from "@context/AccountContext";
import { useAuth } from "@src/context/AuthContext";
import { useState } from "react";
import { Menu } from "react-native-paper";

type Props = {
  Appbar: any;
}
const UserMenu = ({ Appbar }: Props) => {
  const user = useAccount();
  const { setAuth } = useAuth();

  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const logout = () => {
    setAuth('login');
  };

  return (
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      anchor={
        <Appbar.Action icon="account" color="grey" onPress={openMenu} />
      }
    >
      <Menu.Item
        title={user.email}
      />
      <Menu.Item
        title={user.firstName + ' ' + user.lastName}
      />
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
