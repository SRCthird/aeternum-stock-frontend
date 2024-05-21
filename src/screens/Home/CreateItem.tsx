import { mode } from "@src/utils/types";
import { mode as homeMode } from './types';
import ProductLotAdd from "../ProductLot/ProductLotAdd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View } from "react-native";
import InventoryAdd from "../Inventory/InventoryAdd";
import { ProductLot } from "../ProductLot/Hooks/useProductLot";

type Props = {
  setHomeMode: Dispatch<SetStateAction<homeMode>>;
  setTitle: Dispatch<SetStateAction<string>>;
}

const CreateItem = ({ setHomeMode, setTitle }: Props) => {
  const [mode, setMode] = useState<mode>('add');
  const [item, setItem] = useState<ProductLot>({
    id: 0,
    lot_number: '',
    internal_reference: '',
    product_name: '',
    quantity: 0,
  });

  useEffect(() => {
    if (mode === 'add') setTitle('Create Lot');
    if (mode === 'view') setTitle('Add lot to Inventory');
  },[mode]);

  return (
    <View style={{ flex: 1 }}>
      {mode === 'add' && (
        <ProductLotAdd
          setKey={(key: number) => { }}
          setMode={setMode}
          setItem={setItem}
        />
      )}
      {mode === 'view' && (
        <InventoryAdd
          setKey={(key: number) => { }}
          setMode={(mode: mode) => {
            if (mode === 'view') {
              setHomeMode('actions');
            }
          }}
          defaultItem={{ 
            lot_number: item.lot_number, 
            quantity: item.quantity 
          }}
        />
      )}
    </View>
  )

}

export default CreateItem;
