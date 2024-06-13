import { View } from "react-native";
import { RootStackParamList } from "@screens";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import WarehouseView from "./WarehouseView";
import { Warehouse } from "./Hooks/useWarehouse";
import WarehouseEdit from "./WarehouseEdit";
import WarehouseAdd from "./WarehouseAdd";
import { mode } from '@utils/types';
import WarehouseHeader from "./Components/WarehouseHeader";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Warehouse'>;
}

const WarehouseIndex = ({ navigation }: Props) => {
  const [key, setKey] = useState<number>(0);
  const [mode, setMode] = useState<mode>('view');
  const [title, setTitle] = useState<string>('Warehouse');
  const [item, setItem] = useState<Warehouse>({
    id: 0,
    name: '',
  });

  return (
    <View style={{ flex: 1 }}>
      {mode === 'view' ? (
        <WarehouseView
          key={key}
          setMode={setMode}
          setItem={setItem}
          headerNode={
            <WarehouseHeader
              title={title}
              navigation={navigation}
              setKey={setKey}
              setMode={setMode}
              setItem={setItem}
            />
          }
        />
      ) : (
        <WarehouseHeader
          title={title}
          navigation={navigation}
          setKey={setKey}
          setMode={setMode}
          setItem={setItem}
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
        />
      )}
    </View>
  );
}

export default WarehouseIndex;
