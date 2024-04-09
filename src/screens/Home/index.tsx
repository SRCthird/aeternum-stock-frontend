import { createStackNavigator } from '@react-navigation/stack';
import ActionScreen from '@screens/Home/ActionScreen';
import ProductManagementScreen from '@screens/Product/ProductManagementScreen';

export type RootStackParamList = {
  ActionScreen: undefined;
  ProductManagementScreen: undefined;
}

const Stack = createStackNavigator();

const index = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Action Screen" component={ActionScreen} />
      <Stack.Screen name="Product Management" component={ProductManagementScreen} />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
}

export default index;
