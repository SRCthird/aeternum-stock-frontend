import { useEffect, useState } from "react";
import { TextInput } from 'react-native-paper';
import { Warehouse } from "./Hooks/useWarehouse";
import { View } from "react-native";
import { api } from '@screens/Authenticate/Login';
import { mode } from '@utils/types';
import SaveButton from "@src/components/SaveButton";

type Props = {
  key_: number;
  setKey: (key_: number) => void;
  setMode: (mode: mode) => void;
}

const WarehouseAdd = ({ key_, setKey, setMode }: Props) => {
  const [data, setData] = useState<Warehouse>({
    id: 0,
    name: '',
  });
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (!submit) return;
    const { id: _, ...putData } = data;
    api.post('/api/warehouse/', putData)
      .then(_ => {
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
  );
}

export default WarehouseAdd;

