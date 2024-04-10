import { useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { RootStackParamList } from '@src/screens/Home';
import { StackNavigationProp } from "@react-navigation/stack";

type Navigations = 
  | StackNavigationProp<RootStackParamList, 'Actions'>
  | StackNavigationProp<RootStackParamList, 'Product'>;


const Header = ({ title, navigation }: { title: string, navigation: Navigations }) => {
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
          title="Product Management" 
          onPress={() => { 
            console.log('Product Management'); 
            navigation.navigate('Product');
            closeMenu(); 
          }} 
        />
      </Menu>
      <Appbar.Content title={title} />
      <Appbar.Action icon="account" onPress={() => { console.log('Profile'); }} />
    </Appbar.Header>
  );
};

export default Header;

