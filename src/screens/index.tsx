import { createStackNavigator } from '@react-navigation/stack';
import Home from '@screens/Home';
import Product from '@screens/Product';
import ProductLot from '@screens/ProductLot';
import Warehouse from '@screens/Warehouse';
import InventoryBay from '@screens/InventoryBay';
import Inventory from '@screens/Inventory';
import Authenticate from '@screens/Authenticate';
import Test from '@screens/Test';

export type RootStackParamList = {
  Actions: undefined;
  Product: undefined;
  ProductLot: undefined;
  Warehouse: undefined;
  InventoryBay: undefined;
  Inventory: {
    state?: 'release' | 'scrap';
  } | undefined;
  Test: {
    test?: any;
  } | undefined;
}

const Stack = createStackNavigator();

const Screens = () => {
  return (
    <Authenticate>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Actions" component={Home} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="ProductLot" component={ProductLot} />
        <Stack.Screen name="Warehouse" component={Warehouse} />
        <Stack.Screen name="InventoryBay" component={InventoryBay} />
        <Stack.Screen name="Inventory" component={Inventory} />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </Authenticate>
  );
}

export default Screens;
