import { useEffect, useState } from "react";
import { Appbar, Menu, TextInput } from 'react-native-paper';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Home";
import { Inventory } from "./Hooks/useInventory";
import { Alert, Text, View } from "react-native";
import api from "@src";
import { mode } from "@utils/types";
import SaveButton from "@src/components/SaveButton";
import DropDown from "@src/components/DropDown";
import useProductLotList from "../ProductLot/Hooks/useProductLotList";
import useInventoryBayList from "../InventoryBay/Hooks/useInventoryBayList";
import { Picker } from "@react-native-picker/picker";
import NumberInput from "@src/components/NumberInput";
import DatePicker from "@components/DatePicker";
import DeleteButton from "@src/components/DeleteButton";
import HandlePatch from "./Utility/HandlePatch";
import SearchableDropDown from "@src/components/SearchableDropDown";

type Props = {
  key_: number;
  setKey: (key_: number) => void;
  setMode: (mode: mode) => void;
  item: Inventory;
  setItem: (item: Inventory) => void;
  navigation: StackNavigationProp<RootStackParamList, 'Inventory'>;
}

const InventoryEdit = ({ key_, setKey, item, setItem, setMode, navigation }: Props) => {
  const { result: lots, isLoading: lotsLoading } = useProductLotList();
  const { result: locations, isLoading: locationsLoading } = useInventoryBayList();
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const [data, setData] = useState<Inventory>(item);

  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (!submit) return;
    HandlePatch({
      key_: key_,
      setKey: setKey,
      setMode: setMode,
      setSubmit: setSubmit,
      oldItem: item,
      newItem: data,
    });
    setSubmit(false);
  }, [submit]);

  const deleteAlert = (item: Inventory) => {
    Alert.alert(
      "Scrap Items in inventory",
      "Are you sure you want to scrap these items?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes", onPress: () => (
            api.delete('/api/inventory/' + item.id)
              .then(_ => {
                setMode('view');
              })
              .catch(err => {
                if (err.response.status === 406) {
                  Alert.alert("Error", "This lot somehow has dependencies?");
                } else {
                  Alert.alert("Error", "Failed to delete bay.\n" + err.message);
                }
              })
          )
        }
      ]
    );
  }

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
            title="Inventory View"
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
            lotNumber: '',
            location: '',
            quantity: 0,
            createdAt: new Date(),
            createdBy: '',
            updatedAt: new Date(),
            updatedBy: '',
          });
        }} />
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
        <DropDown
          label="Lot Number"
          selectedValue={data.lotNumber}
          onValueChange={(lotNumber, _) => {
            setData({ ...data, lotNumber });
          }}
          selection={
            lots.map(lot => (
              <Picker.Item key={lot} label={lot} value={lot} />
            ))
          }
        />
        <Text>From location: {item.location}</Text>
        <SearchableDropDown
          label="To Location"
          items={locations}
          selectedValue={data.location}
          onValueChange={(location) => {
            console.log(location);
            setData({ ...data, location });
          }}
        />
        {/*
        <DropDown
          label="To Location"
          selectedValue={data.location}
          onValueChange={(location, _) => {
            setData({ ...data, location });
          }}
          selection={
            locations.map(location => (
              <Picker.Item key={location} label={location} value={location} />
            ))
          }
        />*/}
        <NumberInput
          label="Quantity"
          value={data.quantity}
          max={item.quantity}
          onChange={(quantity) => {
            setData({ ...data, quantity });
          }}
        />
        <DatePicker
          label="Updated At"
          date={data.updatedAt || new Date()}
          onConfirm={(updatedAt) => {
            setData({ ...data, updatedAt });
          }}
        />
        <TextInput
          style={{
            minWidth: '100%',
            margin: 10,
          }}
          label="Updated By"
          defaultValue={item.updatedBy}
          value={data.updatedBy}
          mode="outlined"
          onChangeText={updatedBy => { setData({ ...data, updatedBy }) }}
        />
        <View style={{ flex: 1 }}></View>
        <SaveButton setSubmit={setSubmit} />
        {item.location === 'Scrapped' && (
          <DeleteButton onPress={() => deleteAlert(item)} />
        )}
      </View>
    </>
  );
}

export default InventoryEdit;

