import { useEffect, useState } from "react";
import { TextInput } from 'react-native-paper';
import { ProductLot } from "./Hooks/useProductLot";
import useProductList from "@screens/Product/Hooks/useProductList";
import { Alert, View } from "react-native";
import SaveButton from "@components/SaveButton";
import DeleteButton from "@components/DeleteButton";
import { api } from '@screens/Authenticate/Login';
import { mode } from "@utils/types";
import NumberInput from "@src/components/NumberInput";
import SearchableDropDown from "@src/components/SearchableDropDown";
import { useTheme } from "@src/context/ThemeContext";
import { deleteAlert, fixAlert } from "@src/components/deleteAlert";
import { AxiosError } from "axios";

type Props = {
  key_: number;
  setKey: (key_: number) => void;
  setMode: (mode: mode) => void;
  item: ProductLot;
}

const ProductEdit = ({ key_, setKey, setMode, item }: Props) => {
  const styles = useTheme();
  const { result: products } = useProductList();

  const [data, setData] = useState<ProductLot>(item);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (!submit) return;
    api.patch('/api/product-lot/' + item.id, data)
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
        label="Lot Number"
        mode="outlined"
        defaultValue={item.lot_number}
        onChangeText={text => { setData({ ...data, lot_number: text }) }}
      />
      <TextInput
        style={styles.input}
        textColor={styles.input_text.color}
        label="Internal Reference"
        mode="outlined"
        defaultValue={item.internal_reference}
        onChangeText={text => { setData({ ...data, internal_reference: text }) }}
      />
      <SearchableDropDown
        label="Product Name"
        selectedValue={data.product_name}
        onValueChange={(itemValue) => {
          setData({ ...data, product_name: itemValue });
        }}
        items={products}
      />
      <NumberInput
        label="Lot Quantity"
        value={data.quantity}
        defaultValue={item.quantity}
        onChange={quantity => setData({ ...data, quantity })}
      />
      <View style={{ flex: 1 }}></View>
      <SaveButton setSubmit={setSubmit} />
      <DeleteButton
        onPress={() => {
          deleteAlert({
            item: item,
            setMode: setMode,
            catchMethod: (err: AxiosError) => {
              if (err.response?.status === 406) {
                fixAlert("Error", "Lot has inventory dependencies.");
              } else {
                fixAlert("Error", "Failed to delete product.\n" + err.message);
              }
            },

            title: "Scrap lot",
            text: "Are you sure you want to scrap this lot?",
            apiPath: '/api/product-lot/',
          })
        }}
      />
    </View>
  );
}

export default ProductEdit;

