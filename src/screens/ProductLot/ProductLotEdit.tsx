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
import { Picker } from '@react-native-picker/picker';
import DropDown from "@src/components/DropDown";
import SearchableDropDown from "@src/components/SearchableDropDown";

type Props = {
  key_: number;
  setKey: (key_: number) => void;
  setMode: (mode: mode) => void;
  item: ProductLot;
}

const ProductEdit = ({ key_, setKey, setMode, item }: Props) => {
  const { result: products, isLoading } = useProductList();

  const [data, setData] = useState<ProductLot>(item);
  const [submit, setSubmit] = useState(false);

  const deleteAlert = (item: ProductLot) => {
    Alert.alert(
      "Scrap lot",
      "Are you sure you want to scrap this lot?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes", onPress: () => (
            api.delete('/api/product-lot/' + item.id)
              .then(_ => {
                setMode('view');
              })
              .catch(err => {
                if (err.response.status === 406) {
                  Alert.alert("Error", "Lot has inventory dependencies.");
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
    api.patch('/api/product-lot/' + item.id, data)
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
        label="Lot Number"
        mode="outlined"
        defaultValue={item.lot_number}
        onChangeText={text => { setData({ ...data, lot_number: text }) }}
      />
      <TextInput
        style={{
          minWidth: '100%',
          margin: 10,
        }}
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
          deleteAlert(item)
        }}
      />
    </View>
  );
}

export default ProductEdit;

