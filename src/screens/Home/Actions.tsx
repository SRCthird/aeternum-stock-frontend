import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { mode } from './types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '..';
import { Dispatch, SetStateAction, useEffect } from 'react';

type Props = {
  setMode: Dispatch<SetStateAction<mode>>;
  setTitle: Dispatch<SetStateAction<string>>;
  navigation: StackNavigationProp<RootStackParamList, 'Actions'>;
}

const Actions = ({ setMode, setTitle, navigation }: Props) => {

  useEffect(() => {
    setTitle('Actions');
  }, []);

  const styles = StyleSheet.create({
    action: {
      backgroundColor: '#219ebc',
      padding: 30,
      marginBottom: 5,
      width: '100%',
      alignItems: 'center',
    },
    optionText: {
      color: '#ffffff',
      fontSize: 18,
    },
  })

  return (
    <View style={{
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 5,
    }}>
      <TouchableOpacity style={styles.action} onPress={() => { setMode('create') }}>
        <Text style={styles.optionText}>Create Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action} onPress={() => { setMode('transfer') }}>
        <Text style={styles.optionText}>Inventory Transfer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action} onPress={() => { setMode('release') }}>
        <Text style={styles.optionText}>Release Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action} onPress={() => { setMode('scrap') }}>
        <Text style={styles.optionText}>Scrap Items</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.action} onPress={() => { navigation.navigate('FindLot') }}>
        <Text style={styles.optionText}>Find Lot</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Actions;
