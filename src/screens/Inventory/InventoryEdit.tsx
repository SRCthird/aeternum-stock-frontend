import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TextInput } from 'react-native-paper';
import { Inventory } from "./Hooks/useInventory";
import { Alert, Text, View } from "react-native";
import { api } from '@screens/Authenticate/Login';
import { mode } from "@utils/types";
import SaveButton from "@src/components/SaveButton";
import DropDown from "@src/components/DropDown";
import useProductLotList from "../ProductLot/Hooks/useProductLotList";
import useInventoryBayList from "../InventoryBay/Hooks/useInventoryBayList";
import { Picker } from "@react-native-picker/picker";
import NumberInput from "@src/components/NumberInput";
import DatePicker from "@components/DatePicker";
import DeleteButton from "@src/components/DeleteButton";
import handlePatch from "./Utility/HandlePatch";
import SearchableDropDown from "@src/components/SearchableDropDown";

type Props = {
  setKey: Dispatch<SetStateAction<number>>;
  setMode: Dispatch<SetStateAction<mode>>;
  state: 'release' | 'scrap' | null;
  item: Inventory;
}

const InventoryEdit = ({ setKey, item, setMode, state }: Props) => {
  const { result: lots, isLoading: lotsLoading } = useProductLotList();
  const { result: locations, isLoading: locationsLoading } = useInventoryBayList();

  const [data, setData] = useState<Inventory>(item);

  useEffect(() => {
    setData({...data, updatedAt: new Date()});
    if (state === 'release') {
      setData({...data, location: "Released"});
    }
    if (state === 'scrap') {
      setData({...data, location: "Scrapped"});
    }
  }, []);

  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (!submit) return;
    handlePatch({
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
          setData({ ...data, location });
        }}
      />
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
      {(item.location === 'Scrapped' || item.location === 'Released') && (
        <DeleteButton onPress={() => deleteAlert(item)} />
      )}
    </View>
  );
}

export default InventoryEdit;

