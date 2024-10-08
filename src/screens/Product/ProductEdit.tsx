import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TextInput } from 'react-native-paper';
import { Product } from "./Hooks/useProduct";
import { Alert, View } from "react-native";
import { api } from '@screens/Authenticate/Login';
import { mode } from "@utils/types";
import DeleteButton from "@src/components/DeleteButton";
import SaveButton from "@src/components/SaveButton";
import { useTheme } from "@src/context/ThemeContext";
import { deleteAlert, fixAlert } from "@src/components/deleteAlert";
import { AxiosError } from "axios";

type Props = {
  key_: number;
  setKey: Dispatch<SetStateAction<number>>;
  setMode: Dispatch<SetStateAction<mode>>;
  item: Product;
}

const ProductEdit = ({ key_, setKey, setMode, item }: Props) => {
  const styles = useTheme();
  const [data, setData] = useState<Product>(item);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (!submit) return;
    api.patch('/api/product/' + item.id, data)
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
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.input}
        textColor={styles.input_text.color}
        label="name"
        mode="outlined"
        defaultValue={item.name}
        onChangeText={text => { setData({ ...data, name: text }) }}
      />
      <TextInput
        style={styles.input}
        textColor={styles.input_text.color}
        label="description"
        mode="outlined"
        defaultValue={item.description}
        onChangeText={text => { setData({ ...data, description: text }) }}
      />
      <View style={{ flex: 1 }}></View>
      <SaveButton setSubmit={setSubmit} />
      <DeleteButton onPress={() =>
        deleteAlert({
          item: item,
          setMode: setMode,
          catchMethod: (err: AxiosError) => {
            if (err.response?.status === 409) {
              fixAlert("Error", "Product is in use.");
            } else {
              fixAlert("Error", "Failed to delete product.\n" + err.message);
            }
          },

          title: "Delete Product",
          text: "Are you sure you want to delete this product?",
          apiPath: '/api/product/',
        })
      } />
    </View>
  );
}

export default ProductEdit;

