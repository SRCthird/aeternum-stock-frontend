import { createStackNavigator } from '@react-navigation/stack';
import Home from '@screens/Home/Home';
import Product from '@screens/Product';
import ProductLot from '@screens/ProductLot';

export type RootStackParamList = {
  Actions: undefined;
  Product: undefined;
  ProductLot: undefined;
}

const Stack = createStackNavigator();

const index = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Actions" component={Home} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="ProductLot" component={ProductLot} />
    </Stack.Navigator>
  );
}

export default index;
