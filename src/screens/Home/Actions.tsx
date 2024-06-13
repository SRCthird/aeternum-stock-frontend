import { View, Text, TouchableOpacity } from 'react-native';
import { mode } from './types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '..';
import { Dispatch, SetStateAction, useEffect } from 'react';
import styles from '@src/utils/styles';

type Props = {
  setMode: Dispatch<SetStateAction<mode>>;
  setTitle: Dispatch<SetStateAction<string>>;
  navigation: StackNavigationProp<RootStackParamList, 'Actions'>;
}

const Actions = ({ setMode, setTitle, navigation }: Props) => {

  useEffect(() => {
    setTitle('Actions');
  }, []);

  return (
    <View style={styles.action_container}>
      <TouchableOpacity style={styles.action_body} onPress={() => { setMode('create') }}>
        <Text style={styles.action_text}>Create Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action_body} onPress={() => { setMode('transfer') }}>
        <Text style={styles.action_text}>Inventory Transfer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action_body} onPress={() => { setMode('release') }}>
        <Text style={styles.action_text}>Release Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action_body} onPress={() => { setMode('scrap') }}>
        <Text style={styles.action_text}>Scrap Items</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.action_body} onPress={() => { navigation.navigate('FindLot') }}>
        <Text style={styles.action_text}>Find Lot</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Actions;
