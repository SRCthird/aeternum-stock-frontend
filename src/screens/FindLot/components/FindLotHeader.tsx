
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@screens";
import UserMenu from "@src/screens/User/components/UserMenu";
import { mode } from "@utils/types";
import { Dispatch, SetStateAction, useState } from "react";
import { Appbar, Menu } from "react-native-paper";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'FindLot'>;
  label: string;
  setMode: Dispatch<SetStateAction<mode>>;
  setKey: Dispatch<SetStateAction<number>>;
}

const FindLotHeader = ({ navigation, label, setMode }: Props) => {
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
          title="Lot View"
          onPress={() => {
            setMode('view');
            closeMenu();
          }}
        />
      </Menu>
      <Appbar.Content
        title={label}
        titleStyle={{ color: 'black' }}
      />
      <UserMenu
        Appbar={Appbar}
        navigation={navigation}
      />
    </Appbar>
  );
}

export default FindLotHeader;
