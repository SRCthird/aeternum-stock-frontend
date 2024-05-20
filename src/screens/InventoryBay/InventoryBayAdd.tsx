import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TextInput } from 'react-native-paper';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@screens";
import { InventoryBay } from "./Hooks/useInventoryBay";
import { Alert, View } from "react-native";
import { api } from '@screens/Authenticate/Login';
import { mode } from "@utils/types";
import SaveButton from "@src/components/SaveButton";
import DropDown from "@src/components/DropDown";
import useWarehouseList from "../Warehouse/Hooks/useWarehouseList";
import { Picker } from "@react-native-picker/picker";
import NumberInput from "@src/components/NumberInput";

type Props = {
  key_: number;
  setKey: Dispatch<SetStateAction<number>>;
  setMode: Dispatch<SetStateAction<mode>>;
  navigation: StackNavigationProp<RootStackParamList, 'InventoryBay'>;
}

const InventoryBayAdd = ({ key_, setKey, setMode, navigation }: Props) => {
  const { result: warehouses, isLoading } = useWarehouseList();

  const [data, setData] = useState<InventoryBay>({
    id: 0,
    name: '',
    warehouseName: '',
    maxUniqueLots: 0,
  });

  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (!submit) return;
    const { id: _, ...putData } = data;
    api.post('/api/inventory-bay/', putData)
      .then(_ => {
        setKey(key_ + 1);
        setSubmit(false);
        setMode('view');
      })
      .catch(err => {
        Alert.alert('Error', err.message);
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
        placeholder="Enter Inventory Bay name"
        mode="outlined"
        onChangeText={text => { setData({ ...data, name: text }) }}
      />
      <DropDown
        label="Warehouse"
        selectedValue={data.warehouseName}
        onValueChange={(itemValue, _) => { setData({ ...data, warehouseName: itemValue }) }}
        selection={
          isLoading ? (
            <Picker.Item label="Loading..." value="" />
          ) : warehouses.map((warehouse, index) => (
            <Picker.Item key={index} label={warehouse} value={warehouse} />
          ))
        }
      />
      <NumberInput
        label="Max unique lots"
        value={data.maxUniqueLots}
        onChange={maxUniqueLots => setData({ ...data, maxUniqueLots })}
      />
      <View style={{ flex: 1 }}></View>
      <SaveButton setSubmit={setSubmit} />
    </View>
  );
}

export default InventoryBayAdd;

