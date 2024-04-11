import { View } from "react-native";
import { RootStackParamList } from "../Home";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import ProductLotView from "./ProductLotView";
import { ProductLot } from "./Hooks/useProductLot";
import ProductLotEdit from "./ProductLotEdit";
import ProductLotAdd from "./ProductLotAdd";
import { mode } from "@utils/types";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProductLot'>;
}

const ProductIndex = ({ navigation }: Props) => {
  const [key, setKey] = useState(0);
  const [mode, setMode] = useState<mode>('view');
  const [item, setItem] = useState<ProductLot>({
    id: 0,
    lotNumber: "",
    internalReference: "",
    productName: "", 
    quantity: 0
  });

  return (
    <View style={{
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}>
      {mode === 'view' && (
        <ProductLotView
          key={key}
          key_={key}
          setKey={setKey}
          setMode={setMode}
          setItem={setItem}
          navigation={navigation}
        />
      )}
      {mode === 'edit' && (
        <ProductLotEdit
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
        <ProductLotAdd
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

export default ProductIndex;
