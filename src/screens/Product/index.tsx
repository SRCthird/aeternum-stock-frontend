import Header from "@components/Header";
import { Text, View } from "react-native";
import { styles } from "@src/styles";
import { RootStackParamList } from "../Home";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import ProductView from "./ProductView";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Product'>;
}

type mode = 'view' | 'add' | 'edit' | 'create';

const Product = ({ navigation }: Props) => {
  const [key, setKey] = useState(0);
  const [mode, setMode] = useState<mode>('add');

  return (
    <View style={styles.container}>
      <Header
        title=""
        navigation={navigation}
      />
      <View style={styles.body}>
        {mode === 'view' ? (
          <ProductView />
        ) : (
          <Text>Product</Text>
        )}
      </View>
    </View>
  );
}

export default Product;
