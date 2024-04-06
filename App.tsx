import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ActionScreen from '@screens/ActionScreen';
import ProductManagementScreen from '@screens/ProductManagementScreen';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Action Screen" component={ActionScreen} />
          <Stack.Screen name="Product Management" component={ProductManagementScreen} />
          {/* Add other screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
