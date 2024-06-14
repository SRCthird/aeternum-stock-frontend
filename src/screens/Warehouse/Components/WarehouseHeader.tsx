import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@src/screens";
import { mode } from '@utils/types';
import { Dispatch, SetStateAction, useState } from "react";
import { Appbar, Menu } from "react-native-paper";
import { Warehouse } from "../Hooks/useWarehouse";
import { useTheme } from "@src/context/ThemeContext";

interface Props {
  title: string;
  navigation: StackNavigationProp<RootStackParamList, 'Warehouse'>;
  setMode: Dispatch<SetStateAction<mode>>;
  setItem: Dispatch<SetStateAction<Warehouse>>;
  setKey: Dispatch<SetStateAction<number>>;
}

const WarehouseHeader = ({ title, navigation, setMode, setItem, setKey }: Props) => {
  const styles = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Appbar style={styles.header_bar}>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action icon="menu" color={styles.accents.color} onPress={openMenu} />
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
        titleStyle={styles.header_title}
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
