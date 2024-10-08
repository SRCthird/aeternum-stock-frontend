import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TextInput } from 'react-native-paper';
import { Inventory } from "./Hooks/useInventory";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import { api } from '@screens/Authenticate/Login';
import { mode } from "@utils/types";
import SaveButton from "@src/components/SaveButton";
import useProductLotList from "../ProductLot/Hooks/useProductLotList";
import useInventoryBayList from "../InventoryBay/Hooks/useInventoryBayList";
import NumberInput from "@src/components/NumberInput";
import DeleteButton from "@src/components/DeleteButton";
import handlePatch from "./Utility/HandlePatch";
import SearchableDropDown from "@src/components/SearchableDropDown";
import { useAccount } from "@src/context/AccountContext";
import { useTheme } from "@src/context/ThemeContext";

type Props = {
  setKey: Dispatch<SetStateAction<number>>;
  setMode: Dispatch<SetStateAction<mode>>;
  state: 'release' | 'scrap' | null;
  item: Inventory;
}

const fixAlert = (title: string, text: string) => {
  if (Platform.OS === 'web') {
    alert(`${title}\n${text}`)
  } else {
    fixAlert(title, text)
  }
}

const InventoryEdit = ({ setKey, item, setMode, state }: Props) => {
  const styles = useTheme();
  const { user } = useAccount();
  const { result: lots } = useProductLotList();
  const { result: locations } = useInventoryBayList();

  const [data, setData] = useState<Inventory>(item);

  useEffect(() => {
    setData(prev => ({
      ...prev,
      updated_by: user.email,
      from_location: item.location,
      comments: ""
    }));
    if (state === 'release') {
      setData(prev => ({ ...prev, location: "Released" }));
    }
    if (state === 'scrap') {
      setData(prev => ({ ...prev, location: "Scrapped" }));
    }
  }, []);

  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (!submit) return;
    if (data.quantity === 0) {
      fixAlert('Error', 'Quantity cannot be 0');
      setSubmit(false);
      return;
    }
    if (data.comments === "") {
      fixAlert('Error', 'Comments cannot be empty');
      setSubmit(false);
      return;
    }
    if (data.location === "") {
      fixAlert('Error', 'Location cannot be empty');
      setSubmit(false);
      return;
    }
    if (data.lot_number === "") {
      fixAlert('Error', 'Lot Number cannot be empty');
      setSubmit(false);
      return;
    }
    if (data.updated_by === "") {
      fixAlert('Error', 'Error loading current user, please reload app');
      setSubmit(false);
      return;
    }
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
    const onPositivePress = () => {
      api.delete('/api/inventory/' + item.id)
      .then(_ => {
        setMode('view');
      })
      .catch(err => {
        if (err.response.status === 406) {
          fixAlert("Error", "This lot somehow has dependencies?");
        } else {
          fixAlert("Error", "Failed to delete bay.\n" + err.message);
        }
      })
    }
    if (Platform.OS === 'web') {
      const res = window.confirm(
        "Scrap Items in inventory\nAre you sure you want to scrap these items?"
      )
      if (res) onPositivePress()
      else alert("Action cancled") 
    } else {
      Alert.alert(
        "Scrap Items in inventory",
        "Are you sure you want to scrap these items?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Yes", onPress: onPositivePress
          }
        ]
      );
    }
  }

  return (
    <View style={styles.container}>
      <SearchableDropDown
        label="Lot Number"
        selectedValue={data.lot_number}
        onValueChange={(lot_number) => {
          setData({ ...data, lot_number });
        }}
        items={lots}
      />
      <Text style={[styles.input, styles.input_text]}>From location: {item.location}</Text>
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
      <TextInput
        style={styles.input}
        textColor={styles.input_text.color}
        label="Comments"
        value={data.comments}
        onChangeText={(comments) => {
          setData({ ...data, comments });
        }}
        mode="outlined"
      />
      <TextInput
        disabled={true}
        style={styles.input}
        textColor={styles.input_text.color}
        label="Updated By"
        value={data.updated_by}
        mode="outlined"
      />
      <View style={{ flex: 1 }}></View>
      <SaveButton
        setSubmit={setSubmit}
      />
      {(item.location === 'Scrapped' || item.location === 'Released') && (
        <DeleteButton onPress={() => deleteAlert(item)} />
      )}
    </View>
  );
}

export default InventoryEdit;

