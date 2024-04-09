import ProductList from "@components/ProductList";
import Header from "@components/Header";
import { View } from "react-native";
import { styles } from "@src/styles";
import { RootStackParamList } from "../Home";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProductManagementScreen'>;
}

const ProductManagementScreen = ({navigation}: Props) => {

  return (
    <View style={styles.container}>
      <Header 
        title="" 
        navigation={navigation}
      />
      <View style={styles.body}>
        <ProductList />
      </View>
    </View>
  );
}

export default ProductManagementScreen;

