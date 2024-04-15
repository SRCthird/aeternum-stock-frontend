import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '..';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Admin'>;
}

const AdminActions = ({ navigation }: Props) => {

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
      <TouchableOpacity style={styles.action} onPress={() => { navigation.navigate('Product') }}>
        <Text style={styles.optionText}>Product Management</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action} onPress={() => { navigation.navigate('ProductLot') }}>
        <Text style={styles.optionText}>Lot Management</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action} onPress={() => { navigation.navigate('Warehouse') }}>
        <Text style={styles.optionText}>Warehouse Management</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action} onPress={() => { navigation.navigate('InventoryBay') }}>
        <Text style={styles.optionText}>Inventory Bay Management</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action} onPress={() => { navigation.navigate('Inventory') }}>
        <Text style={styles.optionText}>Inventory Management</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminActions;
