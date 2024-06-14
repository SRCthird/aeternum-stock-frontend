import { View } from "react-native";
import { RootStackParamList } from "@screens";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { ProductLot } from "./Hooks/useProductLot";
import ProductLotEdit from "./ProductLotEdit";
import ProductLotAdd from "./ProductLotAdd";
import { mode } from "@utils/types";
import ProductHeader from "./Components/ProductHeader";
import ProductLotView from "./ProductLotView";
import { useTheme } from "@src/context/ThemeContext";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProductLot'>;
}

const ProductLotIndex = ({ navigation }: Props) => {
  const styles = useTheme();
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
    <View style={styles.container}>
      {mode === 'view' ? (
        <ProductLotView
          headerNode={
            <ProductHeader
              navigation={navigation}
              label="Product Lot"
              setMode={setMode}
              setKey={setKey}
              setItem={setItem}
            />
          }
          setMode={setMode}
          setItem={setItem}
        />
      ) : (
        <View style={{
          flex: 1,
        }}>
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
      )}
    </View>
  );
}

export default ProductLotIndex;
