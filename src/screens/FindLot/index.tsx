import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "..";
import { Text, View } from "react-native";
import { useState } from "react";
import { mode } from "@src/utils/types";
import { ProductLot } from "../ProductLot/Hooks/useProductLot";
import FindLotHeader from "./components/FindLotHeader";
import FindLotList from "./components/FindLotList";
import FindLotItem from "./components/FindLotItem";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'FindLot'>;
}

export default function FindLot({ navigation }: Props) {
  const [key, setKey] = useState(0);
  const [mode, setMode] = useState<mode>('view');
  const [item, setItem] = useState<ProductLot>({
    id: 0,
    lot_number: "",
    internal_reference: "",
    product_name: "",
    quantity: 0
  });

  return (
    <View style={{ flex: 1 }}>
      {mode === 'view' ? (
        <FindLotList
          headerNode={
            <FindLotHeader
              navigation={navigation}
              label="Find Lot"
              setMode={setMode}
              setKey={setKey}
            />
          }
          setMode={setMode}
          setItem={(item: ProductLot) => {
            setItem(item);
            setMode('edit');
          }}
          key={key}
        />
      ) : mode === 'edit' ? (
        <View style={{ flex: 1 }}>
          <FindLotHeader
            navigation={navigation}
            label="Find Lot"
            setMode={setMode}
            setKey={setKey}
          />
          <FindLotItem item={item} setMode={setMode} />
        </View>
      ) : mode === 'add' ? (
        <View style={{ flex: 1 }}>
          <Text>ProductLotAdd</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Text>Invalid mode</Text>
        </View>
      )}
    </View>
  );
}
