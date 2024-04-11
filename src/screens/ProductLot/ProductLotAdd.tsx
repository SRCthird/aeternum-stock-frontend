import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TextInput } from 'react-native-paper';
import { ProductLot } from "./Hooks/useProductLot";
import { Alert, View } from "react-native";
import api from "@src";
import { mode } from "@utils/types";
import SaveButton from "@src/components/SaveButton";
import NumberInput from "@src/components/NumberInput";
import DropDown from "@src/components/DropDown";
import useProductList from "../Product/Hooks/useProductList";
import { Picker } from "@react-native-picker/picker";

type Props = {
  setKey: Dispatch<SetStateAction<number>>;
  setMode: (mode: mode) => void;
  setItem?: Dispatch<SetStateAction<ProductLot>>;
}

const ProductLotAdd = ({ setKey, setMode, setItem }: Props) => {
  const { result: products, isLoading } = useProductList();

  const [data, setData] = useState<ProductLot>({
    id: 0,
    lotNumber: "",
    internalReference: "",
    productName: "",
    quantity: 0,
  });

  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (!submit) return;
    if (data.quantity <= 0) {
      Alert.alert('Invalid quantity', 'Quantity must be greater than 0.');
      return;
    }
    const { id: _, ...putData } = data;
    api.post('/api/product-lot/', putData)
      .then(_ => {
        if (setItem) setItem({ ...data });
        setKey(prev => prev + 1);
        setSubmit(false);
        setMode('view');
      })
      .catch(err => {
        if (err.response.status === 404) {
          Alert.alert('Product does not exist', 'Please check the product name and try again.');
        } else if (err.response.status === 409) {
          Alert.alert('Conflict', 'Lot number or workorder already exists.');
        } else {
          Alert.alert('Error', err.message);
        }
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
        placeholder="enter lot number."
        mode="outlined"
        onChangeText={text => { setData({ ...data, lotNumber: text }) }}
      />
      <TextInput
        style={{
          minWidth: '100%',
          margin: 10,
        }}
        label="Internal Reference"
        placeholder="enter internal reference/workorder."
        mode="outlined"
        onChangeText={text => { setData({ ...data, internalReference: text }) }}
      />
      <DropDown
        label="Product Name"
        selectedValue={data.productName}
        onValueChange={(itemValue, _) => {
          setData({ ...data, productName: itemValue });
        }}
        selection={
          products.map((product, index) => (
            <Picker.Item key={index} label={product} value={product} />
          ))
        }
      />
      <NumberInput
        label="Lot Quantity"
        value={data.quantity}
        onChange={quantity => setData({ ...data, quantity })}
      />
      <View style={{ flex: 1 }}></View>
      <SaveButton setSubmit={setSubmit} />
    </View>
  );
}

export default ProductLotAdd;

