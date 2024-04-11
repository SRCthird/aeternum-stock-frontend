import { useEffect, useState } from "react";
import { Appbar, Menu, TextInput } from 'react-native-paper';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Home";
import { ProductLot } from "./Hooks/useProductLot";
import { View } from "react-native";
import api from "@src";
import { mode } from "@utils/types";
import SaveButton from "@src/components/SaveButton";
import NumberInput from "@src/components/NumberInput";
import DropDown from "@src/components/DropDown";
import useProductList from "../Product/Hooks/useProductList";
import { Picker } from "@react-native-picker/picker";

type Props = {
  key_: number;
  setKey: (key_: number) => void;
  setMode: (mode: mode) => void;
  navigation: StackNavigationProp<RootStackParamList, 'ProductLot'>;
}

const ProductAdd = ({ key_, setKey, setMode, navigation }: Props) => {
  const { result: products, isLoading } = useProductList();
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

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
    const { id: _, ...putData } = data;
    api.post('/api/product-lot/', putData)
      .then(res => {
        console.log(res.data);
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
    <>
      <Appbar style={{
        height: 80,
        width: '100%',
        paddingTop: 25,
      }}>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="grey" onPress={openMenu} />
          }
        >
          <Menu.Item
            title="Home"
            onPress={() => {
              navigation.navigate('Actions');
              closeMenu();
            }}
          />
          <Menu.Item
            title="Lot View"
            onPress={() => {
              setMode('view');
              closeMenu();
            }}
          />
        </Menu>
        <Appbar.Content title="Input lot" />
        <Appbar.Action icon="plus" onPress={() => { console.log('add'); }} />
        <Appbar.Action icon="refresh" onPress={() => {
          setKey(key_ + 1);
        }} />
      </Appbar>
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
            isLoading ? (
              <Picker.Item label="Loading..." value="" />
            ) : products.map((product, index) => (
              <Picker.Item key={index} label={product} value={product} />
            ))
          }
        />
        <NumberInput
          label="Lot Quantity"
          value={data.quantity}
          onChange={quantity => setData({ ...data, quantity })}
        />
        <SaveButton setSubmit={setSubmit} />
      </View>
    </>
  );
}

export default ProductAdd;

