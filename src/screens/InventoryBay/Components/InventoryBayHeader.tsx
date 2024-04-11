import { Appbar, Menu } from "react-native-paper";
import { Dispatch, SetStateAction, useState } from "react";
import { mode } from "@src/utils/types";
import { InventoryBay } from "../Hooks/useInventoryBay";
import { RootStackParamList } from "@src/screens/Home";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
  title: string;
  setKey: Dispatch<SetStateAction<number>>;
  setMode: Dispatch<SetStateAction<mode>>;
  setItem: Dispatch<SetStateAction<InventoryBay>>;
  navigation: StackNavigationProp<RootStackParamList, 'InventoryBay'>;
}

const InventoryBayHeader = ({ title, setKey, setMode, setItem, navigation }: Props) => {
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
      </Menu>
      <Appbar.Content title={title} />
      <Appbar.Action icon="plus" onPress={() => {
        setMode('add');
        setItem({
          id: 0,
          name: '',
          warehouseName: '',
          maxUniqueLots: 0,
        });
      }} />
      <Appbar.Action icon="refresh" onPress={() => {
        setKey(prev => prev + 1);
      }} />
    </Appbar>
  )
}

export default InventoryBayHeader;
