import { useEffect, useState } from "react";
import { Appbar, Menu, TextInput } from 'react-native-paper';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@screens";
import { InventoryBay } from "./Hooks/useInventoryBay";
import { Alert, View } from "react-native";
import { api } from '@screens/Authenticate/Login';
import { mode } from "@utils/types";
import SaveButton from "@src/components/SaveButton";
import DeleteButton from "@src/components/DeleteButton";
import NumberInput from "@src/components/NumberInput";
import DropDown from "@src/components/DropDown";
import useWarehouseList from "../Warehouse/Hooks/useWarehouseList";
import { Picker } from "@react-native-picker/picker";

type Props = {
  key_: number;
  setKey: (key_: number) => void;
  setMode: (mode: mode) => void;
  item: InventoryBay;
  setItem: (item: InventoryBay) => void;
  navigation: StackNavigationProp<RootStackParamList, 'InventoryBay'>;
}


const InventoryBayEdit = ({ key_, setKey, setMode, item, setItem, navigation }: Props) => {
  const { result: warehouses, isLoading } = useWarehouseList();
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const [data, setData] = useState<InventoryBay>(item);
  const [submit, setSubmit] = useState(false);

  const deleteAlert = (item: InventoryBay) => {
    Alert.alert(
      "Delete Inventory Bay",
      "Are you sure you want to delete this Inventory Bay?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes", onPress: () => (
            api.delete('/api/inventory-bay/' + item.id)
              .then(_ => {
                setMode('view');
              })
              .catch(err => {
                if (err.response.status === 406) {
                  Alert.alert("Error", "Bay has inventory items, delete or move the items first.");
                } else {
                  Alert.alert("Error", "Failed to delete bay.\n" + err.message);
                }
              })
          )
        }
      ]
    );
  }

  useEffect(() => {
    if (!submit) return;
    api.patch('/api/inventory-bay/' + item.id, data)
      .then(_ => {
        setKey(key_ + 1);
        setMode('view');
      })
      .catch(err => {
        Alert.alert("Error", "Failed to update bay.\n" + err.message);
      });
    setSubmit(false);
  }, [submit]);

  return (
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
        label="Name"
        defaultValue={item.name}
        placeholder="Enter Inventory Bay name."
        mode="outlined"
        onChangeText={text => { setData({ ...data, name: text }) }}
      />
      <DropDown
        label="Warehouse"
        selectedValue={data.warehouse_name}
        onValueChange={(itemValue, _) => { setData({ ...data, warehouse_name: itemValue }) }}
        selection={
          warehouses.map((warehouse, index) => (
            <Picker.Item key={index} label={warehouse} value={warehouse} />
          ))
        }
      />
      <NumberInput
        label="Max unique lots"
        defaultValue={item.max_unique_lots}
        value={data.max_unique_lots}
        onChange={max_unique_lots => setData({ ...data, max_unique_lots })}
      />
      <View style={{ flex: 1 }}></View>
      <SaveButton setSubmit={setSubmit} />
      <DeleteButton onPress={() => deleteAlert(item)} />
    </View>
  );
}

export default InventoryBayEdit;

