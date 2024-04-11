import { View } from "react-native";
import { RootStackParamList } from "../Home";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import WarehouseView from "./WarehouseView";
import { Warehouse } from "./Hooks/useWarehouse";
import WarehouseEdit from "./WarehouseEdit";
import WarehouseAdd from "./WarehouseAdd";
import { mode } from '@utils/types';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Warehouse'>;
}

const WarehouseIndex = ({ navigation }: Props) => {
  const [key, setKey] = useState<number>(0);
  const [mode, setMode] = useState<mode>('view');
  const [item, setItem] = useState<Warehouse>({
    id: 0,
    name: '',
  });

  return (
    <View style={{
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}>
      {mode === 'view' && (
        <WarehouseView
          key={key}
          key_={key}
          setKey={setKey}
          setMode={setMode}
          setItem={setItem}
          navigation={navigation}
        />
      )}
      {mode === 'edit' && (
        <WarehouseEdit
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
        <WarehouseAdd
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

export default WarehouseIndex;
