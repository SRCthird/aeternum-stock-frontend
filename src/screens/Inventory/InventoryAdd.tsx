import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TextInput } from 'react-native-paper';
import { Inventory } from "./Hooks/useInventory";
import { Alert, View } from "react-native";
import { api } from '@screens/Authenticate/Login';
import { mode } from "@utils/types";
import SaveButton from "@src/components/SaveButton";
import useProductLotList from "../ProductLot/Hooks/useProductLotList";
import useInventoryBayList from "../InventoryBay/Hooks/useInventoryBayList";
import NumberInput from "@src/components/NumberInput";
import DatePicker from "@components/DatePicker";
import useLotLookup from "../ProductLot/Hooks/useLotLookup";
import { useAccount } from "@src/context/AccountContext";
import SearchableDropDown from "@src/components/SearchableDropDown";
import { AxiosError } from "axios";

type Props = {
  setKey: Dispatch<SetStateAction<number>>;
  setMode: (mode: mode) => void;
  defaultItem?: { lotNumber: string, quantity: number };
}

const InventoryAdd = ({ setKey, setMode, defaultItem }: Props) => {
  const { user } = useAccount();
  const { result: lots, isLoading: lotsLoading } = useProductLotList();
  const { result: locations, isLoading: locationsLoading } = useInventoryBayList();

  const [data, setData] = useState<Inventory>({
    id: 0,
    lotNumber: '',
    location: '',
    quantity: 0,
    createdAt: new Date(),
    createdBy: user.email,
    updatedAt: new Date(),
    updatedBy: user.email,
    fromLocation: 'Operations',
  });
  const [submit, setSubmit] = useState(false);
  const { result: lotLookup, isLoading: lotLookupLoading } = useLotLookup({ lotNumber: data.lotNumber });

  useEffect(() => {
    if (defaultItem) {
      setData({
        ...data,
        lotNumber: defaultItem.lotNumber,
        quantity: defaultItem.quantity,
        createdBy: user.email,
        updatedBy: user.email,
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
        console.log(JSON.stringify(err.toJSON(), undefined, 2));
        if (err.response?.status === 400) {
          Alert.alert('Error', 'Inventory bay is at capacity for unique lots');
        } else if (err.response?.status === 422) {
          Alert.alert('Error', 'Product lot does not exist');
        } else if (err.response?.status === 428) {
          Alert.alert('Error', 'Inventory bay does not exist');
        } else if (err.response?.status === 409) {
          Alert.alert('Error', 'Overflow of lot size. Check lot quantity.');
        } else {
          Alert.alert('Error', err.message);
        }
      });
    setSubmit(false);
  }, [submit]);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 10,
    }}>
      <SearchableDropDown
        label="Lot Number"
        placeholder="Select a lot number"
        selectedValue={data.lotNumber}
        onValueChange={(lotNumber) => {
          setData({ ...data, lotNumber });
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
      <DatePicker
        label="Created At"
        date={data.createdAt}
        onConfirm={(createdAt) => {
          setData({ ...data, createdAt });
        }}
      />
      <TextInput
        disabled={true}
        style={{
          minWidth: '100%',
          margin: 10,
        }}
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

