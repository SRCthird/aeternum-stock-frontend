import { useState } from "react";
import ProductLotList from "./Components/ProductLotList";
import { Appbar, Menu } from 'react-native-paper';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Home";
import { mode } from "./types";
import { ProductLot } from "./Hooks/useProductLot";

type Props = {
  key: number;
  setKey: (key: number) => void;
  setMode: (mode: mode) => void;
  setItem: (item: ProductLot) => void;
  navigation: StackNavigationProp<RootStackParamList, 'ProductLot'>;
}

const ProductListView = ({ key, setKey, setMode, setItem, navigation }: Props) => {
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
            lotNumber: "",
            internalReference: "",
            productName: "",
            quantity: 0,
          });
        }} />
        <Appbar.Action icon="refresh" onPress={() => {
          setKey(key + 1);
        }} />
      </Appbar>
      <ProductLotList
        key={key}
        setMode={setMode}
        setItem={setItem}
      />
    </>
  );
}

export default ProductListView;

