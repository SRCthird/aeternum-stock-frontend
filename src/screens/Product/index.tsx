import { View } from "react-native";
import { RootStackParamList } from "@screens";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import ProductView from "./ProductView";
import { Product } from "./Hooks/useProduct";
import ProductEdit from "./ProductEdit";
import ProductAdd from "./ProductAdd";
import { mode } from "@utils/types";
import ProductHeader from "./Components/ProductHeader";
import { useTheme } from "@src/context/ThemeContext";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Product'>;
}

const ProductIndex = ({ navigation }: Props) => {
  const styles = useTheme();
  const [key, setKey] = useState(0);
  const [mode, setMode] = useState<mode>('view');
  const [item, setItem] = useState<Product>({
    id: 0,
    name: '',
    description: '',
  });

  return (
    <View style={styles.container}>
      {mode === 'view' ? (
        <ProductView
          headerNode={
            <ProductHeader
              title="Product"
              setMode={setMode}
              setItem={setItem}
              setKey={setKey}
              navigation={navigation}
            />
          }
          setMode={setMode}
          setItem={setItem}
        />
      ) : (
        <ProductHeader
          title="Product"
          setMode={setMode}
          setItem={setItem}
          setKey={setKey}
          navigation={navigation}
        />
      )}
      {mode === 'edit' && (
        <ProductEdit
          key={key}
          key_={key}
          setKey={setKey}
          setMode={setMode}
          item={item}
        />
      )}
      {mode === 'add' && (
        <ProductAdd
          key={key}
          key_={key}
          setKey={setKey}
          setMode={setMode}
        />
      )}
    </View>
  );
}

export default ProductIndex;
