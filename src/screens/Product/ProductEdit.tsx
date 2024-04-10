import { useEffect, useState } from "react";
import { Appbar, Menu, TextInput } from 'react-native-paper';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Home";
import { Product } from "./Hooks/useProduct";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import api from "@src";
import { mode } from ".";

type Props = {
  key: number;
  setKey: (key: number) => void;
  setMode: (mode: mode) => void;
  item: Product;
  setItem: (item: Product) => void;
  navigation: StackNavigationProp<RootStackParamList, 'Product'>;
}


const ProductEdit = ({ key, setKey, setMode, item, setItem, navigation }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

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
        setKey(key + 1);
        setMode('view');
      })
      .catch(err => {
        Alert.alert("Error", "Failed to update product.\n" + err.message);
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
        <Appbar.Content title={"ID: " + item.id} />
        <Appbar.Action icon="plus" onPress={() => {
          setMode('add');
          setItem({
            id: 0,
            name: '',
            description: '',
          });
        }} />
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
    </>
  );
}

export default ProductEdit;

