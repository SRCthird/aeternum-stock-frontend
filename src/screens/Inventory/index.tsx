import { View } from "react-native";
import { RootStackParamList } from "../Home";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import InventoryView from "./InventoryView";
import { Inventory } from "./Hooks/useInventory";
import InventoryEdit from "./InventoryEdit";
import InventoryAdd from "./InventoryAdd";
import { mode } from "@utils/types";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Inventory'>;
}

const InventoryIndex = ({ navigation }: Props) => {
  const [key, setKey] = useState<number>(0);
  const [mode, setMode] = useState<mode>('view');
  const [item, setItem] = useState<Inventory>({
    id: 0,
    lotNumber: '',
    location: '',
    quantity: 0,
    createdAt: new Date(),
    createdBy: '',
    updatedAt: new Date(),
    updatedBy: '',
  });

  useEffect(() => {
    console.log(key);
  }, [key]);

  useEffect(() => {
    if (item.id === 0) return;
    console.log(item);
  }, [item]);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}>
      {mode === 'view' && (
        <InventoryView
          key={key}
          key_={key}
          setKey={setKey}
          setMode={setMode}
          setItem={setItem}
          navigation={navigation}
        />
      )}
      {mode === 'edit' && (
        <InventoryEdit
          key={key}
          key_={key}
          setKey={setKey}
          setMode={setMode}
          item={item}
          setItem={setItem}
          navigation={navigation}
        />
      )}
      {mode === 'add' && (
        <InventoryAdd
          key={key}
          key_={key}
          setKey={setKey}
          setMode={setMode}
          navigation={navigation}
        />
      )}
    </View>
  );
}

export default InventoryIndex;
