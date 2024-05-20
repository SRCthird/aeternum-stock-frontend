import { View } from "react-native";
import { RootStackParamList } from "@screens";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import InventoryBayView from "./InventoryBayView";
import { InventoryBay } from "./Hooks/useInventoryBay";
import InventoryBayEdit from "./InventoryBayEdit";
import InventoryBayAdd from "./InventoryBayAdd";
import { mode } from "@utils/types";
import InventoryBayHeader from "./Components/InventoryBayHeader";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'InventoryBay'>;
}

const InventoryBayIndex = ({ navigation }: Props) => {
  const [key, setKey] = useState<number>(0);
  const [mode, setMode] = useState<mode>('view');
  const [title, setTitle] = useState<string>('Inventory Bay');
  const [item, setItem] = useState<InventoryBay>({
    id: 0,
    name: '',
    warehouse_name: '',
    max_unique_lots: 0,
  });

  useEffect(() => {
    if (mode === 'view') {
      setTitle('Inventory Bay');
    } else if (mode === 'edit') {
      setTitle(`Edit Inventory Bay: ${item.id}`);
    } else if (mode === 'add') {
      setTitle('Add Inventory Bay');
    }
  }, [mode]);

  return (
    <View style={{ flex: 1 }}>
      {mode === 'view' ? (
        <InventoryBayView
          key={key}
          headerNode={
            <InventoryBayHeader
              title="Inventory Bay"
              setKey={setKey}
              setMode={setMode}
              setItem={setItem}
              navigation={navigation}
            />
          }
          setMode={setMode}
          setItem={setItem}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <InventoryBayHeader
            title={title}
            setKey={setKey}
            setMode={setMode}
            setItem={setItem}
            navigation={navigation}
          />
          {mode === 'edit' && (
            <InventoryBayEdit
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
            <InventoryBayAdd
              key={key}
              key_={key}
              setKey={setKey}
              setMode={setMode}
              navigation={navigation}
            />
          )}
        </View>
      )}
    </View>
  );
}

export default InventoryBayIndex;
