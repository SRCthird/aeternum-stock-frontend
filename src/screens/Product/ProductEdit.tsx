import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TextInput } from 'react-native-paper';
import { Product } from "./Hooks/useProduct";
import { Alert, View } from "react-native";
import { api } from '@screens/Authenticate/Login';
import { mode } from "@utils/types";
import DeleteButton from "@src/components/DeleteButton";
import SaveButton from "@src/components/SaveButton";
import styles from "@src/utils/styles";

type Props = {
  key_: number;
  setKey: Dispatch<SetStateAction<number>>;
  setMode: Dispatch<SetStateAction<mode>>;
  item: Product;
}


const ProductEdit = ({ key_, setKey, setMode, item }: Props) => {
  const [data, setData] = useState<Product>(item);
  const [submit, setSubmit] = useState(false);

  const deleteAlert = (item: Product) => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes", onPress: () => (
            api.delete('/api/product/' + item.id)
              .then(_ => {
                setMode('view');
              })
              .catch(err => {
                if (err.response.status === 409) {
                  Alert.alert("Error", "Product is in use.");
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
    api.patch('/api/product/' + item.id, data)
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
        <DeleteButton onPress={() => deleteAlert(item)} />
    </View>
  );
}

export default ProductEdit;

