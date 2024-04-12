import { View } from 'react-native';
import HomeHeader from './Components/HomeHeader';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@screens';
import { useEffect, useState } from 'react';
import { mode } from './types';
import Actions from './Actions';
import CreateItem from './CreateItem';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Actions'>;
}

const Home = ({ navigation }: Props) => {
  const [mode, setMode] = useState<mode>('actions');
  const [title, setTitle] = useState<string>('Actions');

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
        title={title}
        setMode={setMode}
        navigation={navigation}
      />
      {mode === 'actions' && (
        <Actions mode={mode} setMode={setMode} />
      )}
      {mode === 'create' && (
        <CreateItem 
          setHomeMode={setMode} 
          setTitle={setTitle}
        />
      )}
    </View>
  );
};

export default Home;
