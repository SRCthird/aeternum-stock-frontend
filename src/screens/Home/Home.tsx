import { View, StyleSheet } from 'react-native';
import HomeHeader from './Components/HomeHeader';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@screens/Home';
import { useEffect, useState } from 'react';
import { mode } from './types';
import Actions from './Actions';
import CreateItem from './CreateItem';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Actions'>;
}

const Home = ({ navigation }: Props) => {
  const [mode, setMode] = useState<mode>('actions');

  const styles = StyleSheet.create({
    action: {
      backgroundColor: '#219ebc',
      padding: 15,
      marginBottom: 5,
      width: '100%',
      alignItems: 'center',
    },
    optionText: {
      color: '#ffffff',
      fontSize: 18,
    },
  })

  useEffect(() => {
    if (mode === 'transfer') {
      navigation.navigate('Inventory');
      setMode('actions');
    }
    if (mode === 'release') {
      navigation.navigate('Inventory', { state: 'release' });
      setMode('actions');
    }
    if (mode === 'scrap') {
      navigation.navigate('Inventory', { state: 'scrap' });
      setMode('actions');
    }
  }, [mode]);

  return (
    <View style={{ flex: 1 }}>
      <HomeHeader
        title=""
        setMode={setMode}
        navigation={navigation}
      />
      {mode === 'actions' && (
        <Actions mode={mode} setMode={setMode} />
      )}
      {mode === 'create' && (
        <CreateItem 
          setHomeMode={setMode} 
        />
      )}
    </View>
  );
};

export default Home;
