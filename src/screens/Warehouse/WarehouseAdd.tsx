import { useEffect, useState } from "react";
import { Appbar, Menu, TextInput } from 'react-native-paper';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@screens";
import { Warehouse } from "./Hooks/useWarehouse";
import { View } from "react-native";
import { api } from '@screens/Authenticate/Login';
import { mode } from '@utils/types';
import SaveButton from "@src/components/SaveButton";

type Props = {
  key_: number;
  setKey: (key_: number) => void;
  setMode: (mode: mode) => void;
  navigation: StackNavigationProp<RootStackParamList, 'Warehouse'>;
}

const WarehouseAdd = ({ key_, setKey, setMode, navigation }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const [data, setData] = useState<Warehouse>({
    id: 0,
    name: '',
  });
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (!submit) return;
    const { id: _, ...putData } = data;
    api.post('/api/warehouse/', putData)
      .then(res => {
        console.log(res.data);
        setKey(key_ + 1);
        setSubmit(false);
        setMode('view');
      })
      .catch(err => {
        console.log(err);
      });
    setSubmit(false);
  }, [submit]);

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
          <Menu.Item
            title="Warehouse View"
            onPress={() => {
              setMode('view');
              closeMenu();
            }}
          />
        </Menu>
        <Appbar.Content title="Input product" />
        <Appbar.Action icon="plus" onPress={() => { console.log('add'); }} />
        <Appbar.Action icon="refresh" onPress={() => {
          setKey(key_ + 1);
        }} />
      </Appbar>
      <View style={{ 
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
      }}>
        <TextInput 
          style={{ 
            minWidth: '100%', 
            margin: 10, 
          }} 
          label="name" 
          placeholder="enter warehouse name"
          mode="outlined" 
          onChangeText={text => { setData({ ...data, name: text }) }}
        />
        <View style={{ flex: 1 }}></View>
        <SaveButton setSubmit={setSubmit} />
      </View>
    </>
  );
}

export default WarehouseAdd;

