import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@screens";
import { mode } from "@utils/types";
import { Dispatch, SetStateAction, useState } from "react";
import { Appbar, Menu } from "react-native-paper";
import { ProductLot } from "../Hooks/useProductLot";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProductLot'>;
  label: string;
  setMode: (mode: mode) => void;
  setKey: Dispatch<SetStateAction<number>>;
  setItem: (item: ProductLot) => void;
}

const ProductHeader = ({ navigation, label, setMode, setKey, setItem }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
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
        <Menu.Item
          title="Lot View"
          onPress={() => {
            setMode('view');
            closeMenu();
          }}
        />
      </Menu>
      <Appbar.Content title={label} />
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
        setKey(prev => prev + 1);
      }} />
    </Appbar>
  );
}

export default ProductHeader;
