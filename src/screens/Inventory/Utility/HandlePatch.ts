import { Alert, Platform } from "react-native";
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

const fixAlert = (title: string, text: string) => {
  if (Platform.OS === 'web') {
    alert(`${title}\n${text}`)
  } else {
    Alert.alert(title, text)
  }
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
          fixAlert('Error', 'Lot does not exist.');
        } else if (err.response.status === 422) {
          fixAlert('Error', 'Inventory quantity exceeds product lot quantity');
        } else if (err.response.status === 428) {
          fixAlert('Error', 'Inventory bay does not exist');
        } else {
          fixAlert('Error', err.message);
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
          fixAlert('Error', 'Lot does not exist.');
        } else if (err.response.status === 422) {
          fixAlert('Error', 'Inventory quantity exceeds product lot quantity');
        } else if (err.response.status === 428) {
          fixAlert('Error', 'Inventory bay does not exist');
        } else {
          fixAlert('Error', err.message);
        }
      });
  }

  const createNew = async (item: Inventory, subtracted: number) => {
    const { id: _, ...newData } = item;
    api.post(`/api/inventory/`, newData)
      .then(_ => {
        setKey(prev => prev + 1);
        setSubmit(false);
        setMode('view');
      })
      .catch(err => {
        if (err.response.status === 400) {
          subtractOld(item, subtracted);
          fixAlert('Error', 'Inventory bay is at capacity for unique lots');
        } else if (err.response.status === 422) {
          subtractOld(item, subtracted);
          fixAlert('Error', 'Product lot does not exist');
        } else if (err.response.status === 428) {
          subtractOld(item, subtracted);
          fixAlert('Error', 'Inventory bay does not exist');
        } else if (err.response.status === 409) {
          subtractOld(item, subtracted);
          fixAlert('Error', 'Overflow of lot size. Check lot quantity.');
        } else {
          fixAlert('Error', err.message);
        }
      });
  }

  newItem.from_location = oldItem.location;
  if (newItem.location === oldItem.location) {
    fixAlert('Error', 'Location must be different from the original location.');
    return;
  }
  if (newItem.quantity === oldItem.quantity) {
    await fullMove(oldItem.id, newItem);
    return;
  }
  await subtractOld(oldItem, oldItem.quantity - newItem.quantity)
    .then(_ => createNew(newItem, oldItem.quantity));
  setSubmit(false);
}

export default handlePatch;
