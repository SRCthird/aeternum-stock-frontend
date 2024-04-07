import ProductList from "@components/ProductList";
import Header from "@components/Header";
import { View } from "react-native";
import { styles } from "@src/styles";

const ProductManagementScreen = () => {

  return (
    <View style={styles.container}>
      <Header title="" />
      <View style={styles.body}>
        <ProductList />
      </View>
    </View>
  );
}

export default ProductManagementScreen;

