import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { TextInput } from 'react-native-paper';
import { ProductLot } from "./Hooks/useProductLot";
import { Alert, View } from "react-native";
import { api } from '@screens/Authenticate/Login';
import { mode } from "@utils/types";
import SaveButton from "@src/components/SaveButton";
import useProductList from "../Product/Hooks/useProductList";
import SearchableDropDown from "@src/components/SearchableDropDown";
import styles from '@utils/styles';

type Props = {
  setKey: Dispatch<SetStateAction<number>>;
  setMode: (mode: mode) => void;
  setItem?: Dispatch<SetStateAction<ProductLot>>;
}

const ProductLotAdd = ({ setKey, setMode, setItem }: Props) => {
  const refLotNumber = useRef<TextInput>();
  const refInternal = useRef<TextInput>();
  const refQuantity = useRef<TextInput>();
  const { result: products } = useProductList();

  const [data, setData] = useState<ProductLot>({
    id: 0,
    lot_number: "",
    internal_reference: "",
    product_name: "",
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
    <View style={styles.container}>
      <SearchableDropDown
        label="Product Name"
        selectedValue={data.product_name}
        onValueChange={(itemValue) => {
          setData({ ...data, product_name: itemValue });
        }}
        items={products}
        onSubmitEditing={() => refLotNumber.current.focus()}
      />
      <TextInput
        ref={refLotNumber}
        style={styles.input}
        textColor={styles.input_text.color}
        label="Lot Number"
        placeholder="enter lot number."
        mode="outlined"
        onChangeText={text => { setData({ ...data, lot_number: text }) }}
        onSubmitEditing={() => refInternal.current.focus()}
      />
      <TextInput
        ref={refInternal}
        style={styles.input}
        textColor={styles.input_text.color}
        label="Workorder"
        placeholder="enter internal reference/workorder."
        mode="outlined"
        onChangeText={text => { setData({ ...data, internal_reference: text }) }}
        onSubmitEditing={() => refQuantity.current.focus()}
      />
      <TextInput
        ref={refQuantity}
        style={styles.input}
        textColor={styles.input_text.color}
        label="Lot Quantity"
        mode="outlined"
        keyboardType="numeric"
        value={data.quantity.toString()}
        onChangeText={(text) => {
          let quantity = text.replace(/[^0-9]/g, '');
          let parsedQuantity = parseInt(quantity, 10);
          if (isNaN(parsedQuantity)) {
            parsedQuantity = 0;
          }
          setData({ ...data, quantity: parsedQuantity });
        }}
        onSubmitEditing={() => setSubmit(true)}
      />
      <View style={{ flex: 1 }}></View>
      <SaveButton setSubmit={setSubmit} />
    </View>
  );
}

export default ProductLotAdd;

