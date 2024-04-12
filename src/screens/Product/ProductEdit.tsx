import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TextInput } from 'react-native-paper';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@screens";
import { Product } from "./Hooks/useProduct";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { api } from '@screens/Login/Login';
import { mode } from "@utils/types";
import ProductHeader from "./Components/ProductHeader";

type Props = {
  key_: number;
  setKey: Dispatch<SetStateAction<number>>;
  setMode: Dispatch<SetStateAction<mode>>;
  item: Product;
  setItem: Dispatch<SetStateAction<Product>>;
  navigation: StackNavigationProp<RootStackParamList, 'Product'>;
}


const ProductEdit = ({ key_, setKey, setMode, item, setItem, navigation }: Props) => {
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
                if (err.response.status === 406) {
                  Alert.alert("Error", "Product has lot dependencies.");
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
      <ProductHeader 
        title="Edit Product"
        setKey={setKey}
        setMode={setMode}
        setItem={setItem}
        navigation={navigation}
      />
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
          mode="outlined"
          defaultValue={item.name}
          onChangeText={text => { setData({ ...data, name: text }) }}
        />
        <TextInput
          style={{
            minWidth: '100%',
            margin: 10,
          }}
          label="description"
          mode="outlined"
          defaultValue={item.description}
          onChangeText={text => { setData({ ...data, description: text }) }}
        />
        <View style={{ flex: 1 }}></View>
        <TouchableOpacity 
          style={{
            backgroundColor: '#219ebc',
            padding: 15,
            marginBottom: 5,
            minWidth: '100%',
            alignItems: 'center',
          }} 
          onPress={() => { setSubmit(true); }}
        >
          <Text style={{ color: '#ffffff', fontSize: 18 }}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{
            backgroundColor: '#ff006e',
            padding: 15,
            marginBottom: 5,
            minWidth: '100%',
            alignItems: 'center',
          }} 
          onPress={() => {
            deleteAlert(item)
          }}
        >
          <Text style={{ color: '#ffffff', fontSize: 18 }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProductEdit;

