import { useState } from "react";
import ProductList from "./Components/ProductList";
import { Appbar, Menu } from 'react-native-paper';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@screens";
import { mode } from "@utils/types";
import { Product } from "./Hooks/useProduct";

type Props = {
  key_: number;
  setKey: (key_: number) => void;
  setMode: (mode: mode) => void;
  setItem: (item: Product) => void;
  navigation: StackNavigationProp<RootStackParamList, 'Product'>;
}

const ProductListView = ({ key_, setKey, setMode, setItem, navigation }: Props) => {
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
            name: '',
            description: '',
          });
        }} />
        <Appbar.Action icon="refresh" onPress={() => {
          setKey(key_ + 1);
        }} />
      </Appbar>
      <ProductList 
        key={key_} 
        setMode={setMode}
        setItem={setItem}
      />
    </>
  );
}

export default ProductListView;

