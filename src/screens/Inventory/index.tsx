import { View } from "react-native";
import { RootStackParamList } from "@screens";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
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
    lot_number: '',
    location: '',
    quantity: 0,
    created_at: new Date(),
    created_by: '',
    from_location: 'Operations',
    comments: '',
  });

  return (
    <View style={{ flex: 1 }}>
      {mode === 'view' ? (
        <InventoryView
          key={key}
          setMode={setMode}
          setItem={setItem}
          headerNode={
            <InventoryHeader
              navigation={navigation}
              setKey={setKey}
              setMode={setMode}
              setItem={setItem}
            />
          }
        />
      ) : (
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
      )}
    </View>
  );
}

export default InventoryIndex;
