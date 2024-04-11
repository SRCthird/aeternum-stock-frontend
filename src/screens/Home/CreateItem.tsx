import { mode } from "@src/utils/types";
import { mode as homeMode } from './types';
import ProductLotAdd from "../ProductLot/ProductLotAdd";
import { Dispatch, SetStateAction, useState } from "react";
import { Text, View } from "react-native";
import InventoryAdd from "../Inventory/InventoryAdd";
import { ProductLot } from "../ProductLot/Hooks/useProductLot";

type Props = {
  setHomeMode: Dispatch<SetStateAction<homeMode>>;
}

const CreateItem = ({ setHomeMode }: Props) => {
  const [mode, setMode] = useState<mode>('add');
  const [item, setItem] = useState<ProductLot>({
    id: 0,
    lotNumber: '',
    internalReference: '',
    productName: '',
    quantity: 0,
  });

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
            lotNumber: item.lotNumber, 
            quantity: item.quantity 
          }}
        />
      )}
    </View>
  )

}

export default CreateItem;
