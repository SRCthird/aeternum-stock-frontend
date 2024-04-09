import { createStackNavigator } from '@react-navigation/stack';
import ActionScreen from '@screens/Home/ActionScreen';
import Product from '@screens/Product';

export type RootStackParamList = {
  Actions: undefined;
  Product: undefined;
}

const Stack = createStackNavigator();

const index = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Actions" component={ActionScreen} />
      <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
  );
}

export default index;
