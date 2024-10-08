import { useEffect, useState } from "react";
import { TextInput } from 'react-native-paper';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@screens";
import { Warehouse } from "./Hooks/useWarehouse";
import { View } from "react-native";
import { api } from '@screens/Authenticate/Login';
import { mode } from '@utils/types';
import SaveButton from "@src/components/SaveButton";
import DeleteButton from "@src/components/DeleteButton";
import { useTheme } from "@src/context/ThemeContext";
import { deleteAlert, fixAlert } from "@src/components/deleteAlert";
import { AxiosError } from "axios";

type Props = {
  key_: number;
  setKey: (key_: number) => void;
  setMode: (mode: mode) => void;
  item: Warehouse;
  setItem: (item: Warehouse) => void;
  navigation: StackNavigationProp<RootStackParamList, 'Warehouse'>;
}


const WarehouseEdit = ({ key_, setKey, setMode, item }: Props) => {
  const styles = useTheme();
  const [data, setData] = useState<Warehouse>(item);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (!submit) return;
    api.patch('/api/warehouse/' + item.id, data)
      .then(_ => {
        setKey(key_ + 1);
        setMode('view');
      })
      .catch(err => {
        fixAlert("Error", "Failed to update product.\n" + err.message);
      });
    setSubmit(false);
  }, [submit]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        textColor={styles.input_text.color}
        label="name"
        mode="outlined"
        defaultValue={item.name}
        onChangeText={text => { setData({ ...data, name: text }) }}
      />
      <View style={{ flex: 1 }}></View>
      <SaveButton setSubmit={setSubmit} />
      <DeleteButton onPress={() => deleteAlert({
        item: item,
        setMode: setMode,
        catchMethod: (err: AxiosError) => {
          if (err.response?.status === 406) {
            fixAlert("Error", "Warehouse has inventory bays, delete the bays first.");
          } else {
            fixAlert("Error", "Failed to delete product.\n" + err.message);
          }
        },

        title: "Delete Warehouse",
        text: "Are you sure you want to delete this Warehouse?",
        apiPath: '/api/warehouse/',
      })} />
    </View>
  );
}

export default WarehouseEdit;

