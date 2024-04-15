import { useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { RootStackParamList } from '@screens';
import { StackNavigationProp } from "@react-navigation/stack";
import UserMenu from '@src/screens/User/components/UserMenu';

type Props = {
  title: string;
  navigation: StackNavigationProp<RootStackParamList, 'Admin'>;
}

const AdminHeader = ({ title, navigation }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Appbar.Header
      style={{
        height: 50,
      }}
    >
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
      </Menu>
      <Appbar.Content title={title} />
      <UserMenu 
        navigation={navigation}
        Appbar={Appbar} 
      />
    </Appbar.Header>
  );
};

export default AdminHeader;

