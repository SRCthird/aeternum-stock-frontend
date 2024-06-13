import { useEffect, useState } from "react";
import { TextInput } from 'react-native-paper';
import { Product } from "./Hooks/useProduct";
import { Alert, View } from "react-native";
import { api } from '@screens/Authenticate/Login';
import { mode } from "@utils/types";
import SaveButton from "@src/components/SaveButton";
import styles from "@src/utils/styles";

type Props = {
  key_: number;
  setKey: (key_: number) => void;
  setMode: (mode: mode) => void;
}

const ProductAdd = ({ key_, setKey, setMode }: Props) => {
  const [data, setData] = useState<Product>({
    id: 0,
    name: '',
    description: '',
  });
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (!submit) return;
    const { id: _, ...putData } = data;
    api.post('/api/product/', putData)
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        textColor={styles.input_text.color}
        label="name"
        placeholder="enter product name"
        mode="outlined"
        onChangeText={text => { setData({ ...data, name: text }) }}
      />
      <TextInput
        style={styles.input}
        textColor={styles.input_text.color}
        label="description"
        placeholder="enter product description"
        mode="outlined"
        onChangeText={text => { setData({ ...data, description: text }) }}
      />
      <View style={{ flex: 1 }}></View>
      <SaveButton setSubmit={setSubmit} />
    </View>
  );
}

export default ProductAdd;

