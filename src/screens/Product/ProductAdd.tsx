import { useEffect, useState } from "react";
import { Appbar, Menu, TextInput } from 'react-native-paper';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Home";
import { Product } from "./Hooks/useProduct";
import { Text, TouchableOpacity, View } from "react-native";
import api from "@src";
import { mode } from ".";
import DropDown from "@src/components/DropDown";
import useProductList from "@screens/Product/Hooks/useProductList";

type Props = {
  key: number;
  setKey: (key: number) => void;
  setMode: (mode: mode) => void;
  navigation: StackNavigationProp<RootStackParamList, 'Product'>;
}

const ProductAdd = ({ key, setKey, setMode, navigation }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

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
      .then(res => {
        console.log(res.data);
        setKey(key + 1);
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
            title="Product View"
            onPress={() => {
              setMode('view');
              closeMenu();
            }}
          />
        </Menu>
        <Appbar.Content title="Input product" />
        <Appbar.Action icon="plus" onPress={() => { console.log('add'); }} />
        <Appbar.Action icon="refresh" onPress={() => {
          setKey(key + 1);
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
          label="name" 
          placeholder="enter product name"
          mode="outlined" 
          onChangeText={text => { setData({ ...data, name: text }) }}
        />
        <TextInput 
          style={{ 
            minWidth: '100%', 
            margin: 10, 
          }} 
          label="description" 
          placeholder="enter product description"
          mode="outlined" 
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
      </View>
    </>
  );
}

export default ProductAdd;

