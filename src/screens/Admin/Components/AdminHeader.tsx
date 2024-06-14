import { useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { RootStackParamList } from '@screens';
import { StackNavigationProp } from "@react-navigation/stack";
import UserMenu from '@src/screens/User/components/UserMenu';
import { useTheme } from '@src/context/ThemeContext';

type Props = {
  title: string;
  navigation: StackNavigationProp<RootStackParamList, 'Admin'>;
}

const AdminHeader = ({ title, navigation }: Props) => {
  const styles = useTheme();
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
          <Appbar.Action 
            icon="menu" 
            color={styles.accents.color} 
            onPress={openMenu}
          />
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
          title="Test elements"
          onPress={() => {
            navigation.navigate('Test');
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

export default AdminHeader;

