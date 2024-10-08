import { useEffect, useState } from "react";
import { Appbar, Menu, TextInput } from 'react-native-paper';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@screens";
import { InventoryBay } from "./Hooks/useInventoryBay";
import { Alert, Platform, View } from "react-native";
import { api } from '@screens/Authenticate/Login';
import { mode } from "@utils/types";
import SaveButton from "@src/components/SaveButton";
import DeleteButton from "@src/components/DeleteButton";
import NumberInput from "@src/components/NumberInput";
import DropDown from "@src/components/DropDown";
import useWarehouseList from "../Warehouse/Hooks/useWarehouseList";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@src/context/ThemeContext";
import { deleteAlert, fixAlert } from "@src/components/deleteAlert";
import { AxiosError } from "axios";

type Props = {
  key_: number;
  setKey: (key_: number) => void;
  setMode: (mode: mode) => void;
  item: InventoryBay;
  setItem: (item: InventoryBay) => void;
  navigation: StackNavigationProp<RootStackParamList, 'InventoryBay'>;
}


const InventoryBayEdit = ({ key_, setKey, setMode, item, setItem, navigation }: Props) => {
  const styles = useTheme();
  const { result: warehouses } = useWarehouseList();

  const [data, setData] = useState<InventoryBay>(item);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (!submit) return;
    api.patch('/api/inventory-bay/' + item.id, data)
      .then(_ => {
        setKey(key_ + 1);
        setMode('view');
      })
      .catch(err => {
        if (Platform.OS === 'web') {
          alert(`Error\nFailed to update bay.\n${err.message}`)
        } else {
          Alert.alert("Error", "Failed to update bay.\n" + err.message);
        }
      });
    setSubmit(false);
  }, [submit]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        textColor={styles.input_text.color}
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
      <DeleteButton onPress={() => deleteAlert({
        item:item,
        setMode:setMode,
        catchMethod:(err: AxiosError) => {
          if (err.response?.status === 406) {
            fixAlert("Error", "Bay has inventory items, delete or move the items first.");
          } else {
            fixAlert("Error", "Failed to delete bay.\n" + err.message);
          }
        },
        title:"Delete Inventory Bay",
        text:"Are you sure you want to delete this Inventory Bay?",
        apiPath: "/api/inventory-bay/"
      })} />
    </View>
  );
}

export default InventoryBayEdit;

