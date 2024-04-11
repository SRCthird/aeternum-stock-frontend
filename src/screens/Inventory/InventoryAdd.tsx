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
import useLotLookup from "../ProductLot/Hooks/useLotLookup";

type Props = {
  key_: number;
  setKey: (key_: number) => void;
  setMode: (mode: mode) => void;
  navigation: StackNavigationProp<RootStackParamList, 'Inventory'>;
}

const InventoryAdd = ({ key_, setKey, setMode, navigation }: Props) => {
  const {result: lots, isLoading: lotsLoading } = useProductLotList();
  const {result: locations, isLoading: locationsLoading } = useInventoryBayList();
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const [data, setData] = useState<Inventory>({
    id: 0,
    lotNumber: '',
    location: '',
    quantity: 0,
    createdAt: new Date(),
    createdBy: '',
    updatedAt: new Date(),
    updatedBy: '',
  });
  const [submit, setSubmit] = useState(false);
  const { result: lotLookup, isLoading: lotLookupLoading } = useLotLookup({ lotNumber: data.lotNumber });

  useEffect(() => {
    if (!submit) return;
    const { id: _, ...putData } = data;
    api.post('/api/inventory/', putData)
      .then(_ => {
        setKey(key_ + 1);
        setSubmit(false);
        setMode('view');
      })
      .catch(err => {
        Alert.alert('Error', err.message);
      });
    setSubmit(false);
  }, [submit]);

  return (
    <View>
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
        <Appbar.Content title="Input product" />
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
        <DropDown
          label="Lot Number"
          selectedValue={data.lotNumber}
          onValueChange={(lotNumber, _ ) => {
            setData({ ...data, lotNumber });
          }}
          selection={
            lotsLoading ? (
              <Text>Loading...</Text>
            ) : (
              lots.map(lot => (
                <Picker.Item key={lot} label={lot} value={lot} />
              ))
            )
          }
        />
        <DropDown
          label="Location"
          selectedValue={data.location}
          onValueChange={(location, _ ) => {
            setData({ ...data, location });
          }}
          selection={
            locationsLoading ? (
              <Text>Loading...</Text>
            ) : (
              locations.map(location => (
                <Picker.Item key={location} label={location} value={location} />
              ))
            )
          }
        />
        <NumberInput
          label="Quantity"
          value={data.quantity}
          max={lotLookup[0]?.quantity ?? 0}
          onChange={(quantity) => {
            setData({ ...data, quantity });
          }}
        />
        <DatePicker
          label="Created At"
          date={data.createdAt}
          onConfirm={(createdAt) => {
            setData({ ...data, createdAt });
          }}
        />
        <TextInput 
          style={{ 
            minWidth: '100%', 
            margin: 10, 
          }} 
          label="Created By" 
          placeholder="Enter your name"
          mode="outlined" 
          onChangeText={createdBy => { setData({ ...data, createdBy }) }}
        />
        <View style={{ flex: 1 }}></View>
        <SaveButton setSubmit={setSubmit} />
      </View>
    </View>
  );
}

export default InventoryAdd;

