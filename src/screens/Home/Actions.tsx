import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { mode } from './types';

type Props = {
  mode: mode;
  setMode: (mode: mode) => void;
}

const Actions = ({ mode, setMode }: Props) => {

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
    </View>
  );
};

export default Actions;
