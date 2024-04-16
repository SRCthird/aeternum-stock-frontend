import { useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { RootStackParamList } from '@screens';
import { StackNavigationProp } from "@react-navigation/stack";
import { mode } from '../types';
import UserMenu from '@src/screens/User/components/UserMenu';
import { useAccount } from '@src/context/AccountContext';

type Props = {
  title: string;
  setMode: (mode: mode) => void;
  navigation: StackNavigationProp<RootStackParamList, 'Actions'>;
}

const Header = ({ title, setMode, navigation }: Props) => {
  const { user } = useAccount();
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
          title="Actions"
          onPress={() => {
            setMode('actions');
            closeMenu();
          }}
        />
        {user?.role === 'Admin' && (
          <Menu.Item
            title="Admin"
            onPress={() => {
              navigation.navigate('Admin');
              closeMenu();
            }}
          />
        )}
        <Menu.Item
          title="Test elements"
          onPress={() => {
            navigation.navigate('Test');
            closeMenu();
          }}
        />
        <Menu.Item
          title="Logs"
          onPress={() => {
            navigation.navigate('Log');
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

export default Header;

