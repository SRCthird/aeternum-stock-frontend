import { View } from "react-native";
import { RootStackParamList } from "../Home";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import InventoryView from "./InventoryView";
import { Inventory } from "./Hooks/useInventory";
import InventoryEdit from "./InventoryEdit";
import InventoryAdd from "./InventoryAdd";
import { mode } from "@utils/types";
import InventoryHeader from "./Components/InventoryHeader";
import { RouteProp } from "@react-navigation/native";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Inventory'>;
  route: RouteProp<RootStackParamList, 'Inventory'>;
}

const InventoryIndex = ({ navigation, route }: Props) => {
  const [state, setState] = useState<'release' | 'scrap' | null>(route.params?.state || null);
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

  return (
    <View style={{ flex: 1 }}>
      <InventoryHeader
        navigation={navigation}
        setKey={setKey}
        setMode={setMode}
        setItem={setItem}
      />
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
        {mode === 'view' && (
          <InventoryView
            key={key}
            setMode={setMode}
            setItem={setItem}
          />
        )}
        {mode === 'edit' && (
          <InventoryEdit
            key={key}
            state={state}
            setKey={setKey}
            setMode={setMode}
            item={item}
          />
        )}
        {mode === 'add' && (
          <InventoryAdd
            key={key}
            setKey={setKey}
            setMode={setMode}
          />
        )}
      </View>
    </View>
  );
}

export default InventoryIndex;
