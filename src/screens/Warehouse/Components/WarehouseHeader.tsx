import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@src/screens";
import { mode } from '@utils/types';
import { Dispatch, SetStateAction, useState } from "react";
import { Appbar, Menu } from "react-native-paper";
import { Warehouse } from "../Hooks/useWarehouse";

interface Props {
  title: string;
  navigation: StackNavigationProp<RootStackParamList, 'Warehouse'>;
  setMode: Dispatch<SetStateAction<mode>>;
  setItem: Dispatch<SetStateAction<Warehouse>>;
  setKey: Dispatch<SetStateAction<number>>;
}

const WarehouseHeader = ({ title, navigation, setMode, setItem, setKey }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Appbar style={{
      height: 80,
      width: '100%',
      paddingTop: 25,
      backgroundColor: 'white',
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
          title="Warehouse View"
          onPress={() => {
            setMode('view');
            closeMenu();
          }}
        />
      </Menu>
      <Appbar.Content
        title={title}
        titleStyle={{ color: 'black' }}
      />
      <Appbar.Action icon="plus" onPress={() => {
        setMode('add');
        setItem({
          id: 0,
          name: '',
        });
      }} />
      <Appbar.Action icon="refresh" onPress={() => {
        setKey(key => (key + 1));
      }} />
    </Appbar>
  );
}

export default WarehouseHeader;
