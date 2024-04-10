import { View } from "react-native";
import { RootStackParamList } from "../Home";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import ProductView from "./ProductView";
import { Product } from "./Hooks/useProduct";
import ProductEdit from "./ProductEdit";
import ProductAdd from "./ProductAdd";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Product'>;
}

export type mode = 'view' | 'add' | 'edit';

const ProductIndex = ({ navigation }: Props) => {
  const [key, setKey] = useState(0);
  const [mode, setMode] = useState<mode>('view');
  const [item, setItem] = useState<Product>({
    id: 0,
    name: '',
    description: '',
  });

  useEffect(() => {
    if (item.id === 0) return;
    console.log(item);
  }, [item]);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}>
      {mode === 'view' && (
        <ProductView
          key={key}
          setKey={setKey}
          setMode={setMode}
          setItem={setItem}
          navigation={navigation}
        />
      )}
      {mode === 'edit' && (
        <ProductEdit
          key={key}
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
          setKey={setKey}
          setMode={setMode}
          navigation={navigation}
        />
      )}
    </View>
  );
}

export default ProductIndex;
