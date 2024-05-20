import { Alert } from "react-native";
import { Inventory } from "../Hooks/useInventory";
import { mode } from "@utils/types";
import { api } from '@screens/Authenticate/Login';
import { Dispatch, SetStateAction } from "react";

type Props = {
  setKey: Dispatch<SetStateAction<number>>;
  setMode: (mode: mode) => void;
  setSubmit: (submit: boolean) => void;
  oldItem: Inventory;
  newItem: Inventory;
}

const handlePatch = async ({ setKey, setMode, setSubmit, oldItem, newItem }: Props) => {
  const fullMove = async (id: number, item: Inventory) => {
    api.patch(`/api/inventory/${id}`, {...item})
      .then(_ => {
        setKey(prev => prev + 1);
        setSubmit(false);
        setMode('view');
      })
      .catch(err => {
        if (err.response.status === 400) {
          Alert.alert('Error', 'Lot does not exist.');
        } else if (err.response.status === 422) {
          Alert.alert('Error', 'Inventory quantity exceeds product lot quantity');
        } else if (err.response.status === 428) {
          Alert.alert('Error', 'Inventory bay does not exist');
        } else {
          Alert.alert('Error', err.message);
        }
      });
  }

  const subtractOld = async (item: Inventory, quantity: number) => {
    api.patch(`/api/inventory/${item.id}`, { quantity: quantity })
      .then(_ => {
        setKey(prev => prev + 1);
        setSubmit(false);
        setMode('view');
      })
      .catch(err => {
        if (err.response.status === 400) {
          Alert.alert('Error', 'Lot does not exist.');
        } else if (err.response.status === 422) {
          Alert.alert('Error', 'Inventory quantity exceeds product lot quantity');
        } else if (err.response.status === 428) {
          Alert.alert('Error', 'Inventory bay does not exist');
        } else {
          Alert.alert('Error', err.message);
        }
      });
  }

  const createNew = async (item: Inventory) => {
    const { id: _, ...newData } = item;
    api.post(`/api/inventory/`, newData)
      .then(_ => {
        setKey(prev => prev + 1);
        setSubmit(false);
        setMode('view');
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 400) {
          Alert.alert('Error', 'Inventory bay is at capacity for unique lots');
        } else if (err.response.status === 422) {
          Alert.alert('Error', 'Product lot does not exist');
        } else if (err.response.status === 428) {
          Alert.alert('Error', 'Inventory bay does not exist');
        } else if (err.response.status === 409) {
          Alert.alert('Error', 'Overflow of lot size. Check lot quantity.');
        } else {
          Alert.alert('Error', err.message);
        }
      });
  }
  console.log(newItem, oldItem);

  newItem.from_location = oldItem.location;
  if (newItem.location === oldItem.location) {
    Alert.alert('Error', 'Location must be different from the original location.');
    return;
  }
  if (newItem.quantity === oldItem.quantity) {
    await fullMove(oldItem.id, newItem);
    return;
  }
  await subtractOld(oldItem, oldItem.quantity - newItem.quantity)
    .then(_ => createNew(newItem));
  setSubmit(false);
}

export default handlePatch;
