import { View } from "react-native";
import { RootStackParamList } from "../Home";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { ProductLot } from "./Hooks/useProductLot";
import ProductLotEdit from "./ProductLotEdit";
import ProductLotAdd from "./ProductLotAdd";
import { mode } from "@utils/types";
import ProductHeader from "./Components/ProductHeader";
import ProductLotList from "./Components/ProductLotList";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProductLot'>;
}

const ProductLotIndex = ({ navigation }: Props) => {
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
    <View style={{ flex: 1 }}>
      <ProductHeader
        navigation={navigation}
        label="Product Lot"
        setMode={setMode}
        setKey={setKey}
        setItem={setItem}
      />
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
        {mode === 'view' && (
          <ProductLotList
            setMode={setMode}
            setItem={setItem}
          />
        )}
        {mode === 'edit' && (
          <ProductLotEdit
            key={key}
            key_={key}
            setKey={setKey}
            setMode={setMode}
            item={item}
          />
        )}
        {mode === 'add' && (
          <ProductLotAdd
            key={key}
            setKey={setKey}
            setMode={setMode}
          />
        )}
      </View>
    </View>
  );
}

export default ProductLotIndex;
