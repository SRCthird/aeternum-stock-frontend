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
import useLotLookup from "../ProductLot/Hooks/useLotLookup";
import { useAccount } from "@src/context/AccountContext";

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
    const { id: _, ...putData } = data;
    api.post('/api/inventory/', putData)
      .then(_ => {
        setKey(prev => prev + 1);
        setSubmit(false);
        setMode('view');
      })
      .catch(err => {
        if (err.response.status === 400) {
          Alert.alert('Error', 'Inventory quantity exceeds product lot quantity');
        } else if (err.response.status === 422) {
          Alert.alert('Error', 'Product lot does not exist');
        } else if (err.response.status === 428) {
          Alert.alert('Error', 'Inventory bay does not exist');
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
      <DropDown
        label="Lot Number"
        placeHolder="Select a lot number"
        selectedValue={data.lotNumber}
        onValueChange={(lotNumber, _) => {
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
        placeHolder="Select a location"
        selectedValue={data.location}
        onValueChange={(location, _) => {
          setData({ ...data, location });
        }}
        selection={
          locations.map(location => (
            <Picker.Item key={location} label={location} value={location} />
          ))
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

