import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TextInput } from 'react-native-paper';
import { Inventory } from "./Hooks/useInventory";
import { Alert, Platform, View } from "react-native";
import { api } from '@screens/Authenticate/Login';
import { mode } from "@utils/types";
import SaveButton from "@src/components/SaveButton";
import useProductLotList from "../ProductLot/Hooks/useProductLotList";
import useInventoryBayList from "../InventoryBay/Hooks/useInventoryBayList";
import NumberInput from "@src/components/NumberInput";
import useLotLookup from "../ProductLot/Hooks/useLotLookup";
import { useAccount } from "@src/context/AccountContext";
import SearchableDropDown from "@src/components/SearchableDropDown";
import { AxiosError } from "axios";
import { useTheme } from "@src/context/ThemeContext";

type Props = {
  setKey: Dispatch<SetStateAction<number>>;
  setMode: (mode: mode) => void;
  defaultItem?: { lot_number: string, quantity: number };
}

const fixAlert = (title: string, text: string) => {
  if (Platform.OS === 'web') {
    alert(`${title}\n${text}`)
  } else {
    Alert.alert(title, text)
  }
}

const InventoryAdd = ({ setKey, setMode, defaultItem }: Props) => {
  const styles = useTheme();

  const { user } = useAccount();
  const { result: lots } = useProductLotList();
  const { result: locations } = useInventoryBayList();

  const [data, setData] = useState<Inventory>({
    id: 0,
    lot_number: '',
    location: '',
    quantity: 0,
    created_by: user.email,
    from_location: 'Operations',
    comments: 'Created from mobile app',
  });
  const [submit, setSubmit] = useState(false);
  const { result: lotLookup } = useLotLookup({ lot_number: data.lot_number });

  useEffect(() => {
    if (defaultItem) {
      setData({
        ...data,
        lot_number: defaultItem.lot_number,
        quantity: defaultItem.quantity,
        created_by: user.email,
      });
    }
  }, []);

  useEffect(() => {
    if (!submit) return;
    const { id: _, ...newData } = data;
    api.post(`/api/inventory/`, newData)
      .then(_ => {
        setKey(prev => prev + 1);
        setSubmit(false);
        setMode('view');
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 413) {
          fixAlert('Error', 'Inventory bay is at capacity or doesn\'t exist');
        } else if (err.response?.status === 422) {
          fixAlert('Error', 'Product lot does not exist');
        } else if (err.response?.status === 428) {
          fixAlert('Error', 'Inventory bay does not exist');
        } else if (err.response?.status === 409) {
          fixAlert('Error', 'Overflow of lot size. Check lot quantity.');
        } else {
          fixAlert('Error', err.message);
        }
      });
    setSubmit(false);
  }, [submit]);

  return (
    <View style={styles.container}>
      <SearchableDropDown
        label="Lot Number"
        placeholder="Select a lot number"
        selectedValue={data.lot_number}
        onValueChange={(lot_number) => {
          setData({ ...data, lot_number });
        }}
        items={lots}
      />
      <SearchableDropDown
        label="Location"
        placeholder="Select a location"
        selectedValue={data.location}
        onValueChange={(location) => {
          setData({ ...data, location });
        }}
        items={locations}
      />
      <NumberInput
        label="Quantity"
        value={data.quantity}
        max={lotLookup[0]?.quantity ?? 0}
        onChange={(quantity) => {
          setData({ ...data, quantity });
        }}
      />
      <TextInput
        disabled={true}
        style={styles.input}
        textColor={styles.input_text.color}
        label="Created By"
        value={user.email}
        mode="outlined"
      />
      <View style={{ flex: 1 }}></View>
      <SaveButton setSubmit={setSubmit} />
    </View>
  );
}

export default InventoryAdd;

