import { useEffect, useState } from "react";
import { Appbar, Menu, TextInput } from 'react-native-paper';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Home";
import { Warehouse } from "./Hooks/useWarehouse";
import { Alert, View } from "react-native";
import api from "@src";
import { mode } from '@utils/types';
import SaveButton from "@src/components/SaveButton";
import DeleteButton from "@src/components/DeleteButton";

type Props = {
  key_: number;
  setKey: (key_: number) => void;
  setMode: (mode: mode) => void;
  item: Warehouse;
  setItem: (item: Warehouse) => void;
  navigation: StackNavigationProp<RootStackParamList, 'Warehouse'>;
}


const WarehouseEdit = ({ key_, setKey, setMode, item, setItem, navigation }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const [data, setData] = useState<Warehouse>(item);
  const [submit, setSubmit] = useState(false);

  const deleteAlert = (item: Warehouse) => {
    Alert.alert(
      "Delete Warehouse",
      "Are you sure you want to delete this Warehouse?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes", onPress: () => (
            api.delete('/api/warehouse/' + item.id)
              .then(_ => {
                setMode('view');
              })
              .catch(err => {
                if (err.response.status === 406) {
                  Alert.alert("Error", "Warehouse has inventory bays, delete the bays first.");
                } else {
                  Alert.alert("Error", "Failed to delete product.\n" + err.message);
                }
              })
          )
        }
      ]
    );
  }

  useEffect(() => {
    if (!submit) return;
    api.patch('/api/warehouse/' + item.id, data)
      .then(_ => {
        setKey(key_ + 1);
        setMode('view');
      })
      .catch(err => {
        Alert.alert("Error", "Failed to update product.\n" + err.message);
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
        <Appbar.Content title={"ID: " + item.id} />
        <Appbar.Action icon="plus" onPress={() => {
          setMode('add');
          setItem({
            id: 0,
            name: '',
          });
        }} />
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
          mode="outlined"
          defaultValue={item.name}
          onChangeText={text => { setData({ ...data, name: text }) }}
        />
        <View style={{ flex: 1 }}></View>
        <SaveButton setSubmit={setSubmit} />
        <DeleteButton onPress={() => deleteAlert(item)} />
      </View>
    </>
  );
}

export default WarehouseEdit;

