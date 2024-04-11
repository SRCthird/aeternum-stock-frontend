import { useState } from "react";
import InventoryList from "./Components/InventoryList";
import { Appbar, Menu } from 'react-native-paper';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Home";
import { mode } from "@utils/types";
import { Inventory } from "./Hooks/useInventory";

type Props = {
  key_: number;
  setKey: (key: number) => void;
  setMode: (mode: mode) => void;
  setItem: (item: Inventory) => void;
  navigation: StackNavigationProp<RootStackParamList, 'Inventory'>;
}

const WarehouseView = ({ key_, setKey, setMode, setItem, navigation }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <>
      <Appbar style={{
        height: 80,
        width: '100%',
        paddingTop: 25,
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
        </Menu>
        <Appbar.Content title="" />
        <Appbar.Action icon="plus" onPress={() => { 
          setMode('add');
          setItem({
            id: 0,
            lotNumber: '',
            location: '',
            quantity: 0,
            createdAt: new Date(),
            createdBy: '',
            updatedAt: new Date(),
            updatedBy: '',
          });
        }} />
        <Appbar.Action icon="refresh" onPress={() => {
          setKey(key_ + 1);
        }} />
      </Appbar>
      <InventoryList 
        setMode={setMode}
        setItem={setItem}
      />
    </>
  );
}

export default WarehouseView;

