import { View, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '..';
import { useTheme } from '@src/context/ThemeContext';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Admin'>;
}

const AdminActions = ({ navigation }: Props) => {
  const styles = useTheme();
  return (
    <View style={styles.action_container}>
      <TouchableOpacity style={styles.action_body} onPress={() => { navigation.navigate('Product') }}>
        <Text style={styles.action_text}>Product Management</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action_body} onPress={() => { navigation.navigate('ProductLot') }}>
        <Text style={styles.action_text}>Lot Management</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action_body} onPress={() => { navigation.navigate('Warehouse') }}>
        <Text style={styles.action_text}>Warehouse Management</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action_body} onPress={() => { navigation.navigate('InventoryBay') }}>
        <Text style={styles.action_text}>Inventory Bay Management</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action_body} onPress={() => { navigation.navigate('Inventory') }}>
        <Text style={styles.action_text}>Inventory Management</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminActions;
