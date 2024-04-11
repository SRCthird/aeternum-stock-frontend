import { View } from "react-native";
import { RootStackParamList } from "../Home";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import InventoryBayView from "./InventoryBayView";
import { InventoryBay } from "./Hooks/useInventoryBay";
import InventoryBayEdit from "./InventoryBayEdit";
import InventoryBayAdd from "./InventoryBayAdd";
import { mode } from "./types";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'InventoryBay'>;
}

const InventoryBayIndex = ({ navigation }: Props) => {
  const [key, setKey] = useState<number>(0);
  const [mode, setMode] = useState<mode>('view');
  const [item, setItem] = useState<InventoryBay>({
    id: 0,
    name: '',
    warehouseName: '',
    maxUniqueLots: 0,
  });

  useEffect(() => {
    console.log(key);
  },[key]);

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
        <InventoryBayView
          key={key}
          setKey={setKey}
          setMode={setMode}
          setItem={setItem}
          navigation={navigation}
        />
      )}
      {mode === 'edit' && (
        <InventoryBayEdit
          key={key}
          setKey={setKey}
          setMode={setMode}
          item={item}
          setItem={setItem}
          navigation={navigation}
        />
      )}
      {mode === 'add' && (
        <InventoryBayAdd
          key={key}
          setKey={setKey}
          setMode={setMode}
          navigation={navigation}
        />
      )}
    </View>
  );
}

export default InventoryBayIndex;