import { useEffect, useState } from "react";
import { TextInput } from 'react-native-paper';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@screens";
import { Warehouse } from "./Hooks/useWarehouse";
import { Alert, View } from "react-native";
import { api } from '@screens/Authenticate/Login';
import { mode } from '@utils/types';
import SaveButton from "@src/components/SaveButton";
import DeleteButton from "@src/components/DeleteButton";
import styles from "@src/utils/styles";

type Props = {
  key_: number;
  setKey: (key_: number) => void;
  setMode: (mode: mode) => void;
  item: Warehouse;
  setItem: (item: Warehouse) => void;
  navigation: StackNavigationProp<RootStackParamList, 'Warehouse'>;
}


const WarehouseEdit = ({ key_, setKey, setMode, item }: Props) => {
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
      <DeleteButton onPress={() => deleteAlert(item)} />
    </View>
  );
}

export default WarehouseEdit;

