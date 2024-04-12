import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import Screens from '@screens';

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Screens />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
