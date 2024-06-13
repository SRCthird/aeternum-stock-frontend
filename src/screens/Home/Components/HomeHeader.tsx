import { useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { RootStackParamList } from '@screens';
import { StackNavigationProp } from "@react-navigation/stack";
import { mode } from '../types';
import UserMenu from '@src/screens/User/components/UserMenu';
import styles from '@src/utils/styles';

type Props = {
  title: string;
  setMode: (mode: mode) => void;
  navigation: StackNavigationProp<RootStackParamList, 'Actions'>;
}

const Header = ({ title, setMode, navigation }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Appbar.Header
      style={styles.header_bar}
    >
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action icon="menu" color={styles.accents.color} onPress={openMenu} />
        }
      >
        <Menu.Item

          title="Actions"
          onPress={() => {
            setMode('actions');
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
      <Appbar.Content 
        title={title}
        titleStyle={styles.header_title}
      />
      <UserMenu
        navigation={navigation}
        Appbar={Appbar}
      />
    </Appbar.Header>
  );
};

export default Header;

