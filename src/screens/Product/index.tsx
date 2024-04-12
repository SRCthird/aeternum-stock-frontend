import { View } from "react-native";
import { RootStackParamList } from "@screens";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import ProductView from "./ProductView";
import { Product } from "./Hooks/useProduct";
import ProductEdit from "./ProductEdit";
import ProductAdd from "./ProductAdd";
import { mode } from "@utils/types";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Product'>;
}

const ProductIndex = ({ navigation }: Props) => {
  const [key, setKey] = useState(0);
  const [mode, setMode] = useState<mode>('view');
  const [item, setItem] = useState<Product>({
    id: 0,
    name: '',
    description: '',
  });

  return (
    <View style={{
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}>
      {mode === 'view' && (
        <ProductView
          key={key}
          key_={key}
          setKey={setKey}
          setMode={setMode}
          setItem={setItem}
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
          setItem={setItem}
          navigation={navigation}
        />
      )}
      {mode === 'add' && (
        <ProductAdd
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
