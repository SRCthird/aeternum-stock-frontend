import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import Home from '@screens/Home';

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
