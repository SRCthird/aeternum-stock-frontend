import { useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { RootStackParamList } from '@src/screens/Home';
import { StackNavigationProp } from "@react-navigation/stack";
import { mode } from '../types';
import { Alert } from 'react-native';

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
        <Menu.Item 
          title="Product Management" 
          onPress={() => { 
            navigation.navigate('Product');
            closeMenu(); 
          }} 
        />
        <Menu.Item 
          title="Lot Management" 
          onPress={() => { 
            navigation.navigate('ProductLot');
            closeMenu(); 
          }} 
        />
        <Menu.Item 
          title="Warehouse Management" 
          onPress={() => { 
            navigation.navigate('Warehouse');
            closeMenu(); 
          }} 
        />
        <Menu.Item 
          title="Inventory Bay Management" 
          onPress={() => { 
            navigation.navigate('InventoryBay');
            closeMenu(); 
          }}
        />
        <Menu.Item
          title="Inventory Management"
          onPress={() => {
            navigation.navigate('Inventory');
            closeMenu();
          }}
        />
      </Menu>
      <Appbar.Content title={title} />
      <Appbar.Action icon="account" onPress={() => { 
        Alert.alert('User', 'User authentication has not been implimented yet :\(');
      }} />
    </Appbar.Header>
  );
};

export default Header;

