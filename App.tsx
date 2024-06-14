import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import Screens from '@screens';
import ThemeContext from '@src/context/ThemeContext';
import { useColorScheme } from 'react-native';

const App = () => {
  return (
    <PaperProvider>
      <ThemeContext.Provider value={useColorScheme()}>
        <NavigationContainer>
          <Screens />
        </NavigationContainer>
      </ThemeContext.Provider>
    </PaperProvider>

  );
}

export default App;
